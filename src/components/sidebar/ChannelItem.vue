<template>
   <div 
      class="channel-item"
      :class="{ active: isActive }"
      @click="changeChannel">
      {{ channelName }}
   </div>
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

<style lang="scss" scoped>
   .channel-item {
      @extend %channelItemStyle;
      &:hover {
         background-color: darken(map-get($elBgColor, primary), 0.8);
      }
      &:last-child {
         margin-bottom: 0;
      }
      &.active {
         background-color: map-get($elBgColor, selected);
         color: #fff;
      }
   }
</style>