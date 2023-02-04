import * as THREE from "three";
import { BoxGeometry, Material, Mesh } from "three";
import cameraModule from "./camera";
import {renderer} from "./renderer";
import scene from "./scene";
import controls from "./controls";
// 设置时钟
const clock = new THREE.Clock()

export default  function animate(cube:Mesh) {
    // 渲染下一帧时调用  控制物体动画
    requestAnimationFrame(() => animate(cube) as any);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // required if controls.enableDamping or controls.autoRotate are set to true 
    controls.update();

    // 获取时钟运行总时长
    // let time = clock.getElapsedTime()
    // console.log(time);

    // 两次获取时间的间隔时间 即当前请求动画帧的时间
    // let deltaTime = clock.getDelta()
    // console.log(deltaTime);
    
    renderer.render(scene, cameraModule.activeCamera);
}
