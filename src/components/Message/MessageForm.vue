<template>
   <div class="messageform">
      <div class="progress" v-show="uploadState !== ''">
         <div class="progress-bar progress-bar-striped progress-bar-animated" :style="{width:progressWidth}">
            {{ uploadState }}
         </div>
      </div>
      <div class="inputGroup">
         <label class="iconBox">
            <i class="fa fa-picture-o" aria-hidden="true"></i>
            <input type="file" class="form-control" ref="file" @change="fileChange" hidden>
         </label>
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
const mime = require('mime-types');
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
      message: '',
      file: ''
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
         this.$emit('sendMsg', { msg: this.message, type: 'text' });
         this.message = '';
      },
      validateFile(file) {
         let formatList = ['image/jpeg', 'image/jpg', 'image/png'];
         let isRightFormat = formatList.includes(file.type);
         let isRightSize = Math.floor(file.size / 1024 / 1024) <= 3;
         return isRightFormat && isRightSize;
      },
      fileChange(evt) {
         let file = evt.target.files[0];
         if (file === undefined) return;
         let isValid = this.validateFile(file);
         if (!isValid) {
            alert('只能上傳3MB圖片檔案');
            this.resetFile();
            return;
         }
         this.uploadHandler(file)
      },
      uploadHandler(file) {
         let extension = file.type.split('/')[1];
         let metadata = { contentType: mime.lookup(file.name) };
         this.$emit('uploadFile', { file, extension, metadata });
         this.resetFile();
      },
      resetFile() {
         this.file = null;
         this.$refs.file.type = 'text';
         this.$refs.file.type = 'file';
      }
   },
};
</script>

<style lang="scss" src="./scss/messageForm.scss" scoped></style>