<template>
    <svg v-bind:viewBox="viewbox">
        <transfer-beam v-bind:StartLocations='[{"Latitude":1.7389,"Longitude":33.1594},{"Latitude":2.5004,"Longitude":33.5007},{"Latitude":4.83,"Longitude":31.58},{"Latitude":0.7025,"Longitude":32.8886}]' 
                       v-bind:EndLocations='[{"Latitude":-29.7096,"Longitude":-51.14},{"Latitude":-30.88,"Longitude":-55.53}]' 
                       v-bind:BeamWeight="759.0" />
        <transfer-beam v-bind:StartLocations='[{"Latitude":-17.8,"Longitude":-63.1667},{"Latitude":-13.683,"Longitude":-61.8666}]' 
                       v-bind:EndLocations='[{"Latitude":-50.3333,"Longitude":-72.3}]' 
                       v-bind:BeamWeight="121" />
    </svg>
</template>

<script>
import { getViewBoxAttr, translateCoords } from "./mapfunctions";
import TransferLine from "./TransferLine";
import BeamVue from './Beam.vue';

export default {
  name: "stage",
  components: {
    "transfer-line": TransferLine,
    "transfer-beam": BeamVue
  },
  data() {
    return {
      viewbox: getViewBoxAttr(),
      beams: []
    };
  },
  created() {
    this.eventSource = new EventSource("https://transferpeaapp.azurewebsites.net/sse-notifications")
    this.eventSource.onmessage = this.onmessage
  },
  methods: {
    onmessage({data}) {
      this.beams.push(data.Beam);
      setTimeout(()=> this.beams.shift(), 15000)
    }
  }
};
</script>

<style scoped>
</style>