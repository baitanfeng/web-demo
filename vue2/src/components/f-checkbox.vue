<template>
  <label class="f_checkbox">
    <input type="checkbox"
      :disabled="isDisabled"
      :value="value"
      v-model="model"
      @change="handleChange"
    >
    <span>ssfdfsdf</span>
    <slot></slot>
  </label>
</template>

<script>
/* eslint-disable */
export default {
  name: 'f-checkbox',
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selfModel: false
    }
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      
      while(parent) {
        if (parent.$options.name !== 'f-checkbox-group') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }

      return false;
    },
    model: {
      get() {
        return this.isGroup
          ? this._checkboxGroup.value
          : typeof this.value === 'boolean'
            ? this.value
            : this.selfModel;
      },
      set(val) {
        if (this.isGroup) {
          this._checkboxGroup.$emit('input', val);
        } else {
          this.$emit('input', val);
        }
      }
    },
    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled
        : this.disabled;
    },
    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.includes(this.value);
      }
      return false;
    }
  },
  methods: {
    handleChange(event) {
      this.$emit('change', event.target.checked);
      this.$nextTick(() => {
        if (this.isGroup) {
          this._checkboxGroup.$emit('change', this._checkboxGroup.value);
        }
      });
    }
  },
}
</script>

