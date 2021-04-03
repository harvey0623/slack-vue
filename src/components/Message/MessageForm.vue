<template>
  <div>
    <div class="messageform">
      <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated"></div>
      </div>
      <form>
        <div class="input-group mb-3">
         <input
            name="message"
            id="message"
            placeholder="Write something"
            class="form-control mt-3"
            autofocus/>
         <div class="input-group-append">
            <button class="btn btn-primary mt-3">Send</button>
         </div>
         <div class="input-group-append">
            <button
               class="btn btn-warning mt-3"
               type="button">
               Upload
            </button>
          </div>
        </div>
      </form>
      <!-- <file-modal ref="file_modal"></file-modal> -->
    </div>
  </div>
</template>

<script>
export default {

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
</style>