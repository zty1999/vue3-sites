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
import scene from "../three/scene"
// 2、导入相机
import camera from "../three/camera"
import City from "../three/mesh/City";
import {createMesh} from "../three/createMesh";
import eventHub from "@/utils/eventHub";
import AlarmSprite from "../three/alarmSprite";
import controls from "../three/controls";
import LightRadar from "../three/lightRadar";
import FlyLine from "../three/flyLine";
import LightWall from "../three/lightWall";


scene.add(camera);
console.log(CANNON);

// const gui = new dat.GUI();

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true });

const sceneRef = ref<HTMLCanvasElement>()



// 创建物体
let city =  createMesh();


// 事件监听
const eventListMesh:any[] = [];
let mapFn:any = {
  火警: (position:{x:number,z:number}, i:number) => {
    const lightWall = new LightWall(1, 2,2, position);
    (lightWall as any).eventListIndex = i;
    scene.add(lightWall.mesh);
    eventListMesh.push(lightWall);
  },
  治安: (position:{x:number,z:number}, i:number) => {
    //   生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex();
    // // 添加着色器飞线
    // const flyLineShader = new FlyLine(position, color);
    // flyLineShader.eventListIndex = i;
    // scene.add(flyLineShader.mesh);
    // eventListMesh.push(flyLineShader);
  },
  电力: (position:{x:number,z:number}, i:number) => {
    // 添加雷达
    const lightRadar = new LightRadar(2, position);
    (lightRadar as any).eventListIndex = i;
    scene.add(lightRadar.mesh);
    eventListMesh.push(lightRadar);
  },
};
const props  = withDefaults(defineProps<{eventList:any}>(), {
  eventList:[]
})
const { eventList } = props;
console.log(eventList);

// eventList.value = computed(()=>{
//   console.log(props);
//   return props.eventList ;
// })



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
