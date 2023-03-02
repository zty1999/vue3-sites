import * as THREE from "three";

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  300
);


// 设置相机位置
camera.position.set(0, 0, 18);


export default camera