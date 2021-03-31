<template src="./html/sidebar.html"></template>

<script>
import ChannelItem from '@/components/ChannelItem/index.vue';
export default {
   components: {
      ChannelItem
   },
   props: {
      channelLists: {
         type: Array,
         required: true
      }
   },
   computed: {
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
      }
   }
}
</script>

<style>

</style>