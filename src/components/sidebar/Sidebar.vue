<template src="./html/sidebar.html"></template>

<script>
import ChannelItem from './ChannelItem.vue';
import Users from './Users.vue';
import firebase from '@/plugins/firebase/index.js';
const usersRef = firebase.database().ref('users');
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
      addUserEvent() {
         usersRef.on('child_added', this.userCallback);
      }
   },
   mounted() {
      this.addUserEvent();
   },
   beforeDestroy() {
      usersRef.off('child_added', this.userCallback);
   }
}
</script>

<style></style>