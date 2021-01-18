<template>
  <div class="home">
    <h2>home</h2>

    <van-button>button</van-button>
    <van-button block>button</van-button>
    <van-search maxlength="2"></van-search>
    <van-field v-model="value" :formatter="formatter"></van-field></van-field>
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
    formatter(value) {
      return value.replace(/\d/g, '');
    },
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
