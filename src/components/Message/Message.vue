<template>
   <div>
      <h2>{{ channelName }}</h2>
      <SingleMessage></SingleMessage>
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
      profile() {
         return this.$store.state.authStore.profile;
      }
   },
   methods: {
      async sendMsg(msg) {
         let channelId = this.$store.state.channelId;
         let msgInfo = {
            content: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
               name: this.profile.name,
               avatar: this.profile.picture,
               id: this.profile.uid
            }
         };
         await databaseApi.addMessage({ channelId, msgInfo });
      },
      msgCallback(snapshot) {
         this.msgLists.push(snapshot.val());
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

<style></style>