<template>
   <button class="list-group-item list-group-item-action">
      <span></span>
      <span>
         <img :src="avatar" class="img rounded-circle" height="20">
         <span>
            <a href="javascript:;" :class="statusClass">{{ userName }}</a>
            <span class="float-right"></span>
         </span>
      </span>
   </button>
</template>

<script>
export default {
   props: {
      userId: {
         type: String,
         required: true
      },
      userName: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         required: true
      },
      isOnline: {
         type: Boolean,
         required: true
      }
   },
   computed: {
      statusClass() {
         return this.isOnline ? 'text-primary' : 'text-danger';
      }
   }
};
</script>

<style>
   .online{
      color:green;
   } 
   .offline{
      color:red;
   }
</style>