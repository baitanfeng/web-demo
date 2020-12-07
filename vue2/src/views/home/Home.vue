<template>
  <div class="home">
    <h2>home</h2>

    <button @click="handleButtonClick">go about</button>
  </div>
</template>

<script>
export default {
  name: 'KeepAliveHome',
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
    handleButtonClick() {
      this.$router.push({
        name: 'about',
      });
    },
  },
};
</script>

<style scoped></style>
