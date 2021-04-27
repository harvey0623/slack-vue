<template src="./html/sidebar.html"></template>

<script>
import { mapState, mapMutations } from 'vuex';
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
   computed: {
      ...mapState('authStore', { userProfile: 'profile' }),
      ...mapState(['channelLists', 'userLists']),
   },
   methods: {
      ...mapMutations(['changeUserOnlineStatus']),
      logout() {
         this.$emit('logout');
      },
      openModal() {
         this.$emit('openModal');
      },
      userCallback(snapshot) {
         if (this.userProfile.uid === snapshot.key) return;
         this.$store.commit('addUserItem', {
            ...snapshot.val(),
            uid: snapshot.key,
            isOnline: false
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
      addUserEvent() {
         usersRef.on('child_added', this.userCallback);
         connectedRef.on('value', this.detectOnline);
         presenceRef.on('child_added', this.addPresence);
         presenceRef.on('child_removed', this.removePresence);
      },
      addPresence(snapshot) {
         let userId = snapshot.key;
         if (userId === this.userProfile.uid) return;
         this.changeUserOnlineStatus({ userId, status: true });
      },
      removePresence(snapshot) {
         if (snapshot.key === this.userProfile.uid) return;
         this.changeUserOnlineStatus({ userId: snapshot.key, status: false });
      }
   },
   mounted() {
      this.addUserEvent();
   },
   beforeDestroy() {
      usersRef.off('child_added', this.userCallback);
      connectedRef.off('value', this.detectOnline);
      presenceRef.off('child_added', this.addPresence);
      presenceRef.off('child_removed', this.removePresence);
      this.$store.commit('clearUserLists');
   }
}
</script>

<style></style>