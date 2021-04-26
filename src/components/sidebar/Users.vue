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
            <span v-show="showCount">{{ unReadCount }}</span>
         </span>
      </span>
   </button>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
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
      ...mapState(['channelId', 'privateNotify', ]),
      ...mapState('authStore', { userProfile: 'profile' }),
      statusClass() {
         return this.isOnline ? 'text-primary' : 'text-danger';
      },
      unReadCount() {
         let obj = this.privateNotify.find(item => {
            let arr = item.channelId.split('/');
            return arr.includes(this.userId);
         });
         if (obj !== undefined ) return obj.diff;
         else return 0;
      },
      isActive() {
         return this.channelId === this.userId;
      },
      showCount() {
         if (this.unReadCount === 0) return false;
         if (this.isActive) return false;
         return true;
      }
   },
   methods: {
      ...mapMutations(['updatePrivateNotify']),
      getPrivateMsgPath(userId) {
         let myUid = this.userProfile.uid;
         if (userId < myUid) return `${userId}/${myUid}`;
         else return `${myUid}/${userId}`;
      },
      changeUser() {
         this.$store.commit('setChannelId', this.userId);
         this.$store.commit('setIsPrivate', true);
         let currentPath = this.getPrivateMsgPath(this.channelId);
         let obj = this.privateNotify.find(item => item.channelId === currentPath);
         if (obj === undefined) return;
         this.updatePrivateNotify({
            channelId: currentPath,
            key: 'total',
            value: obj.lastKnownTotal
         });
         this.updatePrivateNotify({ channelId: currentPath, key: 'diff', value: 0 });
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