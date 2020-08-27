<template>
  <div class="f-toast">
    <p class="f-toast-content" v-html="mes"></p>
  </div>
</template>

<script>
export default {
  props: {
    mes: String
  }
}
</script>