<template>
  <!-- <img src="@/assets/images/1.jpg" alt="" srcset="" ref="imageRef" class="sourceImage" style="display: none;"> -->
  <canvas id="canvas" ref="canvasRef" width="800" height="800"></canvas>
</template>
<script lang="ts" setup>
import { Ref, VueElement } from 'vue';
import * as THREE from "three";
import sourceImg from "@/assets/images/1.jpg"
import ImageToParticles from './ImageToParticles'
import {Scene} from '../Scene';
const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  // particles.load()
  let particles = new ImageToParticles(canvasRef.value!,sourceImg)
  particles.load()
})










</script>
<style lang="scss" scoped>
#canvas {
  width: 800px;
  height: 800px;
  background-color: #000;
}

.sourceImage {
  width: 800px;
  height: 800px;
}
</style>
