<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as dat from "dat.gui";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(CANNON);


/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
// 设置相机位置
camera.position.set(0, 0, 18);
camera.lookAt(scene.position)
scene.add(camera);

/**
 * Renderer
 */
// alpha 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

/**
 * Controls
 */
//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)
  

// 画布容器
const viewRef = ref<HTMLCanvasElement>()

/**
 * Clock
 */
const clock = new THREE.Clock();


/**
 * GUI
 */
 const gui = new dat.GUI({ name: '控制器' });


/**
 * Physic 
 */
// 创建物理世界
// const world = new CANNON.World({ gravity: 9.8 });
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);





onMounted(() => {

  setupRenderer()
  setupControls()
  createAxesHelper()
  setUpGui()
  tick()



  // 监听画面变化，更新渲染画面
  useEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = viewRef.value!.offsetWidth / viewRef.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
})




const tick = () => {
  let time = clock.getElapsedTime();
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(tick);
  controls.update()

  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
}


const setupControls = () => {

  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
}
const createAxesHelper = () => {
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)
}
const setupRenderer = () => {
  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0x000000, 1);
  viewRef?.value?.appendChild(renderer.domElement)
}
const setUpGui = () => {
  // gui.add(zRange,'value').min(0).max(500).step(10).name('粒子扩散范围')
}




</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
