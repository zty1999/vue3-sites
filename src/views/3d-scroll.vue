<template>
  <div class="pages">
    <div class="page page1">
      <div class="content">
        <h1>炫酷三角形</h1>
      </div>
    </div>
    <div class="page page1">
      <div class="content">
        <h1>星空</h1>
      </div>
    </div>
    <div class="page page2">
      <h1>雪花</h1>
    </div>
    <div class="page page3">
      <h1>臂旋星系</h1>
    </div>
    <div class="page page4">
      <h1>弹跳运动</h1>
    </div>
    <div class="canvas-wrapper" ref="viewEle"></div>
  </div>
  <!-- <starry-sky class="bg starry-sky"></starry-sky> -->
  <!-- <snow-flake class="bg"></snow-flake>
  <spiral-galaxy class="bg"></spiral-galaxy> -->
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
const arrGroup:any[] = []
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

  // // 酷炫三角形
  // let triangles = generateTriangles(5000)
  // scene.add(triangles)
  // arrGroup.push(triangles)



  
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
  // 监听画面变化，更新渲染画面
  useEventListener("resize", () => {
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
    let time = clock.getElapsedTime();
    // pivot.rotation.x = time * 0.15;
    // pivot.rotation.y = time * 0.25;
    // const time = Date.now() * 0.001;

    // triangles.rotation.set(time * 0.15,time * 0.25,time * 0.25)

    //   根据当前滚动的scrolly，去设置相机移动的位置
    // camera.position.y = -(window.scrollY / window.innerHeight) * 30;

    // let deltaTime = clock.getDelta();
    // camera.position.x += (mouse.x * 10 - camera.position.x) * deltaTime * 5;


    // 使用渲染器，通过相机将场景渲染进来
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }
  render()

})






// 监听滚动事件
window.addEventListener("scroll", () => {
  //   console.log(window.scrollY);
  // const newPage = Math.round(window.scrollY / window.innerHeight);
  // if (newPage != currentPage) {
  //   currentPage = newPage;
  //   console.log("改变页面，当前是：" + currentPage);
  //   console.log(arrGroup[currentPage].rotation);
  //   gsap.to(arrGroup[currentPage].rotation, {
  //     z: "+=" + Math.PI * 2,
  //     x: "+=" + Math.PI * 2,
  //     duration: 2,
  //     onComplete: () => {
  //       console.log("旋转完成");
  //     },
  //   });

  //   gsap.to(`.page${currentPage} h1`, {
  //     rotate: "+=360",
  //     duration: 1,
  //   });
    // gsap.fromTo(
    //   `.page${currentPage} h1`,
    //   { x: -300 },
    //   { x: 0, rotate: "+=360", duration: 1 }
    // );
  // }
});


</script>
<style lang="scss" scoped>
.pages {
  user-select: none;
  background-color: rgb(36, 58, 66);
}

/* .page {
  position:relative;
  width: 100%;
  height: 100vh;
  .content {
    position: inherit;
    z-index: 9;
  }
} */
.bg {
  /* position:absolute;
  top: 0;
  left: 0;
  z-index: 1; */
  position: fixed;
  left: 0;
  top: 0;
}

.canvas-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
}

.page {
  height: 100vh;
  display: flex;
  color: #fff;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: relative;
  z-index: 10;
}

.page h1 {
  margin: 60px;
  font-size: 40px;
}

.page h3 {
  font-size: 30px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
