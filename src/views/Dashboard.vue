<template>
  <!-- <div class="three-render"></div> -->
  <div class="scene three-scene" ref="sceneDiv"></div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, Ref, ref, watch } from "vue";

import * as THREE from "three";
// 导入 动画库
import gsap from "gsap";
// 导入图像界面库
import * as dat from "dat.gui"
// console.log(THREE);
// 导入场景
import scene from "@/modules/three/scene";

// 导入相机
import cameraModule from "@/modules/three/camera";

// 导入辅助坐标轴
import axesHelper from "@/modules/three/axesHelper";

// 导入渲染器
import { renderer } from "@/modules/three/renderer";

// 初始化调整屏幕
import "@/modules/three/init";


// 导入每一帧的执行函数
import animate from "@/modules/three/animate";

// 全屏控制
import { useScreenFull } from "@/hooks/useScreenFull"
import { useResize } from "@/hooks/useResize";

// 场景元素div
let sceneDiv = ref<HTMLDivElement | null>(null);
// 添加相机 
scene.add(cameraModule.activeCamera);
// 添加辅助坐标轴
scene.add(axesHelper);

// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material);
// 修改物体位置
// cube.position.x += 0.01;
// 修改物体旋转角度及各轴旋转顺序
// cube.rotation.set(Math.PI / 4,0,0,"XZY")
// cube.rotation.x += 0.01;
// 修改物体缩放倍数
// cube.scale(1,1,1);   
// 投射阴影
cube.castShadow = true;
// 接收阴影
cube.receiveShadow = true;
// 物体添加到场景
// scene.add(cube);

// 设置动画 5秒向x轴移动10个单位  5秒旋转180度
// gsap.to(cube.position, { x: 10,duration: 5 })
// gsap.to(cube.rotation, { x: 2 / Math.PI,duration: 5 })

onMounted(() => {
  sceneDiv.value?.appendChild(renderer.domElement);
  console.log(sceneDiv);
  animate(cube);

  //   双击 渲染画面进行全屏切换
  useScreenFull(renderer.domElement, "dblclick")



  
  // 灯光 Light( color : Integer, intensity : Float )( 颜色,强度)
  // 环境光 
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  scene.add(light);
  //直线光源(聚光灯)
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  // 聚光灯位置
  spotLight.position.set(5, 5, 5);
  spotLight.castShadow = true;// 投射阴影
  // 用于计算此光照的阴影
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;

  spotLight.intensity = 2;
  scene.add( spotLight );

  // 平行光
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  scene.add( directionalLight );



  // 加载纹理
  // 创建几何体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  // 加载纹理图片
  let img1 = new URL("@/modules/three/textures/MetalDesignerWeaveSteel002_ROUGHNESS_3K_METALNESS.jpg" , import.meta.url).href
  let img2 = new URL("@/modules/three/textures/MetalDesignerWeaveSteel002_Cube.jpg" , import.meta.url).href

  const texture = new THREE.TextureLoader().load( img1);
  console.log(texture);
  
  // 纹理偏移offset（二维 x,y）   
  // texture.offset.x = 0.5;
  // texture.offset.y = 0.5;
  texture.offset.set(0.5,0.5);
  // 纹理旋转rotation（正值为逆时针方向旋转）
  texture.rotation = Math.PI / 4; // 旋转45deg
  // 设置旋转中心点。(0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角
  // texture.center.set(0.5,0.5);
  // 设置纹理重复数量及模式repeat（repeat 设置为大于 1，则相应的 Wrap 参数也应设置为 THREE.RepeatWrapping 或 THREE.MirroredRepeatWrapping 以实现平铺）
  // THREE.RepeatWrapping 纹理贴图的映射模式 纹理将简单地重复到无穷大
  // THREE.MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像
  texture.repeat.set( 4, 4 );
  texture.wrapS = THREE.RepeatWrapping;// 纹理贴图在水平方向上将如何包裹 
  texture.wrapT = THREE.RepeatWrapping;// 纹理贴图在垂直方向上将如何包裹

  // texture纹理显示设置 https://threejs.org/docs/index.html#api/zh/textures/Texture
  // texture.minFilter = THREE.NearestFilter;
  // texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // 透明材质与透明纹理 alphaMap+transparent
  // alphaMap alpha贴图控制材质表面的不透明度,加载透明纹理 仅使用纹理的颜色，忽略alpah通道
  // transparent 属性设置是否透明，为 false 则材质将保持完全不透明
  // opacity 属性设置透明度
  // aoMap 环境遮挡贴图 第二层贴图 aoMap需要第二组UV
  // aoMapIntensity 环境遮挡效果的强度。默认值为1。零是不遮挡效果。
  const aplhaTexture = new THREE.TextureLoader().load(img1);
  const aoTexture = new THREE.TextureLoader().load(img2);
    // //导入置换贴图
    // const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
    // // 导入粗糙度贴图
    // const roughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
    // // 导入金属贴图
    // const metalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
    // // 导入法线贴图
    // const normalTexture = textureLoader.load("./textures/door/normal.jpg");

  // 使用纹理进行材质创建
  const basicMaterial = new THREE.MeshStandardMaterial( { 
    /* 材质外观 */ 
    color:"#ffff00" ,
    alphaMap:aplhaTexture,
    transparent:true,
    opacity:0.3,
    aoMap: aoTexture,
    aoMapIntensity: 1,
    // displacementMap: doorHeightTexture,// 置换贴图
    // displacementScale:0.05,// 置换贴图对网格的影响程度
    // roughness: 1,// 材质的粗糙程度
    // roughnessMap: roughnessTexture,// 材质的粗糙度贴图
    // metalness: 1,// 材质的金属度 材质与金属的相似度
    // metalnessMap: metalnessTexture,// 材质的金属贴图
    // normalMap: normalTexture,// 材质的法线贴图
  } );
  // 定义将要渲染哪一面 - 正面，背面或两者
  basicMaterial.side = THREE.DoubleSide;

  // 给cube添加第二组uv
  cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute((cubeGeometry.attributes.uv as any).array, 2)
  );

  // 根据几何体和材质创建物体
  const cube2 = new THREE.Mesh(cubeGeometry, basicMaterial);

  // 物体添加到场景
  scene.add(cube2);




  /* ***** 添加页面控件 beging **** */
  // 修改 cube x 轴位置  修改范围及步骤值
  const gui = new dat.GUI();
  gui.add(cube.position, "x").min(0).max(5).step(0.01).name('x轴上移动').onChange((value: any) => {
    console.log("值被修改:", value);
  }).onFinishChange((value: any) => {
    console.log("修改结束:", value);
  })
  let params = {
    color: "#ffff00",
    fn: () => {
      gsap.to(cube.position, { x: 5, duration: 2, yoyo: true, repeat: -1 })
    }
  }
  gui.addColor(params, "color").onChange((value: any) => {
    console.log("值被修改:", value);
    cube.material.color.set(value)
  })
  gui.add(params, "fn").name('立方体运动')
  gui.add(cube, "visible").name('是否显示')

  let folder = gui.addFolder("设置立方体")
  folder.add(cube.material, "wireframe").name('线框展示')
  folder.add(cube.position, "x").min(0).max(5).step(0.01).name('x轴上移动')
  /* ***** 添加页面控件 end **** */

})


onUnmounted(() => {
  console.log(sceneDiv);
  if (sceneDiv.value) {
    sceneDiv.value.innerHTML = ''
  }
})






</script>
<style lang="scss" scoped>

</style>
