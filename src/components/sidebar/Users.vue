<template>
   <button 
      class="list-group-item list-group-item-action" 
      :class="{active: isActive}"
      @click="changeUser">
      <span></span>
      <span>
         <img :src="avatar" class="img rounded-circle" height="20">
         <span>
            <a href="javascript:;" :class="statusClass">{{ userName }}</a>
            <span class="float-right"></span>
         </span>
      </span>
   </button>
</template>

<script>
export default {
   props: {
      userId: {
         type: String,
         required: true
      },
      userName: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         required: true
      },
      isOnline: {
         type: Boolean,
         required: true
      }
   },
   computed: {
      statusClass() {
         return this.isOnline ? 'text-primary' : 'text-danger';
      },
      isActive() {
         return this.$store.state.channelId === this.userId;
      },
   },
   methods: {
      changeUser() {
         this.$store.commit('setChannelId', this.userId);
         this.$store.commit('setIsPrivate', true);
      },
   }
};
</script>

<style scoped>
   .online{
      color:green;
   } 
   .offline{
      color:red;
   }
   .list-group-item-action.active {
      background-color: orange;
   }
</style>