import eventHub from "@/utils/eventHub";
import * as THREE from "three";
import { Vector3 } from "three";
import scene from "./scene";
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  1,
  100000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
camera.position.set(1000, 800, 800);
    // camera.lookAt(new Vector3(0,0,0)); //设置相机方向(指向的场景对象)
class CameraModule {
  activeCamera!:THREE.Camera;
  collection!:{[key:string]:THREE.Camera};
  constructor(){
    this.activeCamera = camera;
    this.collection = {
      default: this.activeCamera
    } 
    scene.add(camera);


    eventHub.on("toggleCamera", (name:string) => {
      console.log(name);
      
      this.setActive(name);
    });

    
  }

  add(name:string, camera:THREE.Camera) {
    this.collection[name] = camera;
  }
  setActive(name:string) {
    this.activeCamera = this.collection[name];
  }
}






export default new CameraModule();