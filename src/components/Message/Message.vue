<template>
   <div class="message-wrap">
      <h2>{{ channelName }}</h2>
      <div class="mt-3 mb-5">
         <SingleMessage
            v-for="msg in msgLists"
            :key="msg.msgId"
            :msgId="msg.msgId"
            :content="msg.content"
            :userName="msg.user.name"
            :userId="msg.user.id"
            :avatar="msg.user.avatar"
            :timestamp="msg.timestamp"
         ></SingleMessage>
      </div>
      <MessageForm 
         @sendMsg="sendMsg"
         @upload="openUploadModal" 
      ></MessageForm>
      <FileModal @getFile="getFileHandler"></FileModal>
   </div>
</template>

<script>
import { mapState } from 'vuex';
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
import FileModal from './FileModal.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
import { v4 as uuidv4 } from 'uuid';
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
      msgLists: []
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
      async sendMsg(msg) {
         let msgInfo = {
            content: msg,
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
         return this.isPrivate ? `chat/private/${this.channelId}` : 'chat/public';
      },
      getFileHandler({ file, metadata }) {
         let extension = file.type.split('/')[1];
         let filePath = `${this.getStoragePath()}/${uuidv4()}.${extension}`;
         let uploadTask = storageRef.child(filePath).put(file, metadata);
         uploadTask.on('state_change', snapshot => {
            //progress
         }, err => {
            
         }, () => {
            //finish
         });
      },
   },
   mounted() {
      this.addMsgEvent();
   },
   watch: {
      channelId(val) {
         if (val === '') return;
         if (this.isPrivate) {
            privateMsgRef.child(this.privateChildRef).off('child_added', this.msgCallback);
         } else {
            messageRef.child(this.channelId).off('child_added', this.msgCallback);
         }
         this.msgLists = [];
         this.addMsgEvent();
      }
   }
}
</script>

<style scoped>
   .message-wrap {
      padding-bottom: 50px;
   }
</style>