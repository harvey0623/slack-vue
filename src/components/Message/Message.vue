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
      <MessageForm @sendMsg="sendMsg"></MessageForm>
   </div>
</template>

<script>
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
const messageRef = firebase.database().ref('messages');
export default {
   components: {
      SingleMessage,
      MessageForm
   },
   data: () => ({
      msgLists: []
   }),
   computed: {
      channelId() {
         return this.$store.state.channelId;
      },
      channelName() {
         return this.$store.getters.channelName;
      },
      userProfile() {
         return this.$store.state.authStore.profile;
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
         await databaseApi.addMessage({ channelId: this.channelId, msgInfo });
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
         messageRef.child(this.channelId).on('child_added', this.msgCallback);
      }
   },
   mounted() {
      this.addMsgEvent();
   },
   watch: {
      channelId(val) {
         if (val === '') return;
         messageRef.off('child_added', this.msgCallback);
         this.msgLists = [];
         this.addMsgEvent();
      }
   },
   beforeDestroy() {
      messageRef.off('child_added', this.msgCallback);
   }
}
</script>

<style scoped>
   .message-wrap {
      padding-bottom: 50px;
   }
</style>