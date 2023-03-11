import * as THREE from "three";
import camera from "./camera";
export type AlarmType = {
  [key:string]:string
}
export default class AlarmSprite {
  raycaster!:THREE.Raycaster;
  geometry!:THREE.TubeGeometry;
  texture!:THREE.Texture;
  material:THREE.SpriteMaterial
  mesh:THREE.Sprite
  mouse:THREE.Vector2 // 鼠标位置

  fns:any[] = [] // 点击事件
  constructor(type = "火警", position = { x: -4.2, z: -1.2 }, color = 0xffffff) {
    const typeObj:AlarmType = {
      火警: new URL('@/assets/textures/smart-city/tag/fire.png',import.meta.url).href ,
      治安: new URL('@/assets/textures/smart-city/tag/jingcha.png',import.meta.url).href ,
      电力: new URL('@/assets/textures/smart-city/tag/e.png',import.meta.url).href ,
    };

    const map = new THREE.TextureLoader().load( typeObj[type] );
    this.material = new THREE.SpriteMaterial( { map: map } );

        // this.material = new THREE.SpriteMaterial({
    //   map: map,
    //   color: color,
    //   // blending: THREE.AdditiveBlending,
    //   transparent: true,
    //   depthTest: false,
    // });

    this.mesh = new THREE.Sprite( this.material );


    // 设置位置
    this.mesh.position.set(position.x, 3.5, position.z);


    // 创建射线
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // 事件的监听
    window.addEventListener("click", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
	    // 通过摄像机和鼠标位置更新射线
      this.raycaster.setFromCamera(this.mouse, camera);

      (event as any).mesh = this.mesh;
      (event as any).alarm = this;

      // 计算物体和射线的焦点
	    const intersects = this.raycaster.intersectObject( this.mesh );
      if (intersects.length > 0) {
        this.fns.forEach((fn) => {
          fn(event);
        });
      }
    });
  }
  onClick(fn:Function) {
    this.fns.push(fn);
  }

  remove() {
    this.mesh.remove();
    this.mesh.removeFromParent();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}
