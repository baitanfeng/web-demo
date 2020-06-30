<template>
  <div class="about">
    <h1>about</h1>
  </div>
</template>

<script>

export default {
  name: 'About',
  beforeCreate() {
    console.log('about beforeCreate')
  },
  created() {
    console.log('about created')
  },
  beforeMount() {
    console.log('about beforeMount')
  },
  mounted() {
    console.log('about mounted')
  },
  beforeUpdate() {
    console.log('about beforeUpdate')
  },
  updated() {
    console.log('about updated')
  },
  beforeDestroy() {
    console.log('about beforeDestroy')
  },
  destroyed() {
    console.log('about destroyed')
  },
  activated() {
    console.log('about activated')
  },
  deactivated() {
    console.log('about deactivated')
  },
  errorCaptured: (err, vm, info) => {
    console.error('about errorCaptured', err, vm, info)
  },
  serverPrefetch() {
    console.log('about serverPrefetch')
  }
}
</script>