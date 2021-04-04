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
export default {
   components: {
      SingleMessage,
      MessageForm
   },
   computed: {
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
      }
   }
}
</script>

<style>

</style>