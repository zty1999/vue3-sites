import gsap from "gsap";
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Scene{
  scene!:THREE.Scene;
  camera!:THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  viewEl!:HTMLCanvasElement;
  constructor(viewEl:HTMLCanvasElement){
    // const gui = new dat.GUI();
    // 1、创建场景
    this.scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    // 设置相机位置
    camera.position.set(0, 0, 18);
    this.scene.add(camera);
    // 初始化渲染器
    // 渲染器透明
    this.renderer = new THREE.WebGLRenderer({ canvas:viewEl,alpha: true,antialias: true });
    this.camera = camera
    this.viewEl = viewEl;

  }


  load () {
    let renderer = this.renderer;
    let scene = this.scene;
    let camera = this.camera;
    let viewEl = this.viewEl;
    if(!viewEl){
      throw new Error("miss view element")
    }

    //创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)
  
  
    renderer.setSize(viewEl.offsetWidth, viewEl.offsetHeight)
    // 开启场景中的阴影贴图
    renderer.shadowMap.enabled = true;
    console.log(viewEl);
   
  
  
    // 设置时钟
    // const clock = new THREE.Clock();
    const render = () => {
      // let time = clock.getElapsedTime();
      // let deltaTime = clock.getDelta();
  
      // 使用渲染器，通过相机将场景渲染进来
      renderer.render(scene, camera);
      //   渲染下一帧的时候就会调用render函数
      requestAnimationFrame(render);
    }
    render()
  
  
  
    // 监听画面变化，更新渲染画面
    useEventListener("resize", () => {
      //   console.log("画面变化了");
      // 更新摄像头
      camera.aspect =viewEl.offsetWidth / viewEl.offsetHeight;
      //   更新摄像机的投影矩阵
      camera.updateProjectionMatrix();
      //   更新渲染器
      renderer.setSize(viewEl.offsetWidth, viewEl.offsetHeight);
      //   设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }


















}