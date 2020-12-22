<template>
  <div class="home">
    <h2>home</h2>

    <button @click="handleAboutClick">go about</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    console.log('home created');
  },
  mounted() {
    console.log('home mounted');
  },
  activated() {
    console.log('home activated');
  },
  deactivated() {
    console.log('home deactivated');
  },
  destroyed() {
    console.log('home destroyed');
  },
  methods: {
    handleAboutClick() {
      this.$router.push({
        name: 'about',
      });
    },
    handleDblClick() {
      console.log('handleDblClick');
    },
  },
};
</script>

<style scoped>
.home {
  height: 300vh;
}
</style>
