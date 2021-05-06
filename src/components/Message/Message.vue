<template>
   <div class="messageOuter">
      <div class="channelBar" v-if="isOpenChannel">Channel: {{ channelName }}</div>
      <div class="messageContent" ref="messageContent">
         <div class="single-group" v-if="isOpenChannel">
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
               @toBottom="scrollToBottom"
            ></SingleMessage>
         </div>
         <div class="emptyBlock" v-else>
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
            <p>講幹話吧~</p>
         </div>
      </div>
      <MessageForm
         v-if="isOpenChannel"
         @sendMsg="sendMsg"
         @uploadFile="uploadFileHandler"
      ></MessageForm>
      <ProgressLoading
         :isUploading="isUploading"
         :uploadPercent="uploadPercent"
      ></ProgressLoading>
   </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';
import { databaseApi } from '@/api/index.js';
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
import ProgressLoading from '@/components/Loading/ProgressLoading.vue';
import firebase from '@/plugins/firebase/index.js';
const messageRef = firebase.database().ref('messages');
const privateMsgRef = firebase.database().ref('privateMsg');
const storageRef = firebase.storage().ref();
export default {
   components: {
      SingleMessage,
      MessageForm,
      ProgressLoading
   },
   data: () => ({
      msgLists: [],
      uploadPercent: 0,
      isUploading: false,
   }),
   computed: {
      ...mapState(['channelId', 'isPrivate']),
      ...mapState('authStore', { userProfile: 'profile' }),
      channelName() {
         return this.$store.getters.channelName;
      },
      isOpenChannel() {
         return this.channelName !== '';
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
      scrollToBottom() {
         this.$refs.messageContent.scrollTop = this.$refs.messageContent.scrollHeight;
      },
      async msgCallback(snapshot) {
         this.msgLists.push({
            msgId: snapshot.key,
            ...snapshot.val()
         });
         await this.$nextTick();
         this.scrollToBottom();
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
         this.isUploading = true;
         uploadTask.on('state_change', snapshot => { //processing callback
            this.uploadPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         }, () => { //error callback
            this.isUploading = false;
            this.uploadPercent = 0;
            alert('上傳發生錯誤');
         }, async () => { //success callback
            let fileUrl = await uploadTask.snapshot.ref.getDownloadURL();
            await this.sendMsg({ msg: fileUrl, type: 'image' });
            this.isUploading = false;
            this.uploadPercent = 0;
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

<style lang="scss" src="./scss/message.scss" scoped></style>