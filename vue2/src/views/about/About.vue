<template>
  <div>
    <h2>about</h2>
  </div>
</template>

<script>
export default {
  name: 'KeepAliveAbout',
  created() {
    console.log('about created');
  },
  mounted() {
    console.log('about mounted');
  },
  activated() {
    console.log('about activated');
  },
  deactivated() {
    console.log('about deactivated');
  },
  destroyed() {
    console.log('about destroyed');
  },
}
</script>