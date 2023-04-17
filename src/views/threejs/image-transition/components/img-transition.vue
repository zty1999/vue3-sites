<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as dat from "dat.gui";
import * as THREE from "three";
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { THREERoot } from "./three";
import { BufferGeometry, Material } from "three";
import Three from "../../Three.vue";






/**
 * Scene
 */
 const scene = new THREE.Scene();

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);
// 设置相机位置
camera.position.set(0, 0, 18);
scene.add(camera);

/**
 * Renderer
 */
// alpha 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

/**
 * Controls
 */
const controls = new OrbitControls(camera,renderer.domElement)


// 画布容器
const viewRef = ref<HTMLCanvasElement>()

/**
 * Clock
 */
const clock = new THREE.Clock();

/**
 * GUI
 */
const gui = new dat.GUI({ name: '控制器' });



// function init() {
//   var root = new THREERoot({
//     createCameraControls: !true,
//     antialias: (window.devicePixelRatio === 1),
//     fov: 80
//   });

//   root.renderer.setClearColor(0x000000, 0);
//   root.renderer.setPixelRatio(window.devicePixelRatio || 1);
//   root.camera.position.set(0, 0, 60);

//   var width = 100;
//   var height = 60;

//   var slide = new Slide(width, height, 'out');
// 	var l1 = new THREE.ImageLoader();
// 	l1.setCrossOrigin('Anonymous');
// 	l1.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/winter.jpg', function(img) {
// 	  slide.setImage(img);
// 	})
//   root.scene.add(slide);

//   var slide2 = new Slide(width, height, 'in');
//   var l2 = new THREE.ImageLoader();
// 	l2.setCrossOrigin('Anonymous');
// 	l2.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/spring.jpg', function(img) {
// 		slide2.setImage(img);
// 	})
	
//   root.scene.add(slide2);

//   var tl = new TimelineMax({repeat:-1, repeatDelay:1.0, yoyo: true});

//   tl.add(slide.transition(), 0);
//   tl.add(slide2.transition(), 0);

//   createTweenScrubber(tl);

//   window.addEventListener('keyup', function(e) {
//     if (e.keyCode === 80) {
//       tl.paused(!tl.paused());
//     }
//   });
// }


const setupRenderer = () => {
  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0x000000, 1);
  viewRef?.value?.appendChild(renderer.domElement)
}
const resize = () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = viewRef.value!.offsetWidth / viewRef.value!.offsetHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //   更新渲染器
  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
}
const tick = () => {
  let time = clock.getElapsedTime();
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(tick);
  controls.update()

  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
}
var width = 100;
  var height = 60;
const init = () =>{

  let texture;
  // 初始化一个加载器
  const loader = new THREE.ImageLoader();

  // 加载一个图片资源
  loader.load(
    // 资源URL
    'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/winter.jpg',

    // onLoad回调
    function ( image ) {
      // use the image, e.g. draw part of it on a canvas
      const canvas = document.createElement( 'canvas' );
      const context = canvas.getContext( '2d' );
      context!.drawImage( image, 100, 100 );
      texture = image
    },

    // 目前暂不支持onProgress的回调
    undefined,

    // onError回调
    function () {
      console.error( 'An error happened.' );
    }
  );
  // var geometry = new THREE.PlaneGeometry(width, height, width * 2, height * 2);
  // const material = new THREE.MeshBasicMaterial({map: texture,color:0x00ff00})
  // const plane = new THREE.Points(geometry, material);
  const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00, map: texture,side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
  scene.add(plane)
}

onMounted(() => {
  setupRenderer()
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)
  init()
  tick()
  useEventListener("resize",() =>{
    resize()
  })
  // let root = new THREERoot({
  //   canvasEle:viewRef,
  //   createCameraControls:true
  // })
  // console.log(root);
  // const geometry = new BufferGeometry()
  // const positions = new Float32Array([
  //   0,0,0,
  //   0,1,0,
  //   0,0,1
  // ])
  // geometry.setAttribute('position', new THREE.BufferAttribute(positions,3))
  // const material = new THREE.MeshBasicMaterial({color: 0x001100})
  // const points = new THREE.Mesh(geometry, material);
  // root.scene.add(points)


})











</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
