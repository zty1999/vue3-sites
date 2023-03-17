import * as THREE from "three";
// import cameraModule from "./camera";
// import controlsModule from "./controls";
import scene from "./scene";
import { updateMesh } from "./createMesh";
import cameraModule from "./camera";
import renderer from "./renderer";
// import {renderer} from "./useRenderer";
  // 设置时钟
const clock = new THREE.Clock();
// let renderer:THREE.WebGLRenderer;
function animate() {
 
     // let time = clock.getElapsedTime();
    let deltaTime = clock.getDelta();

    updateMesh(deltaTime);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(animate);

   // 使用渲染器，通过相机将场景渲染进来
   renderer.render(scene, cameraModule.activeCamera);
    return true;
  // const time = clock.getDelta();
  // controlsModule.controls.update(time);
  // updateMesh(time);
  // requestAnimationFrame(animate);
  // // 使用渲染器渲染相机看这个场景的内容渲染出来
  // renderer.render(scene, cameraModule.activeCamera);
}

export default animate;