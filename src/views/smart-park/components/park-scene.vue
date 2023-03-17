<template>
  <!-- <div class="scene" ref="sceneRef"></div> -->
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>


import gsap from "gsap";
import * as THREE from "three";
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


// const gui = new dat.GUI();
// 1、场景
import scene from "../three/scene";
// 2、相机
import cameraModule from "../three/camera";

// 3、渲染器
import renderer from "../three/renderer";
import { createMesh } from "../three/createMesh";

const viewRef = ref<HTMLCanvasElement>()


let city = createMesh()

onMounted(() => {

  //创建轨道控制器
  const controls = new OrbitControls(cameraModule.activeCamera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)


  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  viewRef?.value?.appendChild(renderer.domElement)




  // 设置时钟
  const clock = new THREE.Clock();
  const render = () => {
    // let time = clock.getElapsedTime();
    let deltaTime = clock.getDelta();
    city.update(deltaTime)
    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, cameraModule.activeCamera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);

  }
  render()



  // 监听画面变化，更新渲染画面
  useEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    (cameraModule.activeCamera as THREE.PerspectiveCamera).aspect = viewRef.value!.offsetWidth / viewRef.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    (cameraModule.activeCamera as THREE.PerspectiveCamera).updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight);
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


.view {
  width: 100vw;
  height: 100vh;
  position:fixed;
  left: 0;
  top: 0;
  z-index: 99;
}
</style>
