<template>
  <div>
    App
    <div 
      class="div1" 
      v-loading.fullscreen="isLoading" 
      :mf-loading-text="loadingText"
      :element-loading-text="loadingText"
    >
      div1
    </div>
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      message: 'hello',
      loadingText: '拼命加载中'
    }
  }
}
</script>

<style>
  body {
    height: 1000vh;
  }
  .div1 {
    height: 100px;
    background: lightgray;
  }
</style>