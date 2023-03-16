import * as THREE from "three";
import gsap from "gsap";
import vertex from "@/shader/smart-city/lightWall/vertex.glsl?raw";
import fragment from "@/shader/smart-city/lightWall/fragment.glsl?raw";

export default class LightWall {
  geometry:THREE.CylinderGeometry;
  material:THREE.ShaderMaterial;
  mesh:THREE.Mesh;
  /**
   * 
   * @param radius 光墙半径
   * @param length 动画缩放比例
   * @param height 光墙高度
   * @param position 光墙中心点位置 x z
   * @param color 光墙颜色
   */
  constructor(radius = 5,length = 2,height = 2,position = { x: 0, z: 0 },color = "rgb(255, 214, 98)") {
    // 创建圆柱缓冲几何体  openEnded:true底部开放 呈圆环状     
    this.geometry = new THREE.CylinderGeometry(radius, radius,height,32,32,true);
    
    // 创建材质
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(position.x, 1, position.z);
    this.mesh.geometry.computeBoundingBox();
    let { min, max } = this.mesh.geometry.boundingBox!;
    //   获取物体的高度差
    let uHeight = max.y - min.y;
    this.material.uniforms.uHeight = {
      value: uHeight,
    };





    gsap.to(this.mesh.scale, {
      x : length,
      z : length,
      duration: 1,
      repeat: -1,
      ease: "none",
      yoyo: true,// 每次重复播放前后交替进行
    });
  }

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.ShaderMaterial).dispose();
  }
}
