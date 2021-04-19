<template>
  <div class="home">
    <h2>home</h2>
    <div @click.self="doSomething">
      doSomething
      <div @click="doTheSameThing">doTheSameThing</div>
      <div @click="doAnotherThing">doAnotherThing</div>
    </div>
    <div>{{ content }}</div>
    <input type="text" v-model.lazy="content" />
  </div>
</template>

<script>
function doSomething() {
  console.log("doSomething");
}
function doTheSameThing() {
  console.log("doTheSameThing");
}
function doAnotherThing() {
  console.log("doAnotherThing");
}

export default {
  name: "Home",
  data() {
    return {
      content: "天地玄黄",
    };
  },
  created() {
    console.log("home created");
  },
  mounted() {
    console.log("home mounted");
  },
  activated() {
    console.log("home activated");
  },
  deactivated() {
    console.log("home deactivated");
  },
  destroyed() {
    console.log("home destroyed");
  },
  methods: {
    doSomething,
    doTheSameThing,
    doAnotherThing,
    onInputContent(event) {
      console.log(event);
    },
  },
};
</script>

<style scoped>
.home {
  height: 300vh;
}

div {
  margin: 10px;
  border: 1px solid black;
}
</style>
