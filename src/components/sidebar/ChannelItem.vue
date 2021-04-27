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
      id: {
         type: String,
         required: true
      },
      channelName: {
         type: String,
         required: true
      }
   },
   computed: {
      channelId() {
         return this.$store.state.channelId;
      },
      isActive() {
         return this.id === this.channelId;
      },
   },
   methods: {
      changeChannel() {
         this.$store.commit('setChannelId', this.id);
         this.$store.commit('setIsPrivate', false);
      },
   }
}
</script>

<style></style>