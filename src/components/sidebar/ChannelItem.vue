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
import { mapMutations } from 'vuex';
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
      ...mapMutations(['updateNotifyCount']),
      changeChannel() {
         this.$store.commit('setChannelId', this.id);
         this.$store.commit('setIsPrivate', false);
         // this.resetNootify();
      },
      resetNootify() {
         let index = this.notifyCount.findIndex(item => item.id === this.id);
         if (index === -1) return;
         this.updateNotifyCount({
            key: 'total',
            index,
            count: this.notifyCount[index].lastKnownTotal
         });
         this.updateNotifyCount({
            key: 'notif',
            index,
            count: 0
         });
      }
   }
}
</script>

<style></style>