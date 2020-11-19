<template>
  <div class="f_checkbox_group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'f-checkbox-group',
  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>