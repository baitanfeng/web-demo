<template>
<el-tabs v-model="active" @tab-click="handleClick">
  <el-tab-pane label="label 1" name="a">content 1</el-tab-pane>
  <el-tab-pane label="label 2" name="b">content 2</el-tab-pane>
  <el-tab-pane label="label 3" name="c">content 3</el-tab-pane>
  <el-tab-pane label="label 4" name="d">content 4</el-tab-pane>
  <el-tab-pane label="label 5" name="e">content 5</el-tab-pane>
  <el-tab-pane label="label 6" name="f">content 6</el-tab-pane>
  <el-tab-pane label="label 7" name="g">content 7</el-tab-pane>
  <el-tab-pane label="label 8" name="h">content 8</el-tab-pane>
</el-tabs>
</template>

<script>
export default {
  data() {
    return {
      active: 'b'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
