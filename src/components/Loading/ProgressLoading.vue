<template>
   <div id="progress-loading" v-show="isUploading">
      <div class="progress-content">
         <div class="progress">
            <p class="loadingText">上傳中...</p>
            <div 
               class="progress-bar progress-bar-striped progress-bar-animated" 
               :style="progressWidth">
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      isUploading: {
         type: Boolean,
         default: false
      },
      uploadPercent: {
         type: Number,
         required: true
      },
   },
   computed: {
      progressWidth() {
         return  { width: `${this.uploadPercent}%` };
      },
   }
};
</script>

<style lang="scss" scoped>
   #progress-loading {
      position: fixed;
      left: 0;
      top: 0;
      @include size(100%, 100vh);
      background-color: rgba(#000, 0.55);
      z-index: 1000;
   }
   .progress-content {
      position: absolute;
      @extend %posCenter;
      width: 500px;
      text-align: center;
      >.progress {
         position: relative;
         height: 30px;
         font-size: 18px;
         >.loadingText {
            position: absolute;
            left: 0;
            top: 0;
            @include size(100%);
            line-height: 30px;
            text-align: center;
            color: map-get($fontColor, send);
         }
         >.progress-bar {
            background-color: map-get($elBgColor, selected);
         }
      }
   }
</style>
