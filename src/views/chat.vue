<template src="./html/chat.html"></template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Message from '@/components/Message/Message.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
const channelRef =  firebase.database().ref('channels');
export default {
   name: 'chat',
   components: {
      Sidebar,
      Message
   },
   data: () => ({
      isLoading: false,
      new_channel: '',
      addError: '',
   }),
   computed: {
      hasAddError() {
         return this.addError !== '';
      }
   },
   methods: {
      async logoutHandler() {
         this.isLoading = true;
         await this.$store.dispatch('authStore/logout');
         this.$router.replace('/login');
         this.isLoading = false;
      },
      openModal() {
         $('#channelModal').modal('show');
      },
      async checkSameChannel() {
         let lists = await databaseApi.getChannels();
         let result = lists.find(list => list.name.toLowerCase() === this.new_channel.toLowerCase());
         return result !== undefined;
      },
      async addChannel() {
         this.addError = '';
         if (this.new_channel === '') return this.addError = '請輸入頻道名稱';
         this.isLoading = true;
         let hasSameChannel = await this.checkSameChannel();
         if (!hasSameChannel) {
            let addResult = await databaseApi.addChannel(this.new_channel);
            if (addResult.status) {
               this.new_channel = '';
               $('#channelModal').modal('hide');
            }
         } else {
            this.addError = '已有相同的頻道';
         }
         this.isLoading = false;
      },
      channelCallback(snapshot) {
         this.$store.commit('setChannelItem', snapshot.val());
      },
      async addChannelEvent() {
         channelRef.on('child_added', this.channelCallback);
      }
   },
   mounted() {
      this.addChannelEvent();
      databaseApi.getChannels();
   },
   beforeDestroy() {
      this.$store.commit('setChannelId', '');
      this.$store.commit('clearChannelLists');
      channelRef.off('child_added', this.channelCallback);
   }
};
</script>

<style lang="scss" scoped>
   .sidebar {
      width: 33%;
      display: block;
      float: left;
      position: fixed;
      height: 100%;
      background: #000;
      padding-top: 2em;
      overflow: auto;
   }
   .content {
      width: 67%;
      height: 100vh;
      display: block;
      float: left;
      margin-left: 33%;
      max-width: initial;
   }
</style>
