<template>
  <div class="container">
    <header>
      <slot name="header">default header</slot>
    </header>
    <main>
      <slot :demo="user">{{ user.lastName }}</slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      user: {
        firstName: 'bai',
        lastName: 'tanfeng'
      }
    }
  }
};
</script>
