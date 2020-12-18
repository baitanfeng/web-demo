<template>
  <div>
    <h2>about</h2>
    <button @click="handleDetailClick">go detail</button>
    <button @click="$router.back()">go back</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'About',
  beforeRouteLeave (to, from, next) {
    // eslint-disable-next-line
    console.log('about beforeRouteLeave');
    if (to.path === '/') {
      this.removeCachedComponent('About');
    } else {
      this.addCachedComponent('About');
    }
    next();
  },
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
  methods: {
    ...mapMutations([
      'addCachedComponent',
      'removeCachedComponent'
    ]),
    handleDetailClick() {
      this.$router.push({
        name: 'detail',
      });
    }
  },
}
</script>