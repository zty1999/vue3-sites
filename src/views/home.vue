<template>
  <div class="home-header">
    <div class=" canvas-wrapper" ref="viewEle"></div>
    <div class="intro-content">
      <h1 class="intro-text">
      Spark Sites
    </h1>
    </div>
  </div>

</template>
<script lang="ts" setup>
// 导入动画库
import { useEventListener } from "@/hooks/useEventListener";
import gsap from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import Stats from 'three/examples/jsm/libs/stats.module.js'
import { generateTriangles } from "./triangles";
let currentPage = 1;

const wrapEle = ref<HTMLCanvasElement>();
const viewEle = ref<HTMLCanvasElement>();
const controlEle = ref<HTMLCanvasElement>();

onMounted(() => {
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 3500
  );
  camera.position.z = 2750;
  // 设置相机位置
  // camera.position.set(0, 0, 10);
  scene.add(camera);

  // 3、添加物体
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  let textureUrl = new URL("@/assets/textures/texture.png", import.meta.url).href
  const texture = textureLoader.load(textureUrl)
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;


  // 监听鼠标移动事件
  useEventListener('mousemove', (e) => {
    let x = (e.clientX / window.innerWidth) * 2 - 1;
    let y = (e.clientY / window.innerHeight) * 2 - 1;
    // console.log(x,y);

    // 场景旋转
    // let timeline = gsap.timeline();
    // timeline.to(mesh.rotation,{
    //   duration: 0.5,
    //   x:y,
    //   y:x,
    //   // duration:1,
    // })

  })


  // 初始化渲染器   alpha 设置渲染器透明
  const renderer = new THREE.WebGLRenderer({ alpha: false });

  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;
  // console.log(renderer);
  // 设置渲染的尺寸大小
  renderer.setSize(viewEle.value!.offsetWidth, viewEle.value!.offsetHeight);
  // 添加到页面
  viewEle.value?.appendChild(renderer.domElement);



  // 创建轨道控制器
  // const controls = new OrbitControls(camera, renderer.domElement);
  // // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  // controls.enableDamping = true;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 1



  let stats: Stats = Stats() // 创建性能监视器 
  stats.setMode(0) // 设置监视器面板，传入面板id(0: fps, 1: ms, 2: mb) 
  // 设置监视器位置 
  // stats.dom.style.position = 'absolute' 
  // stats.dom.style.left = '0px' 
  // stats.dom.style.top = '0px'
  // 将监视器添加到页面中 
  viewEle.value?.appendChild(stats.dom)

  // gsap.to(pivot.rotation, {
  //     x: "+=" + Math.PI * 2,
  //     y: "+=" + Math.PI * 2,
  //     duration: 10,
  //     ease: "power2.inOut",
  //     repeat: -1,
  //   });


  // 设置时钟
  const clock = new THREE.Clock();
  const render = () => {
    stats.update();
    // controls.update();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }
  render()

})






// 监听滚动事件
window.addEventListener("scroll", () => {

});

</script>
<style lang="scss" scoped>
.canvas-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}
.intro-content {
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
  position: relative;
  height: 100vh;
  color: #fff;
  z-index: 10;
}
.intro-text {
  font-size: 60px;
  position:relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}
</style>
