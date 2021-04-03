<template>
   <div>
      <h2>{{ channelName }}</h2>
      <SingleMessage></SingleMessage>
      <MessageForm></MessageForm>
   </div>
</template>

<script>
import SingleMessage from './SingleMessage.vue';
import MessageForm from './MessageForm.vue';
export default {
   components: {
      SingleMessage,
      MessageForm
   },
   computed: {
      channelName() {
         return this.$store.getters.channelName;
      }
   }
}
</script>

<style>

</style>