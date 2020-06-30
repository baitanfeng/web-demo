<template>
  <transition name="mf-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="mf-loading-mask"
      :style="{backgroundColor: background || ''}"
    >
      <div class="mf-loading-spinner">
        <svg viewBox="25 25 50 50" class="mf-loading-circular">
          <circle cx="50" cy="50" r="20" fill="none" class="mf-loading-path" />
        </svg>
        <p v-if="text" class="mf-loading-text">{{text}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      background: null,
      text: null,
    }
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    setText(text) {
      this.text = text;
    }
  },
}
</script>