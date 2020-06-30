<template>
  <div class="hello">
    <h1>helloworld</h1>
    <!-- <About /> -->
  </div>
</template>

<script>
// import About from './About.vue';

export default {
  name: 'HelloWorld',
  components: {
    // About
  },
  // data() {
  //   return {
  //     count: 1
  //   }
  // },
  methods: {
    resize() {
      console.log('helloworld resize');
    }
  },
  // beforeCreate() {
  //   console.log('helloworld beforeCreate')
  // },
  created() {
    console.log('helloworld created');
  },
  // beforeMount() {
  //   console.log('helloworld beforeMount')
  // },
  mounted() {
    console.log('helloworld mounted');
  },
  // beforeUpdate() {
  //   console.log('helloworld beforeUpdate')
  // },
  // updated() {
  //   console.log('helloworld updated')
  // },
  // beforeDestroy() {
  //   console.log('helloworld beforeDestroy');
  // },
  // destroyed() {
  //   console.log('helloworld destroyed')
  // },
  // activated() {
  //   console.log('helloworld activated')
  // },
  // deactivated() {
  //   console.log('helloworld deactivated')
  // },
  // errorCaptured: (err, vm, info) => {
  //   console.error('helloworld errorCaptured', err, vm, info)
  // },
  // serverPrefetch() {
  //   console.log('helloworld serverPrefetch')
  // }
}
</script>
