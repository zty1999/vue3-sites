<template>
  <div class="view" ref="viewRef"></div>
</template>
<script lang="ts" setup>
import gsap from "gsap";
import * as dat from "dat.gui"
import * as THREE from "three";
import * as CANNON from "cannon-es"
import { useEventListener } from "@/hooks/useEventListener";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Canvas
 */
const viewRef = ref<HTMLCanvasElement>()


/**
 * Gui
 */
const gui = new dat.GUI({ name: '控制器' });



/**
 * Scene
 */
const scene = new THREE.Scene();



/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
// 设置相机位置
camera.position.set(4, 2, 5);
scene.add(camera);


/**
 * Fog
 */
scene.fog = new THREE.Fog('#262837', 1, 15);




/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load('/textures/haunted-house/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/haunted-house/door/alpha.jpg')
const doorHeightTexture = textureLoader.load('/textures/haunted-house/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/haunted-house/door/normal.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/haunted-house/door/ambientOcclusion.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/haunted-house/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/haunted-house/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/haunted-house/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/haunted-house/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/haunted-house/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/haunted-house/bricks/roughness.jpg')


const grassColorTexture = textureLoader.load('/textures/haunted-house/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/haunted-house/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/haunted-house/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/haunted-house/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
/**
 * Renderer
 */
// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: false });
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.setClearColor('#262837')

/**
 * Controls
 */
//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

/**
 * AxesHelper
 */
// 添加坐标轴辅助器
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper)



/**
 * Light
 */
//添加环境光和平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01).name('环境光 intensity')
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xb9d5ff, 0.12);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 256
dirLight.shadow.mapSize.height = 256
dirLight.shadow.camera.far = 15
dirLight.position.set(4, 5, -2)
gui.add(dirLight, 'intensity').min(0).max(1).step(0.01).name('平行光 intensity')
gui.add(dirLight.position, 'x').min(- 5).max(5).step(0.01).name('x')
gui.add(dirLight.position, 'y').min(- 5).max(5).step(0.01).name('y')
gui.add(dirLight.position, 'z').min(- 5).max(5).step(0.01).name('z')
// gui.add(dirLight, 'color').name('平行光 color')
scene.add(dirLight);

// 屋门上方的点光源
const doorLight = new THREE.PointLight(0xb9d5ff, 1, 8);
doorLight.position.set(0, 2.2, 2.7)
scene.add(doorLight);


/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

// Walls
const wallsConf = {
  height: 2.5,
  width: 4,
  depth: 4
};
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(wallsConf.width, wallsConf.height, wallsConf.depth),
  new THREE.MeshStandardMaterial({
    // color: '#ac8e82'
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
  })
)
walls.castShadow = true
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute((walls.geometry.attributes.uv as any).array, 2))
walls.position.y = wallsConf.height / 2
house.add(walls)


// Roof

const roofHeight = 1;
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, roofHeight, 4),
  new THREE.MeshStandardMaterial({
    color: '#b35f45'
  })
)
roof.position.y = wallsConf.height + roofHeight / 2
roof.rotation.y = Math.PI / 4
house.add(roof)

// Door
const doorHeight = 2;
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, doorHeight, 100, 100),
  new THREE.MeshStandardMaterial({
    // color: '#aa7b7b',
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,// 灰度纹理贴图
    aoMap: doorAmbientOcclusionTexture,// 环境遮挡贴图 提供 uv2 生效
    //  位移贴图 配合设置位移程度，在设置 widthSegments widthSegments 时，产生位移效果
    displacementMap: doorHeightTexture,//位移贴图
    displacementScale: 0.1,// 位移程度
    normalMap: doorNormalTexture,// 法线贴图
    metalnessMap: doorMetalnessTexture,// 纹理金属度贴图
    roughnessMap: doorRoughnessTexture,// 纹理粗糙度贴图
  })
)
door.geometry.setAttribute(
  'uv2',
  new THREE.Float32BufferAttribute(
    (door.geometry.attributes.uv as any).array,
    2))
door.position.z = wallsConf.depth / 2 + 0.01
door.position.y = doorHeight / 2
house.add(door)

// Bushes
const bushDepth = 1;
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(
  bushGeometry,
  bushMaterial
)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(
  wallsConf.width / 2 - 0.8,
  0.2,
  wallsConf.depth / 2 + 0.01 + bushDepth
)

const bush2 = new THREE.Mesh(
  bushGeometry,
  bushMaterial
)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(
  wallsConf.width / 2 - 0.2,
  0.1,
  wallsConf.depth / 2 + 0.01 + 0.5
)

const bush3 = new THREE.Mesh(
  bushGeometry,
  bushMaterial
)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(
  -wallsConf.width / 2 + 1,
  0.1,
  wallsConf.depth / 2 + 0.01 + bushDepth
)

const bush4 = new THREE.Mesh(
  bushGeometry,
  bushMaterial
)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(
  -wallsConf.width / 2 + 0.75,
  0.1,
  wallsConf.depth / 2 + 0.01 + 1.5
)
house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

// 墓碑出现位置 在 圆圈内 绕屋外  随机排列 
for (let i = 0; i < 50; i++) {
  // 随机角度
  const angle = Math.random() * Math.PI * 2
  // console.log(angle);
  // 墓碑距场景中心随机距离 4-9  
  // 屋子 x，z 为 4 即距中心距离2以内的地方是屋内，设置墓碑位置 x,z 随机值大于 3， 避免墓碑出现在屋内，草丛
  const radius = 4 + Math.random() * 6;
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius
  const grave = new THREE.Mesh(
    graveGeometry,
    graveMaterial
  )
  grave.castShadow = true
  grave.position.set(x, 0.3, z)
  // 墓碑方向随机
  grave.rotation.y = (Math.random() - 0.5) * 0.6
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  graves.add(grave)

}



/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 3, 3)
ghost1.castShadow = true
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 3, 3)
ghost2.castShadow = true
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ff7800', 3, 3)
ghost3.castShadow = true
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
scene.add(ghost3)


/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    // color: new THREE.Color('#de5912'),
    side: THREE.DoubleSide,
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture
    // metalness: 0.3,// 材质与金属的相似度
    // roughness: 0.4,// 材质的粗糙程度
  })
);
floor.position.set(0, 0, 0);
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute((floor.geometry.attributes.uv as any).array, 2))
floor.receiveShadow = true;// 接收阴影
floor.rotation.x = - Math.PI / 2
// floor.rotation.z = -Math.PI / 2 
scene.add(floor)



/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Ghosts
  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(elapsedTime * 3)

  const ghost2Angle = - elapsedTime * 0.32
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  const ghost3Angle = - elapsedTime * 0.18
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}







onMounted(() => {

  renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight)
  viewRef?.value?.appendChild(renderer.domElement)
  tick()
  resize()

})


// 监听页面尺寸变化，更新渲染页面
const resize = function () {
  useEventListener("resize", () => {
    //   console.log("画面变化了");
    // 更新摄像头
    camera.aspect = viewRef.value!.offsetWidth / viewRef.value!.offsetHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //   更新渲染器
    renderer.setSize(viewRef.value!.offsetWidth, viewRef.value!.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
}










</script>
<style lang="scss" scoped>
.view {
  width: 100vw;
  height: 100vh;
}
</style>
