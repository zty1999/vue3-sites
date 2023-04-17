import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class THREERoot {
	public scene!: THREE.Scene;
	public camera!: THREE.PerspectiveCamera;
	public renderer!: THREE.WebGLRenderer;
	public axesHelper!: THREE.AxesHelper;
	public controls!: OrbitControls;
  public config:any;
  public canvasEle!:HTMLCanvasElement;
  constructor(params:any) {
    const { canvasEle , createCameraControls,antialias} = params;
    this.canvasEle = canvasEle;
    this.scene = new THREE.Scene(); 
    this.camera = new THREE.PerspectiveCamera(
      params.fov || 45,
      canvasEle!.value!.innerWidth / canvasEle!.value!.innerHeight,
      params.zNear || 1,
      params.zfar || 1000
    );
    // 设置相机位置
    this.camera.position.set(0, 0, 18);
    this.scene.add(this.camera);
    this.setupRenderer(antialias)

    if(createCameraControls){
      this.createControls()
    }
    this.createAxesHelper()
    this.tick()
  }

  public setupRenderer (antialias?:boolean) {
    this.renderer = new THREE.WebGLRenderer({
      antialias: antialias,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setSize(this.canvasEle.value!.offsetWidth, this.canvasEle.value!.offsetHeight)
    // 开启场景中的阴影贴图
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor(0x000000, 1);
    this.canvasEle?.value?.appendChild(this.renderer.domElement)
  }


  public createControls () {
    //创建轨道控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    this.controls.enableDamping = true;
  }
  // 添加坐标轴辅助器
  public createAxesHelper () {
    this.axesHelper = new THREE.AxesHelper(5);
    this.scene.add(this.axesHelper)
  }



  public tick () {
    console.log(this);
    this.controls && this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() =>this.tick);
  }
  public update() {
    
  }
  public render() {
    
  }
  public resize() {
    // 更新摄像头
    this.camera.aspect = this.canvasEle!.value!.offsetWidth / this.canvasEle!.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix();
    //   更新渲染器
    this.renderer.setSize(this.canvasEle!.value!.offsetWidth, this.canvasEle!.value!.offsetHeight);
    //   设置渲染器的像素比
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  }
}


 

