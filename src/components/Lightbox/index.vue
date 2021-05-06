<template>
   <div class="lightBox" v-show="isOpen">
      <div class="closeBox" @click="closeHandler">
         <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="dirBox left">
         <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div class="dirBox right">
         <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </div>
      <slot namer="default"></slot>
   </div>
</template>

<script>
export default {
   props: {
      isOpen: {
         type: Boolean,
         default: false
      }
   },
   methods: {
      closeHandler() {
         this.$emit('update:isOpen', false);
      }
   }
}
</script>

<style lang="scss" scoped>
   .lightBox {
      position: fixed;
      left: 0;
      top: 0;
      @include size(100%, 100vh);
      background-color: rgba(#000, 0.55);
      overflow: hidden;
      z-index: 20;
      >.closeBox {
         position: absolute;
         left: 30px;
         top: 20px;
         color: #fff;
         font-size: 50px;
         cursor: pointer;
      }
      >.dirBox {
         color: #fff;
         font-size: 40px;
         &.disable {
            opacity: 0.7;
         }
      }
   }
</style>