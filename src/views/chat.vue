<template src="./html/chat.html"></template>

<script>
export default {
   name: 'chat',
   data: () => ({
      isLoading: false,
   }),
   computed: {
      userProfile() {
         return this.$store.state.authStore.profile;
      }
   },
   methods: {
      async logoutHandler() {
         this.isLoading = true;
         await this.$store.dispatch('authStore/logout');
         this.$router.replace('/login');
         this.isLoading = false;
      }
   }
};
</script>

<style lang="scss">
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
