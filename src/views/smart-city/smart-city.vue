<template>
  <div class="scene" ref="sceneRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as gui from "dat.gui"
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 顶点着色器
import basicVertexShader from "@/shader/smart-city/vertex.glsl?raw"
// 片元着色器
import basicFragmentShader from "@/shader/smart-city/fragment.glsl?raw"
// 1、导入场景
import scene from "./scene"
// 2、导入相机
import camera from "./camera"
import { createCity } from "./mesh";



scene.add(camera);
console.log(CANNON);

// const gui = new dat.GUI();

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true });

const sceneRef = ref<HTMLCanvasElement>()



createCity()







// 创建物理世界
// const world = new CANNON.World({ gravity: 9.8 });
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);





onMounted(() => {

  //创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)


  renderer.setSize(sceneRef.value!.offsetWidth, sceneRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  sceneRef?.value?.appendChild(renderer.domElement)




  // 设置时钟
  // const clock = new THREE.Clock();
  const render = () => {
    // let time = clock.getElapsedTime();
    // let deltaTime = clock.getDelta();

    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }
  render()



  // 监听画面变化，更新渲染画面
  useEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = sceneRef.value!.offsetWidth / sceneRef.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(sceneRef.value!.offsetWidth, sceneRef.value!.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
})











</script>
<style lang="scss" scoped>
.scene {
  width: 100vw;
  height: 100vh;
  position:fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
