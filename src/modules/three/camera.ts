import * as THREE from "three";
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
// camera.position.set(100, 100, 300);
camera.position.z = 5;

interface CameraCollection {
  [key:string]:THREE.PerspectiveCamera
}
class CameraModule {
  public activeCamera:THREE.PerspectiveCamera;
  protected cameraCollect:CameraCollection
  // constructor(config?:{fov?: number, aspect?: number, near?: number, far?: number}) {
  //   this.activeCamera = config? new THREE.PerspectiveCamera(...Object.values(config)):camera;
  //   this.cameraCollect = {
  //     default: camera,
  //   };
  //   // eventHub.on("toggleCamera", (name) => {
  //   //   this.setActiveCamera(name);
  //   // });
  // }
  constructor() {
    this.activeCamera = camera;
    this.cameraCollect = {
      default: camera,
    };
    // eventHub.on("toggleCamera", (name) => {
    //   this.setActiveCamera(name);
    // });
  }
  addCamera(name:string, config:number[]) {
    this.cameraCollect[name] = new THREE.PerspectiveCamera(...config)
    return this.cameraCollect[name];
  }
  // addCamera(name:string, camera:THREE.PerspectiveCamera) {
  //   this.cameraCollect[name] = camera;
  // }
  setActiveCamera(name:string) {
    this.activeCamera = this.cameraCollect[name];
  }
}

export default  new CameraModule();