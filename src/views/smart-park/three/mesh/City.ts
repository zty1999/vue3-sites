import * as THREE from "three";
// 1、导入场景
import scene from "../scene"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Scene } from "three";


export default class City {
  scene: THREE.Scene;
  floor1Group!: THREE.Group;
  floor2Group!: THREE.Group;
  wallGroup!: THREE.Group;
  fighterGroup!: THREE.Group;
  floor2Tags: any[] = [];
  constructor(scene:THREE.Scene) {
    this.scene = scene;
    this.floor1Group;
    this.floor2Group;
    this.wallGroup;
    this.floor2Tags = [];

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setPath('/public/draco/')


    gltfLoader.load("glb/smart-spark/floor2.glb", (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene)
      this.floor2Group = gltf.scene;
      let array = ["小型会议室", "核心科技室", "科技展台", "设计总监办公室"];
      // // 判断子元素是否是物体
      // gltf.scene.traverse((child) => {
      //   if (child.isMesh) {
      //     // console.log(child);
      //     child.material.emissiveIntensity = 15;
      //     // child.receiveShadow = true;
      //     // child.castShadow = true;
      //   }
      //   if (array.indexOf(child.name) != -1) {
      //     // console.log("小型会议室", child);
      //     const css3dObject = this.createTag(child);
      //     css3dObject.visible = false;
      //     this.floor2Tags.push(css3dObject);
      //     this.floor2Group.add(css3dObject);
      //   }
      // });
      // this.floor2Group.visible = false;

      // scene.add(this.floor2Group);
      // });

     
    });

    gltfLoader.load("glb/smart-spark/floor1.glb", (gltf) => {
      console.log(gltf);
      this.floor1Group = gltf.scene;

      // 判断子元素是否是物体
      // gltf.scene.traverse((child) => {
      //   if (child.isMesh) {
      //     // console.log(child);
      //     child.material.emissiveIntensity = 5;
      //     // child.receiveShadow = true;
      //     // child.castShadow = true;
      //   }
      // });
      // this.floor1Group.visible = false;
      scene.add(gltf.scene);
    });

    gltfLoader.load("glb/smart-spark/wall.glb", (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);
      this.wallGroup = gltf.scene;
    });

    gltfLoader.load("glb/smart-spark/Fighter1.glb", (gltf) => {
      console.log(gltf);

      this.fighterGroup = gltf.scene;

      // this.fighterGroup.visible = false;
      scene.add(this.fighterGroup);
      // this.fighterGroup.position.set(3, 42, 68);
      // this.fighterGroup.traverse((child) => {
      //   if (child.isMesh) {
      //     // console.log(child);
      //     child.material.emissiveIntensity = 15;
      //     child.position2 = child.position.clone();
      //   }
      // });
      // this.mouse = new THREE.Vector2();
      // this.raycaster = new THREE.Raycaster();
      // // 事件监听
      // window.addEventListener("click", (event) => {
      //   //   console.log(event);
      //   //   对时间对象进行加工
      //   event.mesh = this;
      //   // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      //   this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //   this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

      //   //通过摄像机和鼠标位置更新射线
      //   this.raycaster.setFromCamera(this.mouse, cameraModule.activeCamera);

      //   //进行检测
      //   const intersects = this.raycaster.intersectObject(this.fighterGroup);
      //   //   console.log(intersects);
      //   if (intersects.length > 0) {
      //     //   真正触发精灵的点击事件
      //     console.log("点击了战斗机");
      //     if (this.floor2Group.visible) {
      //       this.floor2Group.visible = false;
      //       this.floor2Tags.forEach((tag) => {
      //         tag.visible = false;
      //       });
      //     } else {
      //       this.floor2Group.visible = true;
      //       this.floor2Tags.forEach((tag) => {
      //         tag.visible = true;
      //       });
      //     }
      //   }
    });

    // this.showFighter();

  }



}