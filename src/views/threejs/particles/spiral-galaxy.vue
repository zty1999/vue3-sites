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

// 目标：运用数学知识设计特定形状的星系
const viewEle = ref<HTMLCanvasElement>();
const controlEle = ref<HTMLCanvasElement>();
let controls:OrbitControls;
let renderer :THREE.WebGLRenderer;
const gui = new dat.GUI({ name: '控制器' });
onMounted(() => {
  console.log(gui.domElement);
  // 初始化渲染器
  renderer = new THREE.WebGLRenderer();

  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;


  // 创建轨道控制器
  controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);



  controlEle.value?.appendChild(gui.domElement)
  viewEle.value?.appendChild(renderer.domElement);
  console.log(viewEle.value?.offsetWidth);
  console.log(viewEle.value?.offsetHeight);
  // 设置渲染的尺寸大小
  renderer.setSize(viewEle.value!.offsetWidth, viewEle.value!.offsetHeight);
  gui.add(controls, 'autoRotateSpeed').min(0).max(10).step(1).name('自动旋转')
  // gui.add(params, 'size').min(0).max(10).step(0.1).name('尺寸').onChange((value: number) => {
  //   console.log("值被修改:", value);
  // }).onFinishChange((value: number) => {
  //   console.log("修改结束:", value);
  //   if (viewEle.value) {
  //     viewEle.value.innerHTML = ''
  //   }
  //   (renderer as any) = null;
  //   generagteGalaxy(params)

  // })
  // gui.add(params, 'branch').min(1).max(20).step(1).name('旋臂数量')

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
// 设置时钟
const clock = new THREE.Clock();
const render = () => {
  // let time = clock.getElapsedTime();
  controls.update();
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

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
camera.position.set(0, 20, 10);
scene.add(camera);


let params = {
  count: 50000,
  size: .5,
  radius: 8,// 圆形扩散半径
  branch: 10,// 分支数量
  rotateScale: 0.8,// 旋转角度
  color: "#fc5430",
  endColor: "#1b3984",
}
let geometry = null;
let material = null;

const generagteGalaxy = (params: any) => {
  // 生成顶点
  geometry = new THREE.BufferGeometry()
  // 随机生成位置和颜色
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const centerColor = new THREE.Color(params.color);
  const endColor = new THREE.Color(params.endColor);

  // 设置粒子顶点相关参数
  for (let i = 0; i < params.count; i++) {
    const current = i * 3;// 当前粒子的position值起始x轴值 、
    //   当前的点应该在哪一条分支的角度上
    const branchAngel = (i % params.branch) * ((2 * Math.PI) / params.branch);
    // 当前点距离圆心的距离
    const distance = Math.random() * params.radius * Math.pow(Math.random(), 3);

    const randomX =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomY =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;
    const randomZ =
      (Math.pow(Math.random() * 2 - 1, 3) * (params.radius - distance)) / 5;


    // x坐标
    positions[current] = Math.cos(branchAngel + distance * params.rotateScale) * distance + randomX;
    // y坐标
    positions[current + 1] = 0 + randomY;
    // z坐标
    positions[current + 2] = Math.sin(branchAngel + distance * params.rotateScale) * distance + randomZ;
    // 混合颜色，形成渐变色
    const mixColor = centerColor.clone();
    mixColor.lerp(endColor, distance / params.radius);
    colors[current] = mixColor.r;
    colors[current + 1] = mixColor.g;
    colors[current + 2] = mixColor.b;
  }

  // 设置粒子顶点相关参数位置
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  // 设置粒子顶点颜色
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));


  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  let particlesUrl = new URL("@/modules/three/textures/particles/1.png", import.meta.url).href
  const texture = textureLoader.load(particlesUrl);

  // 设置点材质纹理
  material = new THREE.PointsMaterial({
    // color: new THREE.Color(params.color),
    size: params.size,
    sizeAttenuation: true,// 相机深度而衰减
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    map: texture,
    alphaMap: texture,
    transparent: true,
    vertexColors: true,// 设置启动顶点颜色
  });


  const points = new THREE.Points(geometry, material);
  scene.add(points);


}
generagteGalaxy(params)






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
