<template src="./html/sidebar.html"></template>

<script>
import { mapState, mapMutations } from 'vuex';
import ChannelItem from './ChannelItem.vue';
import Users from './Users.vue';
import firebase from '@/plugins/firebase/index.js';
const usersRef = firebase.database().ref('users');
const connectedRef = firebase.database().ref('.info/connected');
const presenceRef = firebase.database().ref('presence');
const privateMsgRef = firebase.database().ref('privateMsg');
export default {
   components: {
      ChannelItem,
      Users
   },
   computed: {
      ...mapState('authStore', { userProfile: 'profile' }),
      ...mapState(['channelLists', 'userLists', 'privateNotify', 'channelId']),
   },
   methods: {
      ...mapMutations(['changeUserOnlineStatus', 'setPrivateNotify', 'updatePrivateNotify']),
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
      getPrivateMsgPath(userId) {
         let myUid = this.userProfile.uid;
         if (userId < myUid) return `${userId}/${myUid}`;
         else return `${myUid}/${userId}`;
      },
      addUserEvent() {
         usersRef.on('child_added', this.userCallback);
         connectedRef.on('value', this.detectOnline);
         presenceRef.on('child_added', (snapshot) => {
            let userId = snapshot.key;
            if (userId === this.userProfile.uid) return;
            this.changeUserOnlineStatus({ userId, status: true });
            let path = this.getPrivateMsgPath(userId);
            privateMsgRef.child(path).on('value', (snapshot) => {
               this.handlePrivateNotifications(userId, snapshot);
            });
         });
         presenceRef.on('child_removed', (snapshot) => {
            if (snapshot.key === this.userProfile.uid) return;
            this.changeUserOnlineStatus({ userId: snapshot.key, status: false });
         });
      },
      handlePrivateNotifications(userId, snapshot) {
         let currentPath = this.getPrivateMsgPath(userId);
         let messageTotal = snapshot.numChildren();
         let targetNotify = this.privateNotify.find(item => item.channelId === currentPath);
         if (targetNotify !== undefined) {
            let activePath = this.getPrivateMsgPath(this.channelId);
            if (activePath !== currentPath) {
               let lastTotal = targetNotify.total;
               let diff = messageTotal - lastTotal;
               if (diff > 0) {
                  this.updatePrivateNotify({ channelId: currentPath, key: 'diff', value: diff });
               }
            } else {
               this.updatePrivateNotify({ channelId: currentPath, key: 'total', value: messageTotal });
            }
            this.updatePrivateNotify({ channelId: currentPath, key: 'lastKnownTotal', value: messageTotal });
         } else {
            this.setPrivateNotify({
               channelId: this.getPrivateMsgPath(userId),
               total: messageTotal,
               lastKnownTotal: messageTotal,
               diff: 0
            });
         }
      }
   },
   mounted() {
      this.addUserEvent();
   },
   beforeDestroy() {
      usersRef.off('child_added', this.userCallback);
      connectedRef.off('value', this.detectOnline);
      presenceRef.off();
      this.$store.commit('clearUserLists');
      this.$store.commit('clearPrivateNotify');
   }
}
</script>

<style></style>