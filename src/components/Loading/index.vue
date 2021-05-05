<template>
   <div id="loading">
      <div class="loader">
         <svg class="circular-loader" viewBox="25 25 50 50">
            <circle class="loader-path" cx="50" cy="50" r="20"></circle>
         </svg>
      </div>
   </div>
</template>

<script>
export default {
   
};
</script>

<style lang="scss" scoped>
   #loading{
      position: fixed;
      left: 0;
      top: 0;
      @include size(100%, 100vh);
      background-color: rgba(#000, 0.55);
      z-index: 1000;
   }
   .loader {
      position: absolute;
      left: 50%;
      top: 50%;
      @include size(200px);
      transform: translate(-50%, -50%);
   }
   .circular-loader {
      @include size(100%);
      animation: rotate 2s linear infinite;
      transform-origin: center center;
   }
   .loader-path {
      stroke-dasharray: 150,200;
      stroke-dashoffset: -10;
      stroke-linecap: round;
      stroke: #fff;
      stroke-width: 1.5;
      fill: none;
      animation: dash 1.5s ease-in-out infinite;
   }
   @keyframes rotate {
      100% {
         transform: rotate(360deg);
      }
   }
   @keyframes dash {
      0% {
         stroke-dasharray: 1, 200;
         stroke-dashoffset: 0;
      }
      50% {
         stroke-dasharray: 89, 200;
         stroke-dashoffset: -35;
      }
      100% {
         stroke-dasharray: 89, 200;
         stroke-dashoffset: -124;
      }
   }
</style>
