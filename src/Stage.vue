<template>
    <svg v-bind:viewBox="viewbox">
        <transfer-line v-bind:start="{ Latitude: -40.65, Longitude: -73.97 }" v-bind:end="{ Latitude: 41.28, Longitude: 174.784 }"/>
        <circle v-for="(item, index) in dots" r=".5" v-bind:key="index" v-bind:cx="item.x" v-bind:cy="item.y"/>
    </svg>
</template>

<script>
import { getViewBoxAttr, translateCoords } from "./mapfunctions";
import TransferLine from "./TransferLine";

export default {
  name: "stage",
  components: {
    "transfer-line": TransferLine
  },
  data() {
    return {
      viewbox: getViewBoxAttr(),
      dots: [
        translateCoords({ Latitude: -59.3251172, Longitude: 18.0710936 }),
        translateCoords({ Latitude: -40.65, Longitude: -73.97 }),
        translateCoords({ Latitude: -47.593, Longitude: 18.954 }),
        translateCoords({ Latitude: 52.211, Longitude: -69.463 }),
        translateCoords({ Latitude: 41.28, Longitude: 174.784 })
      ]
    };
  },
  methods: {}
};
</script>

<style scoped>
circle {
  stroke: gold;
  stroke-width: 0.2px;
  fill: none;
}
</style>