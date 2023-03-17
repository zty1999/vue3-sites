import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const scene = new THREE.Scene();
// // 场景天空盒
// const textureFolder = new URL('../imgs',import.meta.url).href
// const textureCubeLoader = new THREE.CubeTextureLoader().setPath(textureFolder + '/');
// const textureCube = textureCubeLoader.load([
//   "1.jpg",
//   "2.jpg",
//   "3.jpg",
//   "4.jpg",
//   "5.jpg",
//   "6.jpg",
// ]);
// scene.background = textureCube;
// scene.environment = textureCube;




// 添加圆柱形天空
// const rgbeloader = new RGBELoader();
// const textureFolder = new URL('@/assets/textures/smart-park',import.meta.url).href
// rgbeloader.loadAsync(textureFolder + "/2k.hdr").then((texture) => {
//   // 设置纹理为圆柱形纹理
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   // 添加天空环境
//   scene.background = texture;
//   scene.environment = texture;
// });

const hdrLoader = new RGBELoader();
hdrLoader.setPath('/public/textures/smart-park')
hdrLoader.loadAsync( "/023.hdr").then((texture) => {
  scene.background = texture;
  scene.environment = texture;
  scene.environment.mapping = THREE.EquirectangularReflectionMapping;
});




// 场景亮度物理灯光效果
// 1设置色调映射
// 2设置曝光
// 3设置场景灯光

// 给场景添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 100, 10);
scene.add(light);


export default scene;