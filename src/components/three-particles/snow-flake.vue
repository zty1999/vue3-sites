<template>
  <div class="snow-flake">
    <div class="control" ref="controlEle"></div>
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
import { useEventListener } from "@/hooks/useEventListener";

// 目标：设置漫天的雪花

const viewEle = ref<HTMLCanvasElement>();
const controlEle = ref<HTMLCanvasElement>();

const gui = new dat.GUI({ name: '控制器' });



// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  0.1,
  50
);

// 设置相机位置
camera.position.set(0, 0, 80);
scene.add(camera);

/**
 * @params url  图片地址
 * @params size 雪花大小
 * @params count 雪花数量
 */
// interface Snow {
//   size?:number,
//   speed?:number,
//   count?:number 
// }
class Snow {
  size:number = 1;
  speed:number = 0.1;
  count:number = 10000;
  constructor(size:number,speed?:number,count?:number){
    if(size){
      this.size = size
    }
    if(speed){
      this.speed = speed
    }
    if(count){
      this.count = count
    }
  }
}

const creatSnow = (url:string,config:Snow) =>{
  const {size = 1,speed = 0.1,count} = config
  console.log(size,speed,count);
  
  // 几何体
  // 设置缓冲区数组
  // const positions = new Float32Array(count); 返回 长度为 count,值均为0的数组，positons 中的值需要作为几何体的坐标值使用 
  // pointsGeometry.setAttribute( "position",new THREE.BufferAttribute(vertices, 3)); 将从 vertices 取3个数值作为 position 的 值（x y z)
  const itemSize = 3;// 生成一个几何体需要几个值
  const positions = new Float32Array(count * itemSize);
  // 优化for循环 count*itemSize次 优化为循环 count/2 次 问题：如何把 itemSize 作为参数加入循环  如何继续减少循环次数
  for (let i = 0; i < count/2 ; i++) {
    positions[i] = ((Math.random() - 0.5) * 150)
    positions[i+count/2] = ((Math.random() - 0.5) * 100)
    positions[i+count] = ((Math.random() - 0.5) * 100)
    positions[i+count*2] = ((Math.random() - 0.5) * 100)
  }
  console.log(positions.length);

  const pointsGeometry = new THREE.BufferGeometry();
  // positions % 3（itemSize） 为可生成的数量
  pointsGeometry.setAttribute( "position",new THREE.BufferAttribute(positions, 3));
  console.log(new THREE.BufferAttribute(positions, 3));

  // 载入纹理
  const textureLoader = new THREE.TextureLoader();
  let pointsUrl = new URL(`/src/modules/three/textures/particles/${url}.png` , import.meta.url).href
  console.log(url,pointsUrl);
  const texture = textureLoader.load(pointsUrl);

  // 设置点材质
  const pointsMaterial = new THREE.PointsMaterial( {
    color: 0xffffff,
    size,
  });
  pointsMaterial.map = texture;
  pointsMaterial.alphaMap = texture;
  pointsMaterial.transparent = true;


  pointsMaterial.depthWrite = false;
  pointsMaterial.blending = THREE.AdditiveBlending;

  
  // 相机深度而衰减
  pointsMaterial.sizeAttenuation = true;
  // 根据几何体和材质创建物体
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  scene.add(points);
  let folder = gui.addFolder(`雪花 ${url}`)
  folder.add(pointsMaterial, 'size').min(0.1).max(2).step(0.1).name(`尺寸`)
  folder.add(config, 'speed').min(0.1).max(2).step(0.1).name(`速度`)
  folder.add(config, 'count').min(100).max(20000).step(100).name(`数量`)

  return points;
}



let config1 = new Snow(1.5,.1,10000);
let config2 = new Snow(1.5,.3,10000);
let config3 = new Snow(1.5,.3);
let points:THREE.Points = creatSnow('3',config1)
let points2:THREE.Points = creatSnow('14',config2)
let points3:THREE.Points = creatSnow('xh',config3)




// 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
//   // 创建轨道控制器
//   const controls = new OrbitControls(camera, renderer.domElement);
// // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
// controls.enableDamping = true;
onMounted(() => {
  console.log(gui.domElement);

  controlEle.value?.appendChild(gui.domElement)
  viewEle.value?.appendChild(renderer.domElement);
  console.log(viewEle.value?.offsetWidth);
  console.log(viewEle.value?.offsetHeight);
      // 更新摄像头
      camera.aspect = viewEle.value!.offsetWidth / viewEle.value!.offsetHeight;
  // 设置渲染的尺寸大小
  renderer.setSize(viewEle.value!.offsetWidth, viewEle.value!.offsetHeight);


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
})
// 设置时钟
const clock = new THREE.Clock();

// 动画函数
const animate = () =>{
  let time = clock.getElapsedTime();
  points.rotation.x = time * config1.speed; 
  // points.rotation.y = time * 0.3;
  points2.rotation.x = time * config2.speed;
  // points2.rotation.y = time * 0.3;
  points3.rotation.x = time * config3.speed;
  // points3.rotation.y = time * 0.2;
  // controls.update();
  renderer.render(scene, camera);
    // 渲染下一帧的时候就会调用render函数
  requestAnimationFrame(animate);
}
animate();

onUnmounted(() => {
  console.log(viewEle);
  // if (viewEle.value) {
  //   viewEle.value.innerHTML = ''
  // }
})
</script>
<style lang="scss" scoped>
.snow-flake {
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
