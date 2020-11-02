<template>
<div>
  <draggable class="box" element="ul" v-model="list">
    <li class="item" v-for="item in list" :key="item.id">{{ item.name }}</li>
  </draggable>
</div>
</template>

<script>
/* eslint-disable */
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      list: [{
          id: 1,
          name: '客户拜访',
        },
        {
          id: 2,
          name: '营销日志',
        },
        {
          id: 3,
          name: '在售产品',
        },
        {
          id: 4,
          name: '个人中心',
        },
        {
          id: 5,
          name: '产品介绍',
        },
        {
          id: 6,
          name: '财务',
        },
      ],
    };
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.item {
  width: 80px;
  height: 40px;
  border: 1px solid orange;
  margin: 1px;
}
</style>
