/*
 * index.ts
 * ===========
 * Topmost Three.js class. 
 * Controls scene, cam, renderer, and objects in scene.
 */

import { useEventListener } from "@/hooks/useEventListener";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Ref } from "vue";

export interface ViewConfig {
  camera:[fov?: number, aspect?: number, near?: number, far?: number],

}


export default class View {
	public scene: THREE.Scene;
	public camera: THREE.PerspectiveCamera;
	public renderer: THREE.WebGLRenderer;
	public axesHelper: THREE.AxesHelper;
	public controls: OrbitControls;
  public config:any;
  public canvasElem:Ref<HTMLCanvasElement>;
  // protected defaultCamera: THREE.Camera;


	// private torus: Shape;

	constructor(canvasElem: Ref<HTMLCanvasElement>  ,config:any) {
		// this.renderer = new THREE.WebGLRenderer({
		// 	canvas: canvasElem,
		// 	antialias: true,
		// });
    this.canvasElem = canvasElem;
    this.config = config;
    this.renderer = new THREE.WebGLRenderer({});
    if(config.camera){
      this.camera = new THREE.PerspectiveCamera(...config.camera);
    }else {
      this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
		  this.camera.position.z = 15;

    }
		this.scene = new THREE.Scene();
    this.axesHelper = new THREE.AxesHelper(5)


    //创建轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    this.controls.enableDamping = true;




    this.scene.add(this.axesHelper)
    this.scene.add(this.camera);


    // 初始化渲染器
    // 设置渲染的尺寸大小
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // 开启场景中的阴影贴图
    this.renderer.shadowMap.enabled = true;
    this.renderer.physicallyCorrectLights = true;

    // 将webgl渲染的canvas内容添加到传入的元素
    canvasElem.value?.appendChild(this.renderer.domElement);
		// this.scene.background = new THREE.TextureLoader().load("./textures/bgnd.png");
		// this.torus = new Shape(this.scene);

		// Set initial sizes
		this.onWindowResize(window.innerWidth, window.innerHeight);


    // 动画渲染
    this.render()
	}

	public onWindowResize(vpW: number, vpH: number): void {
		// this.renderer.setSize(vpW, vpH);
		// this.camera.aspect = vpW / vpH;
		// this.camera.updateProjectionMatrix();

      // 监听画面变化，更新渲染画面
      useEventListener("resize", () => {
        //   console.log("画面变化了");
        let camera = this.camera
        let renderer = this.renderer
        // 更新摄像头
        camera.aspect = vpW / vpH;
        //   更新摄像机的投影矩阵
        camera.updateProjectionMatrix();

        //   更新渲染器
        renderer.setSize(vpW, vpH);
        //   设置渲染器的像素比
        renderer.setPixelRatio(window.devicePixelRatio);
      });
      // const  onPointerMove = (event:any) => {
      //   if ( event.isPrimary === false ) return;
      
      //   mouseX = event.clientX - windowHalfX;
      //   mouseY = event.clientY - windowHalfY;
      
      // }
      // useEventListener("pointermove",onPointerMove)


	}

	public render(): void {
    this.config.onRender && this.config.onRender(this.canvasElem,this.camera)
		// this.torus.update(secs);
    this.controls.update();
		this.renderer.render(this.scene, this.camera);
    
      //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(() =>this.render());
    
	}


}

// 使用
// 页面需存在 类名为 three-scene 元素