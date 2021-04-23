<template>
   <div>
      <div class="messageform">
         <div class="progress" v-show="uploadState !== ''">
            <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width:progressWidth}">
               {{ uploadState }}
            </div>
         </div>
         <div>
            <div class="input-group mb-3">
               <input
                  id="message"
                  class="form-control mt-3"
                  placeholder="Write something"
                  name="message"
                  @keyup.enter="sendHandler"
                  v-model.trim="message"
                  autocomplete="off">
               <div class="input-group-append">
                  <button class="btn btn-primary mt-3" @click="sendHandler">Send</button>
               </div>
               <div class="input-group-append">
                  <button class="btn btn-warning mt-3" @click="uploadHandler">Upload</button>
               </div>
            </div>
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

<style scoped>
   .messageform {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 67%;
      z-index: 100;
      color: white;
      text-align: center;
      margin-bottom: -20px;
      margin-left: 33.3%;
   }
   input,
   button {
      height: 50px;
   }
   .progress {
      margin-bottom: -16px;
   }
   .progress-bar {
      overflow: hidden;
   }
</style>