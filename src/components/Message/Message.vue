<template src="./html/message.html"></template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapState } from 'vuex';
import { databaseApi } from '@/api/index.js';
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
import Lightbox from '@/components/Lightbox/index.vue';
import ProgressLoading from '@/components/Loading/ProgressLoading.vue';
import firebase from '@/plugins/firebase/index.js';
const messageRef = firebase.database().ref('messages');
const privateMsgRef = firebase.database().ref('privateMsg');
const storageRef = firebase.storage().ref();
export default {
   components: {
      SingleMessage,
      MessageForm,
      ProgressLoading,
      Lightbox
   },
   data: () => ({
      msgLists: [],
      uploadPercent: 0,
      isUploading: false,
      galleryIndex: 0,
      lightBoxIsOpen: false
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
      },
      imageGallery() { //對話圖片資料
         return this.msgLists.filter(msg => msg.contentType === 'image');
      },
      totalGallery() {
         return this.imageGallery.length;
      },
      photoUrl() { //目標圖片
         let obj = this.imageGallery[this.galleryIndex];
         if (obj !== undefined) return obj.content;
         else return '';
      },
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
         let messageContent = this.$refs.messageContent;
         if (messageContent === undefined) return;
         messageContent.scrollTop = messageContent.scrollHeight;
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
      selectImg({ msgId }) { //選擇對話圖片
         this.galleryIndex = this.imageGallery.findIndex(item => item.msgId === msgId);
         if (this.galleryIndex === -1) return;
         this.lightBoxIsOpen = true;
      },
      countGalleryIndex(val) {
         let count = this.galleryIndex + val;
         if (count > this.totalGallery - 1) {
            this.galleryIndex = this.totalGallery - 1;
         } else if (count < 0) {
            this.galleryIndex = 0;
         } else {
            this.galleryIndex = count;
         }
      }
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