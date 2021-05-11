<template>
   <div class="message-row" :class="{myself:isSelf}">
      <img :src="avatar" class="userAvatar" @click="switchUser">
      <p class="text" v-if="contentType === 'text'" v-html="msgText"></p>
      <div class="imgOuter" v-else>
         <img :src="placeholderUrl" v-load="msgText" @click="imgClickHandler">
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
      placeholderUrl: require('@/assets/img/placeholder.png'),
      isPreloaded: false
   }),
   directives: {
      load: {
         inserted(el, binding, vnode) {
            let photoUrl = binding.value;
            let img = new Image();
            img.onload = () => {
               el.src = photoUrl;
               vnode.context.$emit('toBottom');
               vnode.context.isPreloaded = true;
            }
            img.src = photoUrl;
         }
      }
   },
   computed: {
      userProfile() {
         return this.$store.state.authStore.profile;
      },
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
      },
      msgText() {
         if (this.contentType !== 'text') return this.content;
         return this.urlify(this.content);
      }
   },
   methods: {
      imgClickHandler() {
         if (!this.isPreloaded || this.contentType !== 'image') return;
         this.$emit('selectImg', { msgId: this.msgId });
      },
      switchUser() {
         if (this.userProfile.uid === this.userId) return;
         this.$store.commit('setFavorUser', this.userId);
      },
      urlify(text) { //將字串中有url的文字轉成a tag
         let urlRegex = /(https?:\/\/[^\s]+)/g;
         return text.replace(urlRegex, (url) => {
            return `<a href="${url}" class="msg-web-url" target="_blank">${url}</a>`;
         });
      }
   },
}
</script>

<style lang="scss" src="./scss/singleMessage.scss" scoped></style>