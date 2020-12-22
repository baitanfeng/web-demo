<template>
  <div class="detail">
    <h2>detail</h2>
    <button @click="$router.back()">go back</button>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  created() {
    console.log('detail created');
  },
  mounted() {
    console.log('detail mounted');
  },
  activated() {
    console.log('detail activated');
  },
  deactivated() {
    console.log('detail deactivated');
  },
  destroyed() {
    console.log('detail destroyed');
  },
};
</script>

<style scoped>
.detail {
  height: 500vh;
}
</style>
