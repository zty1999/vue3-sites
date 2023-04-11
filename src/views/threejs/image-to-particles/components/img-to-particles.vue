<template>
  <div class="img-to-particles">
    <div class="control" ref="controlEle">
    </div>
    <div class="view" ref="viewRef"></div>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
// 导入dat.gui
import * as dat from "dat.gui";
import * as THREE from "three";
import { useEventListener } from "@/hooks/useEventListener";
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';// 轨迹球控制器
// 顶点着色器
import vertexShader from "../shader/vertex.glsl?raw"
// 片元着色器
import fragmentShader from "../shader/fragment.glsl?raw"
import { rgb255To1 } from "@/utils/colorConvert";

/**
 * props
 * controls 是否显示gui控件
 */
const props = withDefaults(defineProps<{ img: string,zRange:number,showControls:boolean }>(),{
 img:'',
 zRange: 150,
 showControls:false
})
const { showControls } = toRefs(props)
const imgUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/tree_star.jpg'
const zRange = ref(150);
console.log(imgUrl,zRange);

// const gui = new dat.GUI();
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  20, window.innerWidth / window.innerHeight, 1, 10000
);

// 设置相机位置
camera.position.set(0, 0, 3000);
camera.lookAt(scene.position)
scene.add(camera);

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ antialias: true });

let controls:TrackballControls; 

const viewRef = ref<HTMLCanvasElement>()
const controlEle = ref<HTMLCanvasElement>();




let imageWidth = 640;
let imageHeight = 360;
const imageData = ref<any>();


let shaderUniforms: any;

function createPixelData() {
  let img = h('img')
  console.log(img);
  var image = document.createElement("img");
  var canvas = document.createElement("canvas");
  let context: CanvasRenderingContext2D = canvas.getContext("2d")!;

  image.crossOrigin = "Anonymous";
  image.onload = function () {
    image.width = canvas.width = imageWidth;
    image.height = canvas.height = imageHeight;

    context.fillStyle = context.createPattern(image, 'no-repeat')!;
    context.fillRect(0, 0, imageWidth, imageHeight);
    //context.drawImage(image, 0, 0, imageWidth, imageHeight);

    imageData.value = context.getImageData(0, 0, imageWidth, imageHeight).data;
    console.log(imageData.value);

    createPaticles();
    tick();
  };

  image.src = imgUrl;
}
function createPaticles() {
  const geometry = new THREE.BufferGeometry();

  let cIdx = 0;
  let weights = [0.2126, 0.7152, 0.0722];
  let x = imageWidth * -0.5, y = imageHeight * 0.5;
  const positions = []
  // const positions = new Float32Array(imageWidth * imageHeight * 3);// 粒子position集合 count * itemSize

  let { r, g, b } = rgb255To1(129, 193, 73)
  shaderUniforms = {
    vertexColor: {
      type: "c",
      value: [new THREE.Vector3(r, g, b), new THREE.Vector3(r, g, b), new THREE.Vector3(r, g, b)]
    },
    amplitude: {
      type: "f",
      value: 0.5
    }
  };
  let vertexColors = [];// 顶点颜色集合 shader attribute
  console.log(x, y);
  // 已知图片宽高，由点铺满图片宽高大小 需计算点位
  for (var i = 0; i < imageHeight; i++) { // x重置到最左边  y向下铺 
    for (var j = 0; j < imageWidth; j++) {// x变化 y固定   一行点位
      let r = imageData.value[cIdx] / 255;
      let g = imageData.value[cIdx + 1] / 255;
      let b = imageData.value[cIdx + 2] / 255;
      vertexColors.push(imageData.value[cIdx] / 255, imageData.value[cIdx + 1] / 255, imageData.value[cIdx + 2] / 255);

      let weight = r * weights[0] + g * weights[1] + b * weights[2];


      let z = (zRange.value * -0.5) + (zRange.value * weight);
      var vertex = new THREE.Vector3();
      vertex.x = x;
      vertex.y = y;
      vertex.z = z;
      positions.push(x, y, z)
      cIdx += 4;// rgba
      x++;
    }
    x = imageWidth * -0.5;
    y--;
  }
  console.log(positions);
  console.log(vertexColors);

  // new THREE.BufferAttribute( bufferPositions, 3 )
  let shaderMaterial = new THREE.ShaderMaterial({
    // attributes:shaderAttributes,
    uniforms: shaderUniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    vertexColors: true
  })
  console.log(positions.length);

  const bufferPositions = new Float32Array(positions)
  const bufferColors = new Float32Array(vertexColors)
  geometry.setAttribute('position', new THREE.BufferAttribute(bufferPositions, 3));
  geometry.setAttribute('vertexColor', new THREE.BufferAttribute(bufferColors, 3));
  geometry.attributes.vertexColor.needsUpdate = true;
  // geometry 设置attribute  传递属性给顶点着色器
  console.log(new THREE.BufferAttribute(bufferColors, 3));
  const points = new THREE.Points(geometry, shaderMaterial);
  scene.add(points);
  return;

}

function tick() {
  requestAnimationFrame(tick);
  update();
  render();
}

function createControls() {
  
  controls = new TrackballControls(camera, renderer.domElement);
  /* 属性参数 */

  controls.rotateSpeed = 1.0;// 旋转速度
  controls.zoomSpeed = 1.2;// 缩放速度
  controls.panSpeed = 0.8;// 平移速度

  controls.noZoom = false;
  controls.noPan = true;
  console.log(controls);
  
  controls.staticMoving = false;// 是否禁止移动，为 true 没有惯性
  controls.dynamicDampingFactor = 0.3;// 设阻尼系数 越小 则滑动越大。仅在staticMoving设为false时生效
}

const createScene = () => {
  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0x000000, 1);
  viewRef?.value?.appendChild(renderer.domElement)
}
const createGui  = () =>{
  const gui = new dat.GUI({ name: '控制器' });
  gui.add(zRange,'value').min(0).max(500).step(10).name('z轴扩散范围')
  // gui.add(controls,'rotateSpeed').min(1).max(10).step(1).name('controls旋转速度')
  // gui.add(controls,'zoomSpeed').min(1).max(10).step(0.1).name('controls缩放速度')
  // gui.add(controls,'panSpeed').min(0).max(5).step(0.1).name('controls平移速度')
  // gui.add(controls,'noZoom').name('controls禁止缩放')
  // gui.add(controls,'noPan').name('controls禁止平移')
  // gui.add(controls,'staticMoving').name('controls禁止移动')
  controlEle.value?.appendChild(gui.domElement)
}

var animationTime = 0;
var animationDelta = 0.03;
onMounted(() => {
  createScene()
  createControls()
  createPixelData()
  if(showControls.value){
    createGui()

  }

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

const update = () => {
  if (shaderUniforms) {
    shaderUniforms.amplitude.value = Math.sin(animationTime);
  }
  animationTime += animationDelta;
  controls&&controls.update();
}
// 设置时钟
// const clock = new THREE.Clock();
const render = () => {
  // let time = clock.getElapsedTime();
  // let deltaTime = clock.getDelta();
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
}










</script>
<style lang="scss" scoped>
.img-to-particles {
  position: relative;
  width: 100%;
  height: 100%;

}
.control {
  position: absolute;
  right: 20px;
  top: 0;
}
.view {
  width: 100%;
  height: 100%;
}

</style>
