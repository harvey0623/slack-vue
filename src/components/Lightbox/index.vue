<template>
   <div class="lightBox" v-show="isOpen">
      <div class="closeBox" @click="closeHandler">
         <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div
         class="dirBox left" 
         :class="{disabled: isStart}" 
         v-show="isThnaOne" 
         @click="dirHandler(-1)">
         <i class="fa fa-chevron-left" aria-hidden="true"></i>
      </div>
      <div
         class="dirBox right" 
         :class="{disabled: isEnd}" 
         v-show="isThnaOne" 
         @click="dirHandler(1)">
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
      },
      totalGallery: {
         type: Number,
         required: true
      },
      galleryIndex: {
         type: Number,
         required: true
      }
   },
   computed: {
      isThnaOne() {
         return this.totalGallery > 1;
      },
      isStart() {
         return this.galleryIndex === 0;
      },
      isEnd() {
         return this.galleryIndex === this.totalGallery - 1;
      }
   },
   methods: {
      closeHandler() {
         this.$emit('update:isOpen', false);
         this.$emit('update:galleryIndex', 0);
      },
      keyupHandler(evt) {
         if (!this.isOpen) return;
         let keyCode = evt.keyCode;
         if (keyCode === 27) return this.closeHandler();
         if (keyCode === 39) return this.$emit('count', 1);
         if (keyCode === 37) return this.$emit('count', -1);
      },
      dirHandler(val) {
         this.$emit('count', val);
      }
   },
   mounted() {
      document.addEventListener('keyup', this.keyupHandler);
   },
   beforeDestroy() {
      document.removeEventListener('keyup', this.keyupHandler);
   }
}
</script>

<style lang="scss" src="./index.scss" scoped></style>