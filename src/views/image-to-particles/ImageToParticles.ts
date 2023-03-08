import * as THREE from "three"
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEventListener } from "@/hooks/useEventListener";
import { generateTriangles } from "../3d-scroll/triangles";

/**
 * 初始化：
 *  1. 获取图片数据
 *  2. 图片数据转为粒子坐标数据
 *  3. 粒子渲染
 */
export default class ImageToParticles {
  image: any;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  element!: HTMLCanvasElement;
  group!: THREE.Group;
  /**
   * 
   * @param element 渲染容器
   * @param src 粒子渲染图片资源 
   */
  constructor(element: HTMLCanvasElement, src: string) {
    // init webGL 
    this.initWebGl(element)
    // 1. 获取图片数据
    this.image = new Image(800, 800); // Using optional size for image

    // this.image.onload = this.drawImageActualSize()
    // 1.1 
    this.image.src = src;

    this.element = element;


    // image.onload = drawImageActualSize; // Draw when image has loaded
    // // Load an image of intrinsic size 300x227 in CSS pixels
    // image.src = sourceImg;


  }
  drawImageActualSize() {
    const image = this.image;
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d')!
    console.log(image);

    // Use the intrinsic size of image in CSS pixels for the canvas element
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    // 像素数 
    const numPixels = width * height
    // Will draw the image as 300x227, ignoring the custom size of 60x45
    // given in the constructor
    ctx.scale(1, -1)
    ctx.drawImage(image, 0, 0, width, height * -1)

    // To use the custom size we'll have to specify the scale parameters
    // using the element's width and height properties - lets draw one
    // on top in the corner:
    // ctx.drawImage(this, 0, 0, this.width, this.height);

    // 用来描述canvas区域隐含的像素数据 
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    // imgData.data 包含着图片的像素数据的数组，即 RGBA 值
    // { width, numPixels, originalColors: Float32Array.from(imgData.data), }
    console.log(imgData);

    let positions = formatParticlesData({ width, numPixels, originalColors: Float32Array.from(imgData.data) }, 0)
    console.log(positions);
    return positions;
  }
  initWebGl(element: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    this.group = new THREE.Group()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    )
    camera.position.z = 18
    const fovHeight = 2 * Math.tan(camera.fov * Math.PI / 180 / 2) * camera.position.z
    this.camera = camera;
    this.scene.add(camera);

    // 初始化渲染器
    // 渲染器透明
    this.renderer = new THREE.WebGLRenderer({ canvas: element, alpha: true, antialias: true });
    //创建轨道控制器
    const controls = new OrbitControls(camera, this.renderer.domElement);
    // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    controls.enableDamping = true;
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper)
  }

  // 粒子渲染
  load() {

    // 2. 图片数据转为粒子坐标数据
    let image = this.image;
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext('2d')!
    const { width, height } = image;
    canvas.width = width;
    canvas.height = height;
    // 像素数 
    const numPixels = width * height
    // Will draw the image as 300x227, ignoring the custom size of 60x45
    // given in the constructor
    ctx.scale(0.01, -0.01)
    image.addEventListener('load', (e: any) => {
      ctx.drawImage(image, 0, 0, width, height * -1)
      // 用来描述canvas区域隐含的像素数据 
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      console.log(imgData);
      let positions = formatParticlesData({ width, numPixels, originalColors: Float32Array.from(imgData.data) }, 0)
      console.log(positions);
      // 3. 粒子渲染
      let group = this.group;
      let scene = this.scene;

      const material = new THREE.SpriteMaterial({ color: 0xffffff, fog: true })
      
   // const textureLoader = new THREE.TextureLoader()
    // const map = textureLoader.load(sourceImg)
    // const material = new THREE.SpriteMaterial({ map, color: 0xffffff, fog: true })
  
      let len = positions.length;
      for (let index = 0; index <len ; index += 2) {
        const particle = new THREE.Sprite(material)
        // 粒子目标位置 
        const targetX = positions[index]
        const targetY = positions[index + 1]
        const targetZ = positions[index + 2]

        if (targetX && targetY) {
          // 粒子的初始位置 
          particle.position.x = targetX
          particle.position.y = targetX
          particle.position.z = targetZ
          // 粒子从初始位置过渡到目标位置 
          // TweenMax.to(particle.position, 1, { x: targetX, y: targetY, z: targetZ, delay: Math.random() * 0.1 })
          // let position = {x:targetX,y:c,z:targetZ};
          // gsap.to(particle.position, {
          //   x: targetX,
          //   y: targetY,
          //   z: targetZ,
          //   duration: 2,
          //   // repeat: -1,
          //   ease: "none",
          // });
          group.add(particle)
          
        }
      }
   
      console.log(group);
      // group.scale.set(0.1,0.1,0.1)
      scene.add(group)
    
    });




    // const textureLoader = new THREE.TextureLoader()
    // const map = textureLoader.load(sourceImg)
    // const material = new THREE.SpriteMaterial({ map, color: 0xffffff, fog: true })
    const material = new THREE.SpriteMaterial({ color: 0xffffff, fog: true })
    // const positions = offsets;
    // console.log(positions);




    this.renderScene()
  }





  renderScene() {
    let renderer = this.renderer;
    let scene = this.scene;
    let camera = this.camera;
    let element = this.element;
    // //创建轨道控制器
    // const controls = new OrbitControls(camera, renderer.domElement);
    // // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    // controls.enableDamping = true;
    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper)

    console.log(scene);

    renderer.setSize(element.offsetWidth, element.offsetHeight)
    // 开启场景中的阴影贴图
    // renderer.shadowMap.enabled = true;





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
      camera.aspect = element?.offsetWidth / element?.offsetHeight;
      //   更新摄像机的投影矩阵
      camera.updateProjectionMatrix();
      //   更新渲染器
      renderer.setSize(element?.offsetWidth, element?.offsetHeight);
      //   设置渲染器的像素比
      renderer.setPixelRatio(window.devicePixelRatio);
    });
  }









}



const drawImageActualSize = (imageRef: any) => {
  const image = imageRef.value;
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext('2d')!
  console.log(image);

  // Use the intrinsic size of image in CSS pixels for the canvas element
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;
  // 像素数 
  const numPixels = width * height
  // Will draw the image as 300x227, ignoring the custom size of 60x45
  // given in the constructor
  ctx.scale(1, -1)
  ctx.drawImage(image, 0, 0, width, height * -1)

  // To use the custom size we'll have to specify the scale parameters
  // using the element's width and height properties - lets draw one
  // on top in the corner:
  // ctx.drawImage(this, 0, 0, this.width, this.height);

  // 用来描述canvas区域隐含的像素数据 
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // imgData.data 包含着图片的像素数据的数组，即 RGBA 值
  // { width, numPixels, originalColors: Float32Array.from(imgData.data), }
  console.log(imgData);

  let positions = formatParticlesData({ width, numPixels, originalColors: Float32Array.from(imgData.data) }, 0)
  console.log(positions);
  return positions;
}

const formatParticlesData = (imgData: any, threshold: number) => {
  let { width, numPixels, originalColors } = imgData;
  console.log(originalColors);

  let numVisible = 0
  // 统计大于阈值的像素点 
  for (let i = 0; i < numPixels; i++) {
    if (originalColors[i * 4 + 0] > threshold) numVisible++
  }
  console.log(numVisible);

  const offsets = new Float32Array(numVisible * 3)
  // 获取像素点的位置 
  for (let i = 0, j = 0; i < numPixels; i++) {
    if (originalColors[i * 4 + 0] > threshold) {
      // 获取 x 方向的坐标 
      offsets[j * 3 + 0] = i % width
      // 获取 y 方向的坐标 
      offsets[j * 3 + 1] = Math.floor(i / width)
      j++
    }
  }

  for (let i = 0, j = 0; i < numPixels; i++) {
    if (originalColors[i * 4 + 0] > threshold) {
      // 获取 x 方向的坐标 
      offsets[j * 3 + 0] = i % width
      // 获取 y 方向的坐标 
      offsets[j * 3 + 1] = Math.floor(i / width)
      j++
    }
  }

  return offsets
}



const getImgData = (img: HTMLImageElement) => {
  if (!img) {
    throw new Error("miss source img")
  }
  // 宽、高 
  const { width, height } = img as any

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext('2d')!
  console.log(width, height);
  console.log(canvas.width, ctx);

  // 像素数 
  const numPixels = width * height
  canvas.width = width
  canvas.height = height
  ctx.scale(1, -1)

  img.addEventListener('load', (e) => {
    ctx.drawImage(img, 0, 0, width, height * -1)
  });


  // 用来描述canvas区域隐含的像素数据 
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  // imgData.data 包含着图片的像素数据的数组，即 RGBA 值
  return { width, numPixels, originalColors: Float32Array.from(imgData.data), }
}

// 设定一个阈值 threshold ，如果满足 originalColors[i * 4 + 0] > threshold 的条件，
// 则统计该像素点可见，然后遍历 originalColors 得到可见像素点的位置的坐标。
const getParticleData = (img: HTMLImageElement, threshold: number) => {
  const { width, numPixels, originalColors } = getImgData(img)
  let numVisible = 0
  // 统计大于阈值的像素点 
  for (let i = 0; i < numPixels; i++) {
    if (originalColors[i * 4 + 0] > threshold) numVisible++
  }
  const offsets = new Float32Array(numVisible * 3)
  // 获取像素点的位置 
  for (let i = 0, j = 0; i < numPixels; i++) {
    if (originalColors[i * 4 + 0] > threshold) {
      // 获取 x 方向的坐标 
      offsets[j * 3 + 0] = i % width
      // 获取 y 方向的坐标 
      offsets[j * 3 + 1] = Math.floor(i / width)
      j++
    }
  }
  return { offsets }
}