<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { useEventListener } from "@/hooks/useEventListener";
// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json"
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 1, 1000
);
camera.position.set(0, 0, 700);
const renderer = new THREE.WebGLRenderer();
const viewRef = ref<HTMLCanvasElement>()



onMounted(() => {
  loadFont()


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
    size: 88,
    height: 10,// 深度
    curveSegments: 12,
    bevelEnabled: true,// 是否开启斜角
    bevelThickness: 0.3,// 文本上斜角的深度
    bevelSize: 0.2,// 斜角与原始文本轮廓之间的延伸距离
    bevelSegments: 5// 斜角的分段数
  });
  const textMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ef8e79"),
    wireframe: true
    // specular: new THREE.Color("#ffffff")
  });
  // textGeometry.computeBoundingBox();
  // const centerOffset = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

  const mesh = new THREE.Mesh(textGeometry, textMaterial);
  // mesh.position.x = centerOffset;
  // mesh.position.y = FLOOR + 67;
  // mesh.position.set(0, 0, 30)
  // mesh.castShadow = true;
  // mesh.receiveShadow = true;
  scene.add(mesh)
}



</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
