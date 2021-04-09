<template src="./html/sidebar.html"></template>

<script>
import ChannelItem from './ChannelItem.vue';
import Users from './Users.vue';
import firebase from '@/plugins/firebase/index.js';
const usersRef = firebase.database().ref('users');
const connectedRef = firebase.database().ref('.info/connected');
const presenceRef = firebase.database().ref('presence');
export default {
   components: {
      ChannelItem,
      Users
   },
   data: () => ({
      userLists: []
   }),
   computed: {
      channelLists() {
         return this.$store.state.channelLists;
      },
      userProfile() {
         return this.$store.state.authStore.profile;
      }
   },
   methods: {
      logout() {
         this.$emit('logout');
      },
      openModal() {
         this.$emit('openModal');
      },
      userCallback(snapshot) {
         if (this.userProfile.uid === snapshot.key) return;
         this.userLists.push({
            ...snapshot.val(),
            uid: snapshot.key,
            status: 'offline'
         });
      },
      detectOnline(snapshot) { //偵測上線狀態
         let isOnline = snapshot.val();
         if (isOnline) {
            let ref = presenceRef.child(this.userProfile.uid);
            ref.set(true);
            ref.onDisconnect().remove();
         }
      },
      addStatusToUser({ userId, status }) {
         let targetUser = this.userLists.find(user => user.uid === userId);
         if (targetUser === undefined) return;
         targetUser.status = status ? 'online' : 'offline';
      },
      addUserEvent() {
         usersRef.on('child_added', this.userCallback);
         connectedRef.on('value', this.detectOnline);
         presenceRef.on('child_added', (snapshot) => {
            this.addStatusToUser({ userId: snapshot.key, status: true });
         });
         presenceRef.on('child_removed', (snapshot) => {
            this.addStatusToUser({ userId: snapshot.key, status: false });
         });
      }
   },
   mounted() {
      this.addUserEvent();
   },
   beforeDestroy() {
      usersRef.off('child_added', this.userCallback);
      connectedRef.off('value', this.detectOnline);
      presenceRef.off();
   }
}
</script>

<style></style>