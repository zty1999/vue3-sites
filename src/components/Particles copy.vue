<template>
<!-- 运用数学知识设计特定形状的星系 -->
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref, watch } from "vue";

import * as THREE from "three";
// 导入 动画库
import gsap from "gsap";
// 导入图像界面库
import * as dat from "dat.gui"
// console.log(THREE);
// 导入场景
import scene from "@/modules/three/scene";

// 导入相机
import cameraModule from "@/modules/three/camera";

// 导入轨道控制器
import controls from "@/modules/three/controls";

// 导入辅助坐标轴
import axesHelper from "@/modules/three/axesHelper";

// 导入渲染器
import { renderer } from "@/modules/three/renderer";

// 初始化调整屏幕
import "@/modules/three/init";


// 导入每一帧的执行函数
import animate from "@/modules/three/animate";

// 全屏控制
import { useScreenFull } from "@/hooks/useScreenFull"
import { useEventListener } from "@/hooks/useEventListener";

let particles1 = new URL("@/modules/three/textures/particles/1.png" , import.meta.url).href



const gui = new dat.GUI();

const camera = cameraModule.addCamera('particles',[75,window.innerWidth / window.innerHeight, 0.1,30])

const textureLoader = new THREE.TextureLoader();

const particlesTexture = textureLoader.load(particles1);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);


const params = {
  count: 10,// 生成粒子数量
  size: 0.1,// 生成粒子大小
  radius: 5,
  branch: 3,
  color: "#ff6030",// 粒子颜色
  rotateScale: 0.3,// 粒子旋转角度
  endColor: "#1b3984",
};

let geometry!:THREE.BufferGeometry;
let material!:THREE.PointsMaterial;
let points!:THREE.Points;
// const centerColor = new THREE.Color(params.color);
// const endColor = new THREE.Color(params.endColor);
// const generateGalaxy = () => {
//   // 生成顶点
  geometry = new THREE.BufferGeometry();
  //   随机生成位置
  const positions = new Float32Array(params.count * 3);
  // 设置顶点颜色
  const colors = new Float32Array(params.count * 3);

//   //   循环生成点
  for (let i = 0; i < params.count; i++) {
//     //   当前的点应该在哪一条分支的角度上
//     const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch);

//     // 当前点距离圆心的距离
//     const distance = Math.random() * params.radius * Math.pow(Math.random(), 3);
//     const current = i * 3;

//     const randomX =
//       (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
//     const randomY =
//       (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
//     const randomZ =
//       (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;

//     // const randomX = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
//     // const randomY = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;
//     // const randomZ = (Math.pow(Math.random() * 2 - 1, 3) * distance) / 5;

//     positions[current] =
//       Math.cos(branchAngel + distance * params.rotateScale) * distance +
//       randomX;
//     positions[current + 1] = 0 + randomY;
//     positions[current + 2] =
//       Math.sin(branchAngel + distance * params.rotateScale) * distance +
//       randomZ;

//     // 混合颜色，形成渐变色
//     const mixColor = centerColor.clone();
//     mixColor.lerp(endColor, distance / params.radius);

//     colors[current] = mixColor.r;
//     colors[current + 1] = mixColor.g;
//     colors[current + 2] = mixColor.b;
//   }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  //   设置点材质
  material = new THREE.PointsMaterial({
    // color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: particlesTexture,
    alphaMap: particlesTexture,
    transparent: true,
    vertexColors: true,
  });

  points = new THREE.Points(geometry, material);

  
  console.log(points);
  
  scene.add(points);
};
// generateGalaxy();

// // 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera);




// 设置时钟
const clock = new THREE.Clock();

function render() {
  let time = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
useEventListener("resize", () => {
  //   console.log("画面变化了");

  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});




</script>
<style lang="scss" scoped>

</style>
