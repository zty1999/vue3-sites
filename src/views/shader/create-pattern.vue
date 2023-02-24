<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 顶点着色器
import basicVertexShader from "@/shader/pattern/vertex.glsl?raw"
// 片元着色器
import basicFragmentShader from "@/shader/pattern/fragment.glsl?raw"
// console.log(CANNON);

// const gui = new dat.GUI();
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);


// 设置相机位置
camera.position.set(0, 0, 2);
scene.add(camera);

// 初始化渲染器
// 渲染器透明 { alpha: true }
const renderer = new THREE.WebGLRenderer();

const viewRef = ref<HTMLCanvasElement>()




// 加载纹理
const img = new URL("@/assets/textures/ca.jpeg",import.meta.url).href;
let textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(img)


// 创建原始着色器材质
const rawShaderaterial = new THREE.RawShaderMaterial({
  // 传递给着色器的数据
  uniforms: {
    texture: {value:texture},// 贴图纹理
    time: { value: 0 },// 动画时间 控制抖动频率
    // 波浪的幅度
    scale: {
      value: 0.1,
    },
    resolution: { value: new THREE.Vector2() }

  },
  vertexShader: basicVertexShader,
  fragmentShader: basicFragmentShader,
  // wireframe:true,
  side:THREE.DoubleSide
});


// 创建平面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1,64,64),
  rawShaderaterial
  // new THREE.MeshStandardMaterial({ color: new THREE.Color("#a7a59d") })
)
scene.add(floor)










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
    let elapsedTime = clock.getElapsedTime();
    // let deltaTime = clock.getDelta();

    rawShaderaterial.uniforms.time.value  = elapsedTime as any;


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
