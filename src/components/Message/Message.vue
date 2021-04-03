<template>
   <div>
      <h2>{{  }}</h2>
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
   }
}
</script>

<style>

</style>