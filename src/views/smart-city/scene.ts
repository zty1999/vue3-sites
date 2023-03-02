import * as THREE from "three";

const scene = new THREE.Scene();
// 场景天空盒
const textureFolder = new URL('@/assets/textures/smart-city/',import.meta.url).href
const textureCubeLoader = new THREE.CubeTextureLoader().setPath(textureFolder + '/');
const textureCube = textureCubeLoader.load([
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
]);
scene.background = textureCube;
scene.environment = textureCube;

export default scene;