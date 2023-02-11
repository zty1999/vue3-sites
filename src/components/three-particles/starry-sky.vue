<template>
  <div class="starry-sky">
    <div class="control" ref="controlEle">

    </div>
    <div class="partilces " ref="viewEle"></div>

  </div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";

// 目标：使用pointes设置随机顶点打造星河
const viewEle = ref<HTMLCanvasElement>();
const controlEle = ref<HTMLCanvasElement>();

const gui = new dat.GUI({ name: '控制器' });
onMounted(() => {
  console.log(gui.domElement);

  controlEle.value?.appendChild(gui.domElement)
  viewEle.value?.appendChild(renderer.domElement);
  console.log(viewEle.value?.offsetWidth);
  console.log(viewEle.value?.offsetHeight);
  // 设置渲染的尺寸大小
  renderer.setSize(viewEle.value!.offsetWidth, viewEle.value!.offsetHeight);
  gui.add(controls, 'autoRotateSpeed').min(0).max(10).step(1).name('自动旋转')

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = viewEle.value!.offsetWidth / viewEle.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(viewEle.value!.offsetWidth, viewEle.value!.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
  render();
})

// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;

// 设置缓冲区数组
const positions = new Float32Array(count * 3);
// 设置粒子顶点颜色
const colors = new Float32Array(count * 3);
// 设置顶点
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100;
  colors[i] = Math.random();
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
// particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

// 设置点材质
const pointsMaterial = new THREE.PointsMaterial();
pointsMaterial.size = 1;
// pointsMaterial.color.set(0xfff000);
pointsMaterial.color.set('');
// 相机深度而衰减
pointsMaterial.sizeAttenuation = true;

// 载入纹理
const textureLoader = new THREE.TextureLoader();
let particlesUrl = new URL("@/modules/three/textures/particles/8.png", import.meta.url).href
const texture = textureLoader.load(particlesUrl);
// 设置点材质纹理
pointsMaterial.map = texture;
pointsMaterial.alphaMap = texture;
pointsMaterial.transparent = true;
pointsMaterial.depthWrite = false;
pointsMaterial.blending = THREE.AdditiveBlending;
// 设置启动顶点颜色
// pointsMaterial.vertexColors = true;

const points = new THREE.Points(particlesGeometry, pointsMaterial);

scene.add(points);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;

// console.log(renderer);


// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1
// 添加坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);
// 设置时钟
const clock = new THREE.Clock();

const render = () => {
  let time = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}



onUnmounted(() => {
  console.log(viewEle);
  // if (viewEle.value) {
  //   viewEle.value.innerHTML = ''
  // }
})

</script>
<style lang="scss" scoped>
.starry-sky {
  position: relative;
  width: 100%;
  height: 100%;
  .control {
    position: absolute;
    right: 20px;
    top: 0;
  }

  .partilces {
    width: 100%;
    height: 100%;
  }
}
</style>
