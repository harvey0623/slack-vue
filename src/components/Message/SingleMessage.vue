<template>
   <div class="message-row" :class="{myself:isSelf}">
      <img :src="avatar" class="userAvatar">
      <p class="text" v-if="contentType === 'text'">{{ content }}</p>
      <div class="imgOuter" v-else>
         <img :src="placeholderUrl" v-load="content">
      </div>
      <p class="time">{{ releaseTime }}</p>
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
      contentType: {
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
   data: () => ({
      placeholderUrl: require('@/assets/img/placeholder.png')
   }),
   directives: {
      load: {
         inserted(el, binding, vnode) {
            let photoUrl = binding.value;
            let img = new Image();
            img.onload = () => {
               el.src = photoUrl;
               vnode.context.$emit('toBottom');
            }
            img.src = photoUrl;
         }
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
         month = month < 10 ? `0${month}` : month; 
         date = date < 10 ? `0${date}` : date; 
         hour = hour < 10 ? `0${hour}` : hour; 
         minute = minute < 10 ? `0${minute}` : minute; 
         return `${year}/${month}/${date} ${hour}:${minute}`;
      },
      isSelf() {
         return this.$store.state.authStore.profile.uid === this.userId;
      }
   }
}
</script>

<style lang="scss" src="./scss/singleMessage.scss" scoped></style>