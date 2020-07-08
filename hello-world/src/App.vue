<template>
  <div>
    <input v-model="formData.name" type="text" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      formData: {
        name: '',
        sex: '',
        age: 0,
        deptId: ''
      }
    }
  },
  watch: {
    formData: {
      handler (val, oldVal) {
        console.log(val.name, oldVal.name);
      },
      // immediate: true,
      deep: true
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      setTimeout(() => {
        this.formData.name = 'hello';

        // const unwatchFn = this.$watch('formData', function (val, oldVal) {
        //   console.log(val.name, oldVal.name);
        // }, {
        //   deep: true
        // });

        // setTimeout(() => {
        //   unwatchFn();
        // }, 3000);
      }, 3000);
    }
  },
}
</script>