<template>
   <div class="modal fade" id="fileModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
         <div class="modal-header">
            <h5 class="modal-title text-dark">Upload file (jpeg, png, imb max)</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span>
            </button>
         </div>
         <div class="modal-body">
            <form class="form">
               <div class="form-group">
                  <input type="file" id="file" name="file" class="form-control" ref="file" @change="fileChange">
               </div>
            </form>
         </div>
         <div class="modal-footer">
            <button class="btn btn-secondary" data-dismiss="modal">Cancle</button>
            <button class="btn btn-primary" @click="uploadHandler">Send file</button>
         </div>
      </div>
      </div>
   </div>
</template>

<script>
export default {
   data: () => ({
      file: null
   }),
   methods: {
      fileChange(evt) {
         let file = evt.target.files[0];
         let formatList = ['image/jpeg', 'image/jpg', 'image/png'];
         let isInclude = formatList.includes(file.type);
         if (!isInclude) {
            alert('只能上傳圖片檔案');
            this.resetFile();
            return;
         }
         this.file = file;
      },
      uploadHandler() {
         if (this.file === null) return alert('請選擇圖片')
         this.$emit('getFile', { file: this.file });
      },
      resetFile() {
         this.file = null;
         this.$refs.file.type = 'text';
         this.$refs.file.type = 'file';
      }
   }
}
</script>

<style>

</style>