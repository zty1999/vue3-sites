<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Material, Vector3 } from "three";
import Three from "./Three.vue";

// 目标：使用cannon引擎
console.log(CANNON);

// const gui = new dat.GUI();
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);


// 设置相机位置
camera.position.set(0, 0, 18);
scene.add(camera);

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true });

const viewRef = ref<HTMLCanvasElement>()



// 创建球和平面 // 0.15, 32, 16
const sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  // color: new THREE.Color("#a7a59d"),
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.castShadow = true;
scene.add(sphere);


const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cb0303'),
    metalness: 0.3,// 材质与金属的相似度
    roughness: 0.4,// 材质的粗糙程度
  })
);

floor.position.set(0, -4, 0);
floor.receiveShadow = true;// 接收阴影
floor.rotation.x = - Math.PI / 2
// floor.rotation.z = -Math.PI / 2 
scene.add(floor)

// 载入音频
const audioUrl = new URL("@/assets/audio/collide1.mp3", import.meta.url).href
let hitSound = new Audio(audioUrl)

// 创建物理世界
// const world = new CANNON.World({ gravity: 9.8 });
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);
// 创建物理小球形状
const sphereShape = new CANNON.Sphere(1);

//设置物体材质
const sphereWorldMaterial = new CANNON.Material('sphere');

// 创建物理世界的物体
const sphereBody = new CANNON.Body({
  shape: sphereShape,
  position: new CANNON.Vec3(0, 0, 0),
  //   小球质量
  mass: 1,
  //   物体材质
  material: sphereWorldMaterial,

});
const hit = (event: any) => {
  // 碰撞强度
  let impactStrength = event.contact.getImpactVelocityAlongNormal()
  if (impactStrength > 2) {
    //   重新从零开始播放
    hitSound.currentTime = 0;
    // 音频音量随碰撞强度调节
    hitSound.volume = impactStrength / 12;
    hitSound.play();
  }
}
// 监听小球碰撞
sphereBody.addEventListener("collide", hit)


// 添加到物理世界 add to world
world.addBody(sphereBody);



// 物理世界创建地面
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0;
floorBody.addShape(floorShape);
const floorMaterial = new CANNON.Material("floor");
floorBody.material = floorMaterial
// 地面位置
floorBody.position.set(0, -4, 0);
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody);

//添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.castShadow = true;
scene.add(dirLight);


// 关联两种材质,设置材质间摩擦力及弹性系数
const connectMaterial = new CANNON.ContactMaterial(
  sphereWorldMaterial,
  floorMaterial,
  {
    //   摩擦力
    friction: 0.1,
    // 弹性
    restitution: 0.7,
  })
// 添加关联材质到物理世界
world.addContactMaterial(connectMaterial);


onMounted(() => {

  //创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
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
    //   let time = clock.getElapsedTime();
    let deltaTime = clock.getDelta();
    // 更新物理引擎里世界的物体
    world.step(1 / 120, deltaTime);

    sphere.position.copy(sphereBody.position as any);
    // 设置渲染的物体跟随物理的物体旋转
    sphere.quaternion.copy(sphereBody.quaternion as any);
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
    camera.aspect = viewRef.value!.offsetWidth / viewRef.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
})











</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
