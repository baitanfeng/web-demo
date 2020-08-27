<template>
  <div class="about">
    <el-checkbox-group v-model="checkedList">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
    </el-checkbox-group>
    <span>{{checkedList}}</span>
    <br><br>
    <f-checkbox-group v-model="fCheckedList" :disabled="false">
      <f-checkbox value="1"></f-checkbox>
      <f-checkbox value="2"></f-checkbox>
      <f-checkbox value="3"></f-checkbox>
    </f-checkbox-group>
    <span>{{fCheckedList}}</span>
    <br><br>
    <f-checkbox v-model="checked">checked</f-checkbox>
    <br>
    <span>{{checked}}</span>
  </div>
</template>

<script>
import FCheckbox from './f-checkbox';
import FCheckboxGroup from './f-checkbox-group';

export default {
  name: 'About',
  components: {
    FCheckbox,
    FCheckboxGroup
  },
  data() {
    return {
      checkedList: ['4'],
      fCheckedList: ['4'],
      checked: false
    }
  },
}
</script>