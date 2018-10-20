<template>
    <div>
        <head v-html="style()"></head>
        <div class="worldmap" v-html="svg"></div>
    </div>
</template>

<script>
import svg from "./assets/worldmap.svg";
import Color from "color";

const fromColor = { h: 196, s: 100, l: 50 };
const toColor = { h: 219, s: 39.1, l: 29.6 };

function getColorDistance(col1, col2) {
  const lab1 = Color(col1).lab().color;
  const lab2 = Color(col2).lab().color;
  const a = lab1[0] - lab2[0],
        b = lab1[1] - lab2[1],
        c = lab1[2] - lab2[2];
  return Math.sqrt(a*a + b*b + c*c)/50 || 1;
}

function makeRandomColor(prevColor) {
  const color = {
    h: fromColor.h + Math.floor(Math.random() * (toColor.h - fromColor.h)),
    s: fromColor.s + Math.floor(Math.random() * (toColor.s - fromColor.s)),
    l: fromColor.l + Math.floor(Math.random() * (toColor.l - fromColor.l))
  };
  const delay = getColorDistance(color, prevColor || color) * 4;

  return {
    delay,
    color
  };
}

function getStyleTag(colors) {
  return `    
<style>
.worldmap .a { fill: ${Color(colors.a.color).hex()}; transition-duration: ${
    colors.a.delay
  }s }
.worldmap .b { fill: ${Color(colors.b.color).hex()}; transition-duration: ${
    colors.b.delay
  }s }
.worldmap .c { fill: ${Color(colors.c.color).hex()}; transition-duration: ${
    colors.c.delay
  }s }
.worldmap .d { fill: ${Color(colors.d.color).hex()}; transition-duration: ${
    colors.d.delay
  }s }
.worldmap .e { fill: ${Color(colors.e.color).hex()}; transition-duration:${
    colors.e.delay
  }s }
.worldmap .f { fill: ${Color(colors.f.color).hex()}; transition-duration: ${
    colors.f.delay
  }s }
.worldmap .g { fill: ${Color(colors.g.color).hex()}; transition-duration: ${
    colors.g.delay
  }s }
.worldmap .h { fill: ${Color(colors.h.color).hex()}; transition-duration: ${
    colors.h.delay
  }s }
</style>
`;
}

export default {
  name: "worldmap",
  data() {
    const colors = {
      a: makeRandomColor(),
      b: makeRandomColor(),
      c: makeRandomColor(),
      d: makeRandomColor(),
      e: makeRandomColor(),
      f: makeRandomColor(),
      g: makeRandomColor(),
      h: makeRandomColor()
    };
    return {
      style: () => getStyleTag(this.colors),
      colors,
      oldColors: colors,
      svg
    };
  },
  created() {
    for (let letter of Object.keys(this.colors)) {
      this.updateColor(letter);
    }
  },
  methods: {
    updateColor(letter) {
      const nextColor = makeRandomColor(this.colors[letter].color);
      this.colors = { ...this.colors, [letter]: nextColor };
      setTimeout(this.updateColor.bind(this, letter), nextColor.delay * 1000);
    }
  }
};
</script>

<style>
.worldmap path {
  stroke: white;
  stroke-width: 0.4px;
  stroke-miterlimit: 1;
  transition: fill 1s linear;
}
</style>