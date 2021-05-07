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
      },
      escHandler(evt) {
         if (evt.keyCode === 27) this.closeHandler();
      }
   },
   mounted() {
      document.addEventListener('keyup', this.escHandler);
   },
   beforeDestroy() {
      document.removeEventListener('keyup', this.escHandler);
   }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>