<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
// 顶点着色器
import basicVertexShader from "@/shader/kmlight/vertex.glsl?raw"
// 片元着色器
import basicFragmentShader from "@/shader/kmlight/fragment.glsl?raw"
import { AnimationClip } from "three";
import { platform } from "os";

// console.log(CANNON);

// const gui = new dat.GUI();
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);


// 设置相机位置
camera.position.set(0, 2, 10);
scene.add(camera);

// 初始化渲染器
// 渲染器透明 { alpha: true }
const renderer = new THREE.WebGLRenderer();

const viewRef = ref<HTMLCanvasElement>()


/**
 * Physic World
 */
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);

/**
 * Floor
 */

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cb0303'),
    metalness: 0.3,// 材质与金属的相似度
    roughness: 0.4,// 材质的粗糙程度
  })
);

floor.position.set(0, 0, 0);
floor.receiveShadow = true;// 接收阴影
floor.rotation.x = - Math.PI / 2

// floor.rotation.z = -Math.PI / 2 
scene.add(floor)


// 物理世界创建地面
const floorShape = new CANNON.Plane();
const floorBody = new CANNON.Body();
// 当质量为0的时候，可以使得物体保持不动
floorBody.mass = 0;
floorBody.addShape(floorShape);
const floorMaterial = new CANNON.Material("floor");
floorBody.material = floorMaterial
// 地面位置
floorBody.position.set(0, 0, 0);
// 旋转地面的位置
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
world.addBody(floorBody);







/**
 * Models
 */

 // const duckModelUrl = new URL('@/assets/models/glTF-Binary/fish/BarramundiFish.glb',import.meta.url).href
const gltfLoader = new GLTFLoader()
gltfLoader.setPath('/public/')

console.log(gltfLoader);
// Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
// gltfLoader.setDRACOLoader( dracoLoader );

// gltfLoader.setResourcePath('/public/models/glTF/helmet/')
//  gltfLoader.load(
//   'models/glTF/helmet/FlightHelmet.gltf',
//   (gltf) => {
//     console.log(gltf);
//     console.log(gltf.scene);
//     console.log('success');
//     // while(gltf.scene.children.length){
//     //   scene.add(gltf.scene.children[0])
//     // }
//     const children = [...gltf.scene.children]
//     for(const child of children){
//       scene.add(child)
//     }
//     // const children = gltf.scene.children;
//     // for (let index = 0; index < children.length; index++) {
//     //   const child = children[index];
//     //   scene.add(child)
//     // }
//   },
//   () => {
//     console.log('progress');
//   },
//   () => {
//     console.log('error');
    
//   }
//  )

let mixer:THREE.AnimationMixer;
 gltfLoader.load(
  'models/glTF-Binary/fox/Fox.glb',
  (gltf) => {
    console.log(gltf);
    console.log(gltf.scene);
    console.log('success');
      mixer = new THREE.AnimationMixer(gltf.scene)
      const action = mixer.clipAction(gltf.animations[2])
      console.log(action);
      // 播放动画动作
      action.play()

      gltf.scene.scale.set(0.025,0.025,0.025)
      scene.add(gltf.scene)
    // while(gltf.scene.children.length){
    //   let child = gltf.scene.children[0];
    //   child.scale.set(0.02,0.02,0.02)
    //   scene.add(gltf.scene.children[0])
    //   console.log(child);
      
    //   mixer = new THREE.AnimationMixer(child)
    //   // 返回所传入的动画剪辑对象的动画动作 https://threejs.org/docs/index.html#api/zh/animation/AnimationMixer
    //   const action = mixer.clipAction(gltf.animations[2])
    //   console.log(action);
    //   // 播放动画动作
    //   action.play()
    // }
    
    
  },
  () => {
    console.log('progress');
  },
  () => {
    console.log('error');
    
  }
 )

// // draco压缩后的模型  解压后加载
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('/draco/')
// gltfLoader.setResourcePath('/public/models/glTF-Draco/lantern/')
// gltfLoader.setDRACOLoader(dracoLoader)
// gltfLoader.load(
//   'models/glTF-Draco/lantern/Lantern.gltf',
//   (gltf) => {
//     console.log(gltf);
//     console.log(gltf.scene);
//     console.log('success');
//     scene.add(gltf.scene.children[0])
//   },
//   () => {
//     console.log('progress');
//   },
//   () => {
//     console.log('error');
    
//   }
// )



// gltfLoader.load(
//   'models/glTF-Embedded/BrainStem.gltf',
//   (gltf) => {
//     console.log(gltf);
//     console.log('success');
//     gltf.scene.children[0].scale.set(2,2,2)
//     scene.add(gltf.scene.children[0])

//     const mixer = new THREE.AnimationMixer(gltf.scene)
//     // 返回所传入的动画剪辑对象的动画动作 https://threejs.org/docs/index.html#api/zh/animation/AnimationMixer
//     const action = mixer.clipAction(gltf.animations[0])
//     console.log(action);
//     // 播放动画动作
//     action.play()
//   },
//   () => {
//     console.log('progress');
//   },
//   () => {
//     console.log('error');
    
//   }
// )


//添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.castShadow = true;
scene.add(dirLight);









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



  let previousTime = 0;
  // 设置时钟
  const clock = new THREE.Clock();
  const render = () => {
    let elapsedTime = clock.getElapsedTime();
    // let deltaTime = clock.getDelta();
    let deltaTime = elapsedTime - previousTime;
    previousTime = elapsedTime;

    // 更新物理引擎里世界的物体
    world.step(1 / 120, deltaTime);
    // 更新动画混合器
    // console.log(mixer);
    
    if(mixer){
      mixer.update(deltaTime)
    }


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
