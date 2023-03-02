<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
scene.add(camera);

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true });

const viewRef = ref<HTMLCanvasElement>()







// 要更新旋转角度的对象数组
const objects:THREE.Mesh[] = [];
 
// 一球多用
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);
 
const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
scene.add(sunMesh);
objects.push(sunMesh);



const color = 0xffffff;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);





const earthMaterial = new THREE.MeshPhongMaterial({
  color: 0x2233ff,
  emissive: 0x112244,
});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;
scene.add(earthMesh);
objects.push(earthMesh);



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


  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  viewRef?.value?.appendChild(renderer.domElement)




  // 设置时钟
  const clock = new THREE.Clock();
  const render = () => {
    let time = clock.getElapsedTime();
    // let deltaTime = clock.getDelta();


    objects.forEach((obj) => {
      obj.rotation.y = time;
    });



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
