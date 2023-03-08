import * as THREE from "three";
import { Vector3 } from "three";

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);


// 设置相机位置
camera.position.set(0, 20, 18);
camera.lookAt(new Vector3(0,0,0)); //设置相机方向(指向的场景对象)

export default camera