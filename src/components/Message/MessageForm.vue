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
            v-model="message"
            @keydown.enter.prevent.exact="sendMessage"
            @keyup.ctrl.enter.prevent="newLine"
            placeholder="message...">
         </textarea>
         <div class="iconBox" @click="sendMessage">
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
      newLine(e) {
         let index = e.target.selectionStart;
         e.target.setRangeText('\n', index, index, 'end');
         this.text = e.target.value;
      },
      sendMessage() {
         if (this.message === '') return;
         if (this.channelId === '') return;
         this.$emit('sendMsg', { msg: this.message, type: 'text' });
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