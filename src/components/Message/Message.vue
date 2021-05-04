<template>
   <div class="message-wrap">
      <h2>{{ channelName }}</h2>
      <div class="mt-3 mb-5">
         <SingleMessage
            v-for="msg in msgLists"
            :key="msg.msgId"
            :msgId="msg.msgId"
            :content="msg.content"
            :contentType="msg.contentType"
            :userName="msg.user.name"
            :userId="msg.user.id"
            :avatar="msg.user.avatar"
            :timestamp="msg.timestamp"
         ></SingleMessage>
      </div>
      <MessageForm
         :percent="percent"
         :uploadState="uploadState"
         @sendMsg="sendMsg"
         @openModal="openUploadModal" 
      ></MessageForm>
      <FileModal @uploadFile="uploadFileHandler" ref="fileModal"></FileModal>
   </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
import FileModal from './FileModal.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
const messageRef = firebase.database().ref('messages');
const privateMsgRef = firebase.database().ref('privateMsg');
const storageRef = firebase.storage().ref();
export default {
   components: {
      SingleMessage,
      MessageForm,
      FileModal
   },
   data: () => ({
      msgLists: [],
      percent: 0,
      uploadState: ''
   }),
   computed: {
      ...mapState(['channelId', 'isPrivate']),
      ...mapState('authStore', { userProfile: 'profile' }),
      channelName() {
         return this.$store.getters.channelName;
      },
      privateChildRef() {
         let channelId = this.channelId;
         let profileUid = this.userProfile.uid;
         return this.channelId < this.userProfile.uid ? `${channelId}/${profileUid}` : `${profileUid}/${channelId}`;
      }
   },
   methods: {
      async sendMsg({ msg, type }) {
         let msgInfo = {
            content: msg,
            contentType: type,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
               name: this.userProfile.name,
               avatar: this.userProfile.picture,
               id: this.userProfile.uid
            }
         };
         let method = this.isPrivate ? 'addPrivateMsg' : 'addMessage';
         await databaseApi[method]({ 
            channelId: this.isPrivate ? this.privateChildRef : this.channelId,
            msgInfo 
         });
      },
      async msgCallback(snapshot) {
         this.msgLists.push({
            msgId: snapshot.key,
            ...snapshot.val()
         });
         await this.$nextTick();
         window.scrollTo(0, document.documentElement.scrollHeight);
      },
      addMsgEvent() {
         if (this.channelId === '') return;
         if (this.isPrivate) {
            privateMsgRef.child(this.privateChildRef).on('child_added', this.msgCallback);
         } else {
            messageRef.child(this.channelId).on('child_added', this.msgCallback);
         }
      },
      openUploadModal() {
         $('#fileModal').modal('show');
      },
      getStoragePath() { //取得file storage路徑
         let channelId = this.channelId;
         return this.isPrivate ? `chat/private/${channelId}` : `chat/public/${channelId}`;
      },
      uploadFileHandler({ file, extension, metadata }) {
         let filePath = `${this.getStoragePath()}/${uuidv4()}.${extension}`;
         let uploadTask = storageRef.child(filePath).put(file, metadata);
         uploadTask.on('state_change', snapshot => { //process callback
            this.percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.uploadState = 'uploading...';
         }, () => { //error callback
            this.uploadState = 'upload error';
         }, async () => { //success callback
            let fileUrl = await uploadTask.snapshot.ref.getDownloadURL();
            await this.sendMsg({ msg: fileUrl, type: 'image' });
            this.uploadState = 'upload completed';
            this.$refs.fileModal.resetFile();
            this.percent = 0;
            this.uploadState = '';
            $('#fileModal').modal('hide');
         });
      },
   },
   mounted() {
      this.addMsgEvent();
   },
   watch: {
      channelId(val, oldVal) {
         if (val === '' || oldVal === '') return;
         messageRef.child(oldVal).off('child_added', this.msgCallback);
      },
      privateChildRef(val, oldVal) {
         privateMsgRef.child(oldVal).off('child_added', this.msgCallback);
         this.msgLists = [];
         this.addMsgEvent();
      }
   }
}
</script>

<style scoped>
   /* .message-wrap {
      padding-bottom: 50px;
   } */
</style>