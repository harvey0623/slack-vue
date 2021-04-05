<template>
   <button class="list-group-item list-group-item-action">
      <span></span>
      <span>
         <img :src="avatar" class="img rounded-circle" height="20">
         <span>
            <a href="javascript:;">{{ userName }}</a>
            <span class="float-right"></span>
         </span>
      </span>
   </button>
</template>

<script>
export default {
   props: {
      userName: {
         type: String,
         required: true
      },
      avatar: {
         type: String,
         required: true
      },
      status: {
         type: String,
         required: true
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