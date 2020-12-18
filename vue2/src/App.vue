<template>
  <div class="App">
    <keep-alive :include="$store.state.cachedComponents">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
