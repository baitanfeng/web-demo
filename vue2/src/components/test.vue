<template>
<div id="list-complete-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list-complete" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-complete-item">
      {{ item }}
    </span>
  </transition-group>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10
    }
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
  },
}
</script>

<style scoped>
.list-complete-item {
  display: inline-block;
  margin-right: 10px;
  transition: all 1s;
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}
</style>
