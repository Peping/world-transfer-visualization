<template>
<div class="transferpea">
    <my-worldmap></my-worldmap>
    <my-stage></my-stage>
</div>
</template>

<script>
import svg from "./assets/worldmap.svg";
import worldmap from "./Worldmap";
import stage from "./Stage";

const fromColor = { r: 0, g: 185, b: 255 };
const toColor = { r: 46, g: 67, b: 105 };

export default {
  name: "visualization",
  components: {
    "my-worldmap": worldmap,
    "my-stage": stage
  },
  data() {
    return {
      svg,
      msg: "Click to reveal a new world with transaction we create"
    };
  }
};
</script>

<style scoped>
.transferpea {
  max-width: 1300px;
  margin: auto;
  display: grid;
}

.transferpea * {
  grid-column: 1;
  grid-row: 1;
}
</style>