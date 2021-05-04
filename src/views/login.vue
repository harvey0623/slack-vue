<template src="./html/login.html"></template>

<script>
export default {
   name: 'login',
   data: () => ({
      isLoading: false,
      showTitle: false,
      loginErrorMsg: ''
   }),
   computed: {
      hasError() {
         return this.loginErrorMsg !== '';
      }
   },
   methods: {
      async loginWithGoogle() {
         this.isLoading = true;
         this.loginErrorMsg = '';
         let { status, message } = await this.$store.dispatch('authStore/login');
         this.loginErrorMsg = message;
         if (status) this.$router.replace('/chat');
         this.isLoading = false;
      },
      createCurveText() {
         new CircleType(this.$refs.chatroomTitle).radius(360);
         this.showTitle = true;
      }
   },
   mounted() {
      this.createCurveText();
   }
}
</script>

<style lang="scss" src="./scss/login.scss" scoped></style>