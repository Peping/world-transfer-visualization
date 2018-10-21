<template>
  <g class="beam" v-bind:style="stage >= 3 && 'opacity: 0'">
    <circle v-for="(item, index) in startDots" r=".4" class="place" v-bind:key="'startdot-'+index" v-bind:cx="item.x" v-bind:cy="item.y"/>
    <circle v-for="(item, index) in endDots" r=".4" class="place" v-bind:key="'enddot-'+index" v-bind:cx="item.x" v-bind:cy="item.y"/>
    <circle v-if="stage>=1" class="mergenode" v-bind:r="strokeWidth" v-bind:cx="convergingStartPoint.x" v-bind:cy="convergingStartPoint.y"/>
    <circle v-if="stage>=2" class="mergenode" v-bind:r="strokeWidth" v-bind:cx="convergingEndPoint.x" v-bind:cy="convergingEndPoint.y"/>
    <transfer-line v-if="stage>=1" v-bind:start="convergingStartPoint" v-bind:appearing="stage == 1" v-bind:end="convergingEndPoint" v-bind:strokeWidth="strokeWidth" v-bind:on-animation-end="mainBeamDone" />
    <transfer-line v-for="(point, index) in startDots" v-bind:appearing="stage == 0" v-bind:key="'startline-'+index" v-bind:start="point" v-bind:end="convergingStartPoint" weak="1" v-bind:on-animation-end="startDotProgress"/>
    <transfer-line v-if="stage>=2" v-bind:appearing="stage == 2" v-for="(point, index) in endDots" v-bind:key="'endline-'+index" v-bind:start="convergingEndPoint" v-bind:end="point" weak="1" v-bind:on-animation-end="endDotProgress" />
  </g>
</template>

<script>
import { translateCoords } from "./mapfunctions";
import TransferLineVue from "./TransferLine.vue";
export default {
  name: "transfer-beam",
  props: ["StartLocations", "EndLocations", "BeamWeight"],
  components: {
    "transfer-line": TransferLineVue
  },
  data() {
    return {
      progress: 0,
      stage: 0
    };
  },
  computed: {
    strokeWidth() {
      console.log(this.BeamWeight);
      return Math.log10(this.BeamWeight) / 10 + 0.3;
    },
    startDots() {
      return this.StartLocations.map(gps => translateCoords(gps));
    },
    endDots() {
      return this.EndLocations.map(gps => translateCoords(gps));
    },
    averageStartPoint() {
      const { x: sumx, y: sumy } = this.startDots.reduce(
        ({ x: accx, y: accy }, { x, y }) => ({ x: accx + x, y: accy + y })
      );
      const avgGps = {
        x: sumx / this.startDots.length,
        y: sumy / this.startDots.length
      };

      return avgGps;
    },
    averageEndPoint() {
      const { x: sumx, y: sumy } = this.endDots.reduce(
        ({ x: accx, y: accy }, { x, y }) => ({ x: accx + x, y: accy + y })
      );
      const avgGps = {
        x: sumx / this.endDots.length,
        y: sumy / this.endDots.length
      };

      return avgGps;
    },
    vector() {
      return {
        x: this.averageEndPoint.x - this.averageStartPoint.x,
        y: this.averageEndPoint.y - this.averageStartPoint.y
      };
    },
    convergingStartPoint() {
      return {
        x: this.averageStartPoint.x + this.vector.x / 10,
        y: this.averageStartPoint.y + this.vector.y / 10
      };
    },
    convergingEndPoint() {
      return {
        x: this.averageEndPoint.x - this.vector.x / 10,
        y: this.averageEndPoint.y - this.vector.y / 10
      };
    }
  },
  methods: {
    startDotProgress() {
      if (this.stage === 0) {
        this.progress++;
      }
      if (this.progress === this.startDots.length) {
        this.stage = 1;
        this.progress = 0
      }
    },
    mainBeamDone() {
      this.stage = 2;
    },
    endDotProgress() {
      if (this.stage === 2) {
        this.progress++;
      }
      if (this.progress === this.endDots.length) {
        this.stage = 3;
        this.progress = 0;
      }
    }
  }
};
</script>

<style scoped>
.beam {
  transition: opacity 5s linear;
}

.beam.disappear {
  opacity: 0;
}

.place {
  stroke: gold;
  stroke-width: 0.15px;
  fill: none;
}

.mergenode {
  fill: gold;
  stroke: gold;
  stroke-width: .1px;
  animation: .3s ease-in mergenode;
}

@keyframes mergenode {
  from {
    stroke-width: 0;
  }
  50% {
    stroke-width: .4px;
  }
  to {
    stroke-width: .1px;
  }

}
</style>
