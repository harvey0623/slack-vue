<template>
   <div>
      <div class="media">
         <img height="50">
         <div class="media-body">
            <img :src="avatar" class="align-self-start mr-3" height="200">
            <h6 class="mt-0">
               <a href="javascript:;">{{ userName }} - {{ releaseTime }}</a>
            </h6>
            <p :class="{self_message:isSelf}">{{ content }}</p>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      msgId: {
         type: String,
         required: true
      },
      content: {
         type: String,
         required: true
      },
      userName: {
         type: String,
         required: true
      },
      userId: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         required: true
      },
      timestamp: {
         type: Number,
         required: true
      }
   },
   computed: {
      releaseTime() {
         let time = new Date(this.timestamp);
         let year = time.getFullYear();
         let month = time.getMonth() + 1;
         let date = time.getDate();
         let hour = time.getHours();
         let minute = time.getMinutes();
         return `${year}/${month}/${date} ${hour}:${minute}`;
      },
      isSelf() {
         return this.$store.state.authStore.profile.uid === this.userId;
      }
   }
}
</script>

<style scoped>
   .self_message {
      border-left: 5px solid red;
      padding: 0 10px;
   }
</style>