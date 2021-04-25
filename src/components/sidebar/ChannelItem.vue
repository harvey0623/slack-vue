<template>
   <button 
      class="list-group-item list-group-item-action channel-item"
      :class="{ active: isActive }"
      @click="changeChannel">
      {{ channelName }}
      <span v-show="showCount">{{ unReadCount }}</span>
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
      notifyCount() {
         return this.$store.state.notifyCount;
      },
      unReadCount() {
         let obj = this.notifyCount.find(item => item.id === this.id);
         if (obj !== undefined) return obj.notif;
         else return 0;
      },
      showCount() {
         if (this.unReadCount === 0) return false;
         if (this.isActive) return false;
         return true;
      }
   },
   methods: {
      changeChannel() {
         this.$store.commit('setChannelId', this.id);
         this.$store.commit('setIsPrivate', false);
      }
   }
}
</script>

<style></style>