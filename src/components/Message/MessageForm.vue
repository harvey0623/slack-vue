<template>
   <div class="messageform">
      <div class="progress" v-show="uploadState !== ''">
         <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width:progressWidth}">
            {{ uploadState }}
         </div>
      </div>
      <div class="inputGroup">
         <div class="iconBox" @click="uploadHandler">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
         </div>
         <textarea
            class="msgInput"
            placeholder="message..."
            @keyup.enter="sendHandler"
            v-model.trim="message">
         </textarea>
         <!-- <input
            class="msgInput"
            placeholder="message..."
            @keyup.enter="sendHandler"
            v-model.trim="message"
            autocomplete="off"> -->
         <div class="iconBox" @click="sendHandler">
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      percent: {
         type: Number,
         required: true
      },
      uploadState: {
         type: String,
         required: true
      }
   },
   data: () => ({
      message: ''
   }),
   computed: {
      channelId() {
         return this.$store.state.channelId;
      },
      progressWidth() {
         return `${this.percent}%`;
      },
   },
   methods: {
      sendHandler() {
         if (this.message === '') return;
         if (this.channelId === '') return;
         this.$emit('sendMsg', {
            msg: this.message,
            type: 'text'
         });
         this.message = '';
      },
      uploadHandler() {
         if (this.channelId === '') return;
         this.$emit('openModal');
      }
   },
};
</script>

<style lang="scss" src="./scss/messageForm.scss" scoped></style>