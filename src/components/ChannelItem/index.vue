<template>
   <button 
      class="list-group-item list-group-item-action channel-item"
      :class="{ active: isActive }"
      @click="changeChannel">
      {{ channelName }}
   </button>
</template>

<script>
export default {
   props: {
      channelId: {
         type: String,
         required: true
      },
      channelName: {
         type: String,
         required: true
      }
   },
   computed: {
      currentChannel() {
         return this.$store.state.currentChannel;
      },
      isActive() {
         return this.channelId === this.currentChannel;
      }
   },
   methods: {
      changeChannel() {
         this.$store.commit('setChannel', this.channelId);
      }
   }
}
</script>

<style>

</style>