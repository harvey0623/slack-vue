<template src="./html/login.html"></template>

<script>
export default {
   name: 'login',
   data: () => ({
      isLoading: false,
      loginErrorText: ''
   }),
   computed: {
      hasError() {
         return this.loginErrorText !== '';
      }
   },
   methods: {
      async loginWithGoogle() {
         this.loginErrorText = '';
         this.isLoading = true;
         let { status, message } = await this.$store.dispatch('authStore/login');
         this.loginErrorText = message;
         if (status) this.$router.replace('/chat');
         this.isLoading = false;
      }
   },
}
</script>

<style>
   .btn,
   .jumbotron {
      border-radius: 0px;
   }
</style>