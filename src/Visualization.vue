<template>
<div id="app">
    <my-worldmap></my-worldmap>
</div>
</template>

<script>
import svg from "./assets/worldmap.svg";
import worldmap from "./Worldmap";

const fromColor = { r: 0, g: 185, b: 255 };
const toColor = { r: 46, g: 67, b: 105 };

export default {
  name: "visualization",
  components: {
    "my-worldmap": worldmap
    },
  data() {
    return {
      svg,
      msg: "Click to reveal a new world with transaction we create"
    };
  }
};
</script>

<style>
  #app {
    width: 1000px;
    margin: auto
  }
</style>