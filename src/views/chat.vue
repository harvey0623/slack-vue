<template src="./html/chat.html"></template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Message from '@/components/Message/Message.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
const channelRef =  firebase.database().ref('channels');
const presenceRef = firebase.database().ref('presence');
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
      },
      userProfile() {
         return this.$store.state.authStore.profile;
      },
      channelLists() {
         return this.$store.state.channelLists;
      }
   },
   methods: {
      async logoutHandler() {
         this.isLoading = true;
         presenceRef.child(this.userProfile.uid).remove();
         await this.$store.dispatch('authStore/logout');
         this.$router.replace('/login');
         this.isLoading = false;
      },
      openModal() {
         $('#channelModal').modal('show');
      },
      checkSameChannel() {
         let targetChannel = this.channelLists.find(list => {
            return list.name.toLowerCase() === this.new_channel.toLowerCase();
         });
         return targetChannel !== undefined;
      },
      async addChannel() {
         this.addError = '';
         if (this.new_channel === '') return this.addError = '請輸入頻道名稱';
         let hasSameChannel = this.checkSameChannel();
         if (hasSameChannel) return this.addError = '已有相同的頻道';
         this.isLoading = true;
         let addResult = await databaseApi.addChannel(this.new_channel);
         if (addResult.status) {
            this.new_channel = '';
            $('#channelModal').modal('hide');
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
