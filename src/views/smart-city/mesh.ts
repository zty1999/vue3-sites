import * as THREE from "three";
// 1、导入场景
import scene from "./scene"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// 修改函数
import {modifyCityMaterial} from "./modify"
// 生成线框
import MeshLine from "./mesh-line";
export const createCity = () =>{
  const gltfLoader = new GLTFLoader();
  gltfLoader.setPath('/public/')
  gltfLoader.load("models/glTF-Binary/city/city.glb", (gltf) => {
    console.log(gltf);
    
    // traverse 遍历调用者和调用者的所有后代 
    gltf.scene.traverse((item:any) => {
      if (item.type == "Mesh") {
        console.log(item);
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33),
        });
        item.material = cityMaterial;
        modifyCityMaterial(item);
        if (item.name == "Layerbuildings") {
          // 物体添加线框
          const meshLine = new MeshLine(item.geometry);
          const {x,y,z} = item.scale;
          meshLine.mesh.scale.set(x,y,z);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene);

    // 添加飞线
    // const flyLine = new FlyLine();
    // scene.add(flyLine.mesh);

    // // 添加着色器飞线
    // const flyLineShader = new FlyLineShader();
    // scene.add(flyLineShader.mesh);
    // // 添加雷达
    // const lightRadar = new LightRadar();
    // scene.add(lightRadar.mesh);

    // 添加光墙
    // const lightWall = new LightWall();
    // scene.add(lightWall.mesh);

    // 添加警告标识
    // const alarmSprite = new AlarmSprite();
    // scene.add(alarmSprite.mesh);
    // alarmSprite.onClick(function (e) {
    //   console.log("警告", e);
    // });
  });

}