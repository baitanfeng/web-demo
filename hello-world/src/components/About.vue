<template>
<div class="about">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<style scoped>
.about {}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
