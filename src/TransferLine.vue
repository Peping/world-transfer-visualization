<template>
    <path v-bind:d="pathData"/>
</template>

<script>
import { getViewBoxAttr, translateCoords } from "./mapfunctions";

export default {
  name: "transfer-line",
  computed: {
      pathData() {
          const start = translateCoords(this.start);
          const end = translateCoords(this.end);

          return `M${start.x},${start.y} Q${control.x},${control.y} ${end.x},${end.y}`
      }
  },
  methods: {}
};
</script>

<style scoped>
    circle {
        stroke: gold;
        stroke-width: .2px;
        fill: none;
    }
</style>