<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json"
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 1, 1000
);
camera.position.set(0, 0, 10);
const renderer = new THREE.WebGLRenderer();
const viewRef = ref<HTMLCanvasElement>()
const matcapTexture = new THREE.TextureLoader().load("https://makio135.com/matcaps/64/430404_BD9295_7E1E21_94544C-64px.png")
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture
});



onMounted(() => {
  loadFont()
  createDonuts()
  //创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;

  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  viewRef?.value?.appendChild(renderer.domElement)

  const render = () => {
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


const loadFont = () => {
  const loader = new FontLoader();
  const fontPath = new URL("three/examples/fonts/helvetiker_regular.typeface.json", import.meta.url).href
  loader.load(fontPath, function (font) {
    console.log(font);
    createText(font)
  });
}
const createText = (font: any) => {
  const textGeometry = new TextGeometry('Hello three.js!', {
    font: font,
    size: 0.5,
    height: 0.2,// 深度
    curveSegments: 12,
    bevelEnabled: true,// 是否开启斜角
    bevelThickness: 0.03,// 文本上斜角的深度
    bevelSize: 0.02,// 斜角与原始文本轮廓之间的延伸距离
    bevelOffset: 0,// 斜角从形状轮廓开始的距离
    bevelSegments: 0.5// 斜角的分段数
  });

  // 文本几何位置设置为中心位置
  // 计算当前几何体的的边界矩形
  textGeometry.computeBoundingBox();
  // 获取计算出的边界矩形  {max,min}  查看数值通过位移 translate 设置几何体位置
  let bounding = textGeometry.boundingBox;
  //  也可直接设置 center 方法，使位置位于中心
  textGeometry.center()
  console.log(textGeometry.boundingBox);
  const mesh = new THREE.Mesh(textGeometry, material);

  scene.add(mesh)
}


const createDonuts = () => {
  console.time("donuts")
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  for (let i = 0; i < 1000; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)
    donut.position.x = (Math.random() - 0.5) * 20
    donut.position.y = (Math.random() - 0.5) * 20
    donut.position.z = (Math.random() - 0.5) * 20
    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI
    const scale = Math.random();
    donut.scale.set(scale, scale, scale)
    scene.add(donut)
  }
  console.timeEnd("donuts")
}



</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
