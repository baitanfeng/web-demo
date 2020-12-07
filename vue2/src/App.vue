<template>
  <div class="App">
    <keep-alive :include="/^KeepAlive/">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
