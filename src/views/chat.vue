<template src="./html/chat.html"></template>

<script>
import { mapState } from 'vuex';
import Sidebar from '@/components/sidebar/Sidebar.vue';
import Message from '@/components/Message/Message.vue';
import { databaseApi } from '@/api/index.js';
import firebase from '@/plugins/firebase/index.js';
const channelRef = firebase.database().ref('channels');
const messageRef = firebase.database().ref('messages');
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
      notifCount: []
   }),
   computed: {
      hasAddError() {
         return this.addError !== '';
      },
      ...mapState(['channelLists', 'channelId']),
      ...mapState('authStore', { userProfile: 'profile' }),
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
         this.addCountListener(snapshot.key);
      },
      async addChannelEvent() {
         channelRef.on('child_added', this.channelCallback);
      },
      addCountListener(channelId) {
         messageRef.child(channelId).on('value', snapshot => {
            this.handleNotifications(channelId, this.channelId, this.notifCount, snapshot);
         });
      },
      handleNotifications(channelId, currentChannelId, notifCount, snapshot) {
         let lastTotal = 0;
         let index = notifCount.findIndex(el => el.id === channelId);
         if (index !== -1) {
            if (channelId !== currentChannelId) {
               lastTotal = notifCount[index].total;
               if (snapshot.numChildren() - lastTotal > 0) {
                  notifCount[index].notif = snapshot.numChildren() - lastTotal;
               }
            }
            notifCount[index].lastKnownTotal = snapshot.numChildren();
         } else {
            notifCount.push({
               id: channelId,
               total: snapshot.numChildren(),
               lastKnownTotal: snapshot.numChildren(),
               notif: 0
            });
         }
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
