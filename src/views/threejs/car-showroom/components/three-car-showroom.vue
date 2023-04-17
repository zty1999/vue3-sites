<template>
  <div class="car-showroom">
    <div class="control" ref="controlEle">
    </div>
    <div class="view" ref="viewRef"></div>
  </div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as dat from "dat.gui";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { cloneFnJSON } from "@vueuse/core";

console.log(CANNON);


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
camera.position.set(0, 2, 10);
scene.add(camera);

/**
 * Renderer
 */
// alpha 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });


/**
 * Light
 */
// 环境光 
const light = new THREE.AmbientLight(0xffffff, 0.9); // soft white light
scene.add(light);
// 平行光
const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set(10, 100, 10);
scene.add( directionalLight );


/**
 * Controls
 */
//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement)
  

// 画布容器
const viewRef = ref<HTMLCanvasElement>()
// gui容器
const controlEle = ref<HTMLCanvasElement>();
/**
 * Clock
 */
const clock = new THREE.Clock();


/**
 * GUI
 */
 const gui = new dat.GUI({ name: '控制器' });

/**
 * Audio
 */
// 载入音频
const audioUrl = new URL("/public/audio/Panpipes - Angels.mp3", import.meta.url).href
let bgm = new Audio(audioUrl)

/**
 * Physic 
 */
// 创建物理世界
// const world = new CANNON.World({ gravity: 9.8 });
const world = new CANNON.World();
world.gravity.set(0, -9.8, 0);



/**
 * 汽车模型 环境贴图 地面
 * 汽车颜色修改：轮胎 车身
 * 摄像头模式切换 环绕 自由  //  环绕模式下 controls 开启自动旋转
 * 音频 音乐播放 
 * 汽车型号切换   // 模型内容散乱，难以整理 切换车辆功能先暂缓 待编写
 * 汽车行驶功能   // 添加车轮动画  监听上下左右键 播放动画并修改车辆位置      车身旋转情况下,方向有问题  待编写
 * 汽车试驾功能  // 待编写
 * 控件美化  // 待编写
 */

const conf = {
  wheelColor: 0x961e1e,
  bodyColor: 0x11ad46,
  mirrorColor:0x28161f,
  cameraMode:'random',
  playMusic:false,
  currentCar:'Koenigsegg'
}
const cameraOptions =  { '环绕': 'around', '自由': 'random' }
const cars = {'Koenigsegg':'Koenigsegg','mersedes':'mersedes'}
/**
 * Material
 */
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: conf.bodyColor,
  metalness: 0.5,// 材质与金属的相似度
  roughness: 0.2,// 材质的粗糙程度
});
const wheelMaterial = new THREE.MeshStandardMaterial({
  color: conf.wheelColor,
  metalness: 0.3,// 材质与金属的相似度
  roughness: 0.5,// 材质的粗糙程度
});
const rearviewMirrorMaterial = new THREE.MeshStandardMaterial({
  color: conf.mirrorColor,
  metalness: 0.3,// 材质与金属的相似度
  roughness: 0.5,// 材质的粗糙程度
});

/**
 * Model
 */
const models:{[key:string]:any} = {}
// 加载汽车模型
const loadCar = (type:string) =>{
  switch (type) {
    case 'Koenigsegg':
      loadCar1()
      break;
      case 'mersedes':
      loadCar2()
      break;
    default:
      break;
  }
}
const loadCar1 = () =>{
  const gltfLoader = new GLTFLoader();
  // gltfLoader.setPath('/public/')
  
  // gltfLoader.load("/models/car-showroom/car/Koenigsegg-agera.glb", (gltf) => {
  gltfLoader.load("http://rt99nlth2.hn-bkt.clouddn.com/3d/Koenigsegg-agera.glb", (gltf) => {
    console.log(gltf);
    // const children = [...gltf.scene.children]
    // console.log(children);
    // for(const child of children){
    //   child.scale.set(0.2,0.2,0.2)
    //   child.position.y = 0.9
    //   scene.add(child)
    // }
    // traverse 遍历调用者和调用者的所有后代 
    gltf.scene.traverse((item:any) => {
      console.log(item.name);
      if (item.name == "Body" ) {
        console.log(item);
        item.scale.set(0.2,0.2,0.2)
        item.position.y = 0.9
        item.rotateZ(Math.PI / 2)
        scene.add(item)
        models['Koenigsegg'] = item;
        camera.lookAt(item.position)

      }
      // 轮胎
      if (item.name == "FL" || item.name == 'FR' || item.name == "RL" || item.name == 'RR' ) {
        item.material = wheelMaterial;
        // scene.add(item)
      }
      // 车身零部件  后视镜
      if (item.name == 'Koenisegg_one341' ) {
        console.log(item,item.material);
        item.material = rearviewMirrorMaterial;
      }
      // 车窗
      // if (item.name == 'Koenisegg_one341_1' ) {
      //   console.log(item,item.material);
      //   item.material = bodyMaterial;
      // }
      // 车灯
      // if (item.name == 'Koenisegg_one341_2' ) {
      //   console.log(item,item.material);
      //   item.material = bodyMaterial;
      // }
      // 雨刮器
      // if (item.name == 'Koenisegg_one341_3' ) {
      //   console.log(item,item.material);
      //   item.material = bodyMaterial;
      // }
      // 主车身
      if (item.name == 'Koenisegg_one341_4' ) {
        item.material = bodyMaterial;
      }
      // 车标
      // if (item.name == 'Koenisegg_one341_5' ) {
      //   console.log(item,item.material);
      //   item.material = bodyMaterial;
      // }
      // 车大灯？
      // if (item.name == 'Koenisegg_one341_6' ) {
      //   console.log(item,item.material);
      //   item.material = bodyMaterial;
      // }
    });
    gui.addColor(conf,'wheelColor').name('轮胎颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      wheelMaterial?.color?.set(new THREE.Color(value))
    })
    gui.addColor(conf,'bodyColor').name('主车身颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      bodyMaterial?.color?.set(new THREE.Color(value))
    })
    gui.addColor(conf,'bodyColor').name('部件颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      rearviewMirrorMaterial?.color?.set(new THREE.Color(value))
    })


  });
}



const loadCar2 = () =>{
  const gltfLoader = new GLTFLoader();
  // gltfLoader.setPath('/public/') 
  // gltfLoader.load("/models/car-showroom/car/Roadster.glb", (gltf) => {
  gltfLoader.load("http://rt99nlth2.hn-bkt.clouddn.com/3d/Roadster.glb", (gltf) => {
    console.log(gltf);
    // geometry.computeBoundingBox();
    gltf.scene.position.y =  1.3;
    gltf.scene.rotation.y = - Math.PI / 2;
    gltf.scene.scale.set(0.4,0.4,0.4);
    const group = new THREE.Group()
    
    // traverse 遍历调用者和调用者的所有后代 
    gltf.scene&&gltf.scene.traverse((item:any) => {
      console.log(item.name);
      
      // 轮胎
      if (item.name == "Torus.008" || item.name == 'FR' || item.name == "RL" || item.name == 'RR' ) {
        item.material = wheelMaterial;
        // scene.add(item)
      }
    
      // 主车身
      if (item.name == 'Koenisegg_one341_4' ) {
        item.material = bodyMaterial;
      }
    
    });
    scene.add(gltf.scene)
    models['mersedes'] = group;

    gui.addColor(conf,'wheelColor').name('轮胎颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      wheelMaterial?.color?.set(new THREE.Color(value))
    })
    gui.addColor(conf,'bodyColor').name('主车身颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      bodyMaterial?.color?.set(new THREE.Color(value))
    })
    gui.addColor(conf,'bodyColor').name('部件颜色').onChange((value: any) => {
      console.log("值被修改:", value);
      rearviewMirrorMaterial?.color?.set(new THREE.Color(value))
    })

    camera.lookAt(models[conf.currentCar].position)


  });

}


/**
 * Events
 */

// 监听上下左右键  移动汽车位置 播放汽车轮胎旋转动画
useEventListener("keydown", (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
    console.log("keydown", e);
    // switch (e.key) {
    //   case 's':
    //   case 'ArrowDown':
    //     models[conf.currentCar].position.x += 1;
    //     break;
    //   case 'w':
    //   case 'ArrowUp':
    //     models[conf.currentCar].position.x -= 1;
    //   case 'a':
    //   case 'ArrowLeft':
    //     models[conf.currentCar].position.z -= 1;
    //     break;
    //   case 'd':
    //   case 'ArrowRight':
    //     models[conf.currentCar].position.z += 1;
    //     break;
    //   default:
    //     break;
    // }
  }


});




// 加载地面
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.2,
    emissive: 0xffffff,
    emissiveIntensity: -0.36,
    transparent: true,
    opacity: 0.7
  })
)
floor.rotation.order = "XYZ"
floor.rotation.x = - Math.PI / 2 
floor.rotation.z = Math.PI / 4  

scene.add(floor)




onMounted(() => {

  setupRenderer()
  loadCar(conf.currentCar)
  setupControls()
  // createAxesHelper()
  setUpGui()
  // playBgm()
  tick()

  // if(conf.cameraMode == 'around'){
  //     // camera.lookAt(models[conf.currentCar].position)
  //     // camera.position.x = Math.sin(time * 0.5) * 8 ;
  //     // camera.position.z = Math.cos(time * 0.5) * 6 ;
  //     // camera.position.y = Math.sin(time) * 0.02;
  //     controls.autoRotate = true
  //   }

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




const tick = () => {
  let time = clock.getElapsedTime();
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(tick);


  // 更新控制器
  controls.update()

  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera);
}


const setupControls = () => {

  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;
}
const createAxesHelper = () => {
  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper)
}
const setupRenderer = () => {
  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0x000000, 1);
  viewRef?.value?.appendChild(renderer.domElement)
}
const setUpGui = () => {
  gui.add(conf,'cameraMode', cameraOptions).name('摄像机模式').onChange((value:any)=>{
    if(conf.cameraMode == 'around'){
      controls.autoRotate = true
      // controls.autoRotateSpeed = 3
    }else if(conf.cameraMode == 'random'){
      controls.autoRotate = false
    }
  })
  gui.add(conf,'playMusic').name('播放bgm').onChange((value:any)=>{
    if(value){
      playBgm()
    }else {
      pauseBgm()
    }
  })
  // gui.add(conf,'currentCar',cars).name('查看车辆').onChange((value:any)=>{

  //     if(!models[value]){
  //       console.log(value);
  //       loadCar(value)
  //     }
  //     for (const key in models) {
  //       if (Object.prototype.hasOwnProperty.call(models, key)) {
  //         if(key == value){
  //           models[key].visible =true
  //         }else {
  //           console.log(key);
            
  //           models[key].visible =false
  //         }
  //       }
  //     }
    
  // })
  controlEle.value?.appendChild(gui.domElement)

}
// 播放 bgm 
const playBgm = () =>{
  // 重新从零开始播放
  bgm.currentTime = 0;
  // 音频音量
  bgm.volume = 0.5;
  bgm.play();
}

// 停止 bgm 
const pauseBgm = () =>{
  bgm.pause();
}

</script>
<style lang="scss" scoped>
.car-showroom {
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
