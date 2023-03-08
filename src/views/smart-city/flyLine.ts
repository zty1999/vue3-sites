import * as THREE from "three"
import gsap from "gsap";
import flyLineImg from "@/assets/textures/smart-city/z_11.png"
export  class FlyLine2 {
  line!:THREE.Line;
  constructor(){
    //Create a closed wavey loop
    const curve = new THREE.CatmullRomCurve3( [
      // new THREE.Vector3( -10, 0, 10 ),
      // new THREE.Vector3( -5, 5, 5 ),
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 5, 5, 1 ),
      new THREE.Vector3( 13.4, 2.3, 1 )
    ] );

    const points = curve.getPoints( 50 );
    const geometry = new THREE.TubeGeometry(curve, 100,0.4,2,false).setFromPoints( (points.slice(0,1)) );
    
    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
    
    // Create the final object to add to the scene
    this.line = new THREE.Line( geometry, material );

    // gsap.to(this.line.geometry.points, {
    //   x: -1,
    //   duration: 1,
    //   repeat: -1,
    //   ease: "none",
    // });
  }

}

export default class FlyLine {
  lineCurve:THREE.CatmullRomCurve3;
  geometry:THREE.TubeGeometry;
  texture:THREE.Texture;
  material:THREE.MeshBasicMaterial
  mesh:THREE.Mesh
  constructor() {
    let linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 4, 0),
      new THREE.Vector3(9.4, 0, 0),
    ];
    // 1/创建曲线
    this.lineCurve = new THREE.CatmullRomCurve3(linePoints);
    // 2/根据曲线生成管道几何体 TubeGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)
    this.geometry = new THREE.TubeGeometry(
      this.lineCurve,
      100,
      0.4,
      2,
      false
    );
    // 3/设置飞线材质
    // 创建纹理
    const textloader = new THREE.TextureLoader();
    this.texture = textloader.load(flyLineImg);
    // uv方向上重复次数 任一方向上大于1 相应的wrap参数也应设置为 THREE.RepeatWrapping 或 THREE.MirroredRepeatWrapping
    this.texture.repeat.set(1, 2);  
    this.texture.wrapS = THREE.RepeatWrapping;// wrapS 定义了纹理如何水平包裹并对应于UV 映射中的U
    this.texture.wrapT = THREE.MirroredRepeatWrapping;// wrapT 定义了纹理如何垂直包裹并对应于UV 映射中的V

    this.material = new THREE.MeshBasicMaterial({
      // color: 0xfff000,
      map: this.texture,
      transparent: true,
    });

    // 4/创建飞线物体
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // 5/创建飞线的动画
    gsap.to(this.texture.offset, {
      x: -1,
      duration: 1,
      repeat: -1,
      ease: "none",
    });
  }
}
