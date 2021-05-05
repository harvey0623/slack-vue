<template>
   <div class="user-item" :class="{active: isActive}" @click="changeUser">
      <img :src="avatar">
      <span class="light" :class="{isOnline: isOnline}"></span>
      <p>{{ userName }}</p>
   </div>
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
      isActive() {
         return this.$store.state.channelId === this.userId;
      },
   },
   methods: {
      changeUser() {
         this.$store.commit('setChannelId', this.userId);
         this.$store.commit('setIsPrivate', true);
      },
   }
};
</script>

<style lang="scss" scoped>
   .user-item {
      position: relative;
      display: flex;
      align-items: center;
      @extend %channelItemStyle;
      &:hover {
         background-color: darken(map-get($elBgColor, primary), 0.8);
      }
      &.active {
         background-color: map-get($elBgColor, selected);
         color: #fff;
      }
      >* {
         @include elGutter(margin-right, 8px);
      }
      >img {
         @include size(30px);
         border-radius: 50%;
      }
      >.light {
         position: absolute;
         left: 30px;
         top: 30px;
         @include size(8px);
         border-radius: 50%;
         background-color: red;
         &.isOnline {
            background-color: green;
         }
      }
   }
</style>