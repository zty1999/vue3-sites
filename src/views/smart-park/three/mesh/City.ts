import * as THREE from "three";
import gsap from 'gsap';
// 1、导入场景
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { AnimationAction, AnimationClip, AnimationMixer, Object3D, Scene } from "three";
import cameraModule from '../camera'
import eventHub from '@/utils/eventHub'
import {GLTF} from 'three/examples/jsm/loaders/GLTFLoader'
export default class City {
  scene: THREE.Scene;
  gltf!:GLTF;// 模型
  redcar!:THREE.Object3D<THREE.Event>;// 红色车辆模型
  loader: GLTFLoader;// 模型加载器
  mixer!:AnimationMixer;// 动画混合器
  clip!:AnimationClip;// 当前混合动画
  action!:AnimationAction;// 所传入的动画剪辑对象的动画动作
  curve!:THREE.CatmullRomCurve3;// 3维曲线
  curveProgress:number = 0;// 曲线进程

  constructor(scene:THREE.Scene) {
    this.scene = scene;

    this.loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.setDecoderConfig({ type: "js" });
    dracoLoader.preload();
    this.loader.setDRACOLoader(dracoLoader);
    this.loader.setPath('/public/models/')
    this.loader.load("smart-park/city4.glb", (gltf) => {
      scene.add(gltf.scene)
      this.gltf = gltf;
      // 场景子元素遍历
      gltf.scene.traverse((child) => {
        if (child.name === "热气球") {
          console.log(child);
          this.mixer = new THREE.AnimationMixer(child);
          this.clip = gltf.animations[1];
          this.action = this.mixer.clipAction(this.clip);
          this.action.play();
        }

        if (child.name === "汽车园区轨迹") {
          // console.log(child);
          const line:any = child;
          line.visible = false;
          // 根据点创建曲线
          const points = [];
          for (
            let i = line.geometry.attributes.position.count - 1;
            i >= 0;
            i--
          ) {
            points.push(
              new THREE.Vector3(
                line.geometry.attributes.position.getX(i),
                line.geometry.attributes.position.getY(i),
                line.geometry.attributes.position.getZ(i)
              )
            );
          }

          this.curve = new THREE.CatmullRomCurve3(points);
          this.curveProgress = 0;
          this.carAnimation();
        }

        if (child.name === "redcar") {
          console.log(child);
          this.redcar = child;
        }

  
      });

      scene.add(gltf.scene);
      // });
      gltf.cameras.forEach((camera) => {
        // scene.add(camera);
        cameraModule.add(camera.name, camera);
      });
     
    });

    eventHub.on("actionClick", (i) => {
      console.log(i);
      this.action.reset();// 热气球动画重置
      this.clip = this.gltf.animations[i];
      this.action = this.mixer.clipAction(this.clip);
      this.action.play();
    });

       
     

  }

  // 更新动画
  update(time:number) {
    if (this.mixer) {
      this.mixer.update(time);
    }
  }



  carAnimation() {
    gsap.to(this, {
      curveProgress: 0.999,
      duration: 10,
      repeat: -1,
      onUpdate: () => {
        const point = this.curve.getPoint(this.curveProgress);
        this.redcar.position.set(point.x, point.y, point.z);
        if (this.curveProgress + 0.001 < 1) {
          const point = this.curve.getPoint(this.curveProgress + 0.001);
          this.redcar.lookAt(point);
        }
      },
    });
  }


}