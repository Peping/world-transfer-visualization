<template>
  <g>
    <path v-bind:d="pathData" class="lead" v-bind:style="inlineStyle" v-bind:class="{ weak, appearing }" v-on:animationend="onAnimationEnd"/>
  </g>
</template>

<script>
import { svgViewBox, translateCoords } from "./mapfunctions";

const normalVectorBowFactor = 5; // The higher, the less pronounced the bow

export default {
  name: "transfer-line",
  props: ['start', 'end', 'onAnimationEnd', 'weak', 'strokeWidth', 'appearing'],
  computed: {
    animationDuration() {
      const start = this.start;
      const end = this.end;
      const directionVector = { x: start.x - end.x, y: start.y - end.y };
      const directionScale = Math.sqrt(
        directionVector.x ** 2 + directionVector.y ** 2
      );
      const relativeScale = directionScale / Math.sqrt(
        (svgViewBox.right - svgViewBox.left)**2 + (svgViewBox.bottom - svgViewBox.top)**2
        )
      return this.weak ? '1s': (relativeScale*10).toFixed('3')+'s';
    },
    inlineStyle() {
      return `animation-duration: ${this.animationDuration}`;
    },
    pathData() {
      const start = this.start;
      const end = this.end;
      
      const directionVector = { x: start.x - end.x, y: start.y - end.y };
      const directionScale = Math.sqrt(
        directionVector.x ** 2 + directionVector.y ** 2
      );
      const middlePoint = {
        x: (start.x + end.x) / 2,
        y: (start.y + end.y) / 2
      };
      const normalizedDirectionVector = {
        x: directionVector.x / directionScale,
        y: directionVector.y / directionScale
      };

      const normalVector = {
        x:
          (-normalizedDirectionVector.y * directionScale) /
          normalVectorBowFactor,
        y:
          (normalizedDirectionVector.x * directionScale) / normalVectorBowFactor
      };

      const control = {
        x: middlePoint.x + normalVector.x,
        y: middlePoint.y + normalVector.y
      };

      return `M${end.x},${end.y} Q${control.x},${control.y} ${start.x},${start.y}`;
    }
  },
  methods: {}
};
</script>

<style scoped>
.lead {
  stroke: gold;
  stroke-width: 0.3px;
  fill: none;
  stroke-dasharray: 100% 100%;
}

.appearing {
  animation: ease-in-out lead;
}

.weak {
  stroke-width: .15px;
  stroke: gold;
}

@keyframes lead {
  from {stroke-dashoffset: 172%}
  to {stroke-dashoffset: 200%}
}

</style>