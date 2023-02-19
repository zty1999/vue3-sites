参考资料:
官网 https://threejs.org/docs
郭隆邦 http://www.webgl3d.cn/pages/56b66b/

素材网站:
https://www.poliigon.com/search/free
https://3dtextures.me/
https://www.arroway-textures.ch/textures/
https://quixel.com/ 配合虚幻引擎账号免费使用

3d text 字体转换：
facetype.js

matcaps(use MeshMatcapMaterial):
https://github.com/nidorx/matcaps



三要素：
场景
相机
渲染器






三维物体（Object3D）




辅助对象

## 基本使用


```js


// 初始化场景
const scene = new THREE.Scene();

// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
// object3d具有position，属性是1个3维的向量
// camera.position.set(100, 100, 300);
camera.position.z = 5;

// 初始化渲染器
const renderer = new THREE.WebGLRenderer({});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);





//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标辅助器，帮助我们查看3维坐标轴 AxesHelper(坐标系大小)
const axesHelper = new THREE.AxesHelper(5);


// 添加相机 
scene.add(camera);
// 添加辅助坐标轴
scene.add(axesHelper);




// 添加物体
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 根据几何体和材质创建物体
const cube = new THREE.Mesh(geometry, material);
// 修改物体位置
// cube.position.x += 0.01;
// 修改物体旋转角度及各轴旋转顺序
// cube.rotation.set(Math.PI / 4,0,0,"XZY")
// cube.rotation.x += 0.01;
// 修改物体缩放倍数
// cube.scale(1,1,1);   
// 投射阴影
cube.castShadow = true;
// 接收阴影
cube.receiveShadow = true;
// 物体添加到场景
scene.add(cube);



// 设置时钟
const clock = new THREE.Clock()


// 渲染动画
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
    
    renderer.render(scene, camera);
}

```

## 自定义几何体
一个简单的矩形由两个三角形组成。
创建一个简单的矩形，需要6个顶点。
**TorusGeometry 圆环几何体** 
### 打造酷炫的三角形
```js
  // 添加物体
  // 创建几何体
  for (let i = 0; i < 25; i++) {
    // 每一个三角形，需要3个顶点，每个顶点都是一个三元组需要3个值 所以一个三角形的顶点位置值长度为9
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
      positionArray[j] = Math.random() * 10 - 5;
    }
    // itemSize = 3 因为每个顶点都是一个三元组。
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
    });
    // 根据几何体和材质创建物体
    const mesh = new THREE.Mesh(geometry, material);
    console.log(mesh);
    scene.add(mesh);
  }
```







## 材质纹理

### 材质

**MeshMatCapMaterial**
由材质捕捉（MatCap，或光照球 Lit Sphere）纹理定义，mapcap图像文件编码了烘焙过的光照（即matcapTexture本身包含光照），因此MeshMatcapMaterial 不对灯光作出反应。
会投射阴影到一个接受阴影的物体上(and shadow clipping works)，但不会产生自身阴影或是接受阴影。

### 加载纹理
```js
  // 添加物体
  // 创建几何体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // 加载纹理
  let img1 = new URL("@/modules/three/textures/MetalDesignerWeaveSteel002_ROUGHNESS_3K_METALNESS.jpg" , import.meta.url).href
  const texture = new THREE.TextureLoader().load( img1);
  // 使用纹理进行材质创建 
  const basicMaterial = new THREE.MeshBasicMaterial(/* 材质外观 */ { /* map颜色贴图 */ map: texture,color:"#ffff00" } );

	// 定义将要渲染哪一面 - 正面，背面或两者
  basicMaterial.side = THREE.DoubleSide;


  // 根据几何体和材质创建物体
  const cube2 = new THREE.Mesh(cubeGeometry, basicMaterial);

  // 物体添加到场景
  scene.add(cube2);
```

### 纹理偏移 旋转 重复

```js

  // 加载纹理
  // 创建几何体
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

  // 加载纹理
  let img1 = new URL("@/modules/three/textures/MetalDesignerWeaveSteel002_ROUGHNESS_3K_METALNESS.jpg" , import.meta.url).href
  const texture = new THREE.TextureLoader().load( img1);
  console.log(texture);
  
  // 纹理偏移offset（二维 x,y）   
  // texture.offset.x = 0.5;
  // texture.offset.y = 0.5;
  texture.offset.set(0.5,0.5);
  // 纹理旋转rotation（正值为逆时针方向旋转）
  texture.rotation = Math.PI / 4; // 旋转45deg
  // 设置旋转中心点。(0.5, 0.5)对应纹理的正中心。默认值为(0,0)，即左下角
  // texture.center.set(0.5,0.5);
  // 纹理重复repeat（repeat 设置为大于 1，则相应的 Wrap 参数也应设置为 THREE.RepeatWrapping 或 THREE.MirroredRepeatWrapping 以实现平铺）
  // THREE.RepeatWrapping 纹理贴图的映射模式 纹理将简单地重复到无穷大
  // THREE.MirroredRepeatWrapping， 纹理将重复到无穷大，在每次重复时将进行镜像
  texture.wrapS = THREE.RepeatWrapping;// 纹理贴图在水平方向上将如何包裹 
  texture.wrapT = THREE.RepeatWrapping;// 纹理贴图在垂直方向上将如何包裹
  texture.repeat.set( 4, 4 );

  // 使用纹理进行材质创建
  const basicMaterial = new THREE.MeshBasicMaterial( { /* 材质外观 */ map: texture,color:"#ffff00" } );

  // 根据几何体和材质创建物体
  const cube2 = new THREE.Mesh(cubeGeometry, basicMaterial);

  // 物体添加到场景
  scene.add(cube2);
```

### 纹理显示算法
```js
  // 设置当一个纹素覆盖小于/大于一个像素时纹理如何显示
  // texture纹理显示设置 https://threejs.org/docs/index.html#api/zh/textures/Texture
  // texture.minFilter = THREE.NearestFilter;
  // texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
```

### 透明材质与透明纹理

```js
  // 透明材质与透明纹理 alphaMap+transparent
  // alphaMap 控制材质表面的不透明度,加载透明纹理 仅使用纹理的颜色，忽略alpah通道
  // transparent 属性设置是否透明，为 false 则材质将保持完全不透明
  // opacity 属性设置透明度
  const aplhaTexture = new THREE.TextureLoader().load(img1);
  // 使用纹理进行材质创建
  const basicMaterial = new THREE.MeshBasicMaterial( { 
    /* 材质外观 */ 
    color:"#ffff00" ,
    alphaMap:aplhaTexture,
    transparent:true,
    opacity:0.3,

  } );

```

### 环境遮挡贴图与强度

AO环境遮挡贴图


```js
  // aoMap 环境遮挡贴图 第二层贴图 aoMap需要第二组UV
  // aoMapIntensity 环境遮挡效果的强度。默认值为1。零是不遮挡效果。
  const aoTexture = new THREE.TextureLoader().load(img2);

  // 使用纹理进行材质创建
  const basicMaterial = new THREE.MeshBasicMaterial( { 
    /* 材质外观 */ 
    color:"#ffff00" ,
    alphaMap:aplhaTexture,
    transparent:true,
    opacity:0.3,
    aoMap: aoTexture,
    aoMapIntensity: 1,
  } );
	// 给cube添加第二组uv
  cubeGeometry.setAttribute(
    "uv2",
    new THREE.BufferAttribute((cubeGeometry.attributes.uv as any).array, 2)
  );
```










### PBR 材质与纹理贴图 (PBR 基于物理的渲染(physically-based rendering))
PBR 是利用真实世界的原理和理论，通过各种数学方法推导或简化或模拟出一系列渲染方程，并依赖计算机硬件和图形API渲染出拟真画面的技术。
#### 与物理渲染的区别
基于现阶段的知识水平和硬件水平，还不能渲染跟真实世界完全一致的效果，只能一定程序上模拟接近真实世界的渲染画面，故而叫基于物理的渲染（Physically Based Rendering），而非物理渲染（Physical Rendering）。
#### 呈现的效果特征
相比传统的Lambert着色和Phong着色，PBR着色在效果上有着质的提升，可以表示更多更复杂的材质特征：
表面细节
物体粗糙度
区别明显的金属和绝缘体
物体的浑浊程度
菲涅尔现象：不同角度有不同强度的反射光
半透明物体
多层混合材质
清漆效果
其它更复杂的表面特征
#### 标准网格材质(MeshStandardMaterial)

一种基于物理的标准材质，使用Metallic-Roughness工作流程。


#### PBR材质金属度和粗糙度
```js
  const basicMaterial = new THREE.MeshStandardMaterial( { 
    /* 材质外观 */ 
    color:"#ffff00" ,
    alphaMap:aplhaTexture,
    transparent:true,
    opacity:0.3,
    aoMap: aoTexture,
    aoMapIntensity: 1,
    displacementMap: doorHeightTexture,// 置换贴图
    displacementScale:0.05,// 置换贴图对网格的影响程度
    roughness: 1,// 材质的粗糙程度
    roughnessMap: roughnessTexture,// 材质的粗糙度贴图
    metalness: 1,// 材质的金属度 材质与金属的相似度
    metalnessMap: metalnessTexture,// 材质的金属贴图
    normalMap: normalTexture,// 材质的法线贴图
  } );
```
### 环境贴图
实际生活中，一个物体表面，往往会反射周围的环境。人的眼睛看到的东西，往往反射有周围景物，所以three.js渲染模型，如果想渲染效果更好看，如果想更符合实际生活情况，也需要想办法让模型反射周围景物。
MeshStandardMaterial材质的环境贴图属性是.envMap，通过PBR材质的贴图属性可以实现模型表面反射周围景物，这样渲染效果更好.

环境贴图，就是一个模型周围的环境的图像，比如一间房子，房子的上下左右前后分别拍摄一张照片，就是3D空间中6个角度方向的照片。所以加载环境贴图需要设置多张图片
```js
	// 加载环境贴图
	const envTextureCube = new THREE.CubeTextureLoader()
			.setPath('./xxx/xxx/')// 图片所在目录
			.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
	const basicMaterial = new THREE.MeshStandardMaterial( { 
    /* ... */
		envMap: envTextureCube, //设置pbr材质环境贴图
  } );
```

#### 默认环境贴图
也可以通过 scene 属性设置,给场景所有物体添加默认的环境贴图
```js
	scene.background = envTextureCube, //给场景添加背景
	scene.environment = envTextureCube, //给场景所有物体添加默认的环境贴图
```
#### HDR 环境贴图
```js
	const rgbeLoader = new RGBELoader();
	// loadAsync 异步加载 环境贴图加载完毕后 设置 场景背景及默认贴图
	rgbeLoader.loadAsync("textures/hdr/002.hdr").then((texture) => {
	// exture.mapping 图像将如何应用到物体（对象）上
	
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

```

CubeReflectionMapping 和 CubeRefractionMapping 用于 CubeTexture —— 由6个纹理组合而成，每个纹理都是立方体的一个面。 对于CubeTexture来说，CubeReflectionMapping是其默认值。

EquirectangularReflectionMapping 和 EquirectangularRefractionMapping 用于等距圆柱投影的环境贴图，也被叫做经纬线映射贴图。等距圆柱投影贴图表示沿着其水平中线360°的视角，以及沿着其垂直轴向180°的视角。贴图顶部和底部的边缘分别对应于它所映射的球体的北极和南极。


### 纹理加载进度
#### 单张纹理图的加载
```js
let event = {};
// 单张纹理图的加载
event.onLoad = function () {
  console.log("图片加载完成");
};
event.onProgress = function (e) {
  console.log("图片加载进度:");
  console.log(e);
};
event.onError = function (e) {
  console.log("图片加载出现错误");
  console.log(e);
};

const doorColorTexture = textureLoader.load(
  "./textures/door/color.jpg"
    event.onLoad,
    event.onProgress,
    event.onError
);

```

#### 多张纹理图的加载
```js
let event = {};

event.onLoad = function () {
  console.log("图片加载完成");
};
event.onProgress = function (url, num, total) {
  console.log("图片加载完成:", url);
  console.log("图片加载进度:", num);
  console.log("图片总数:", total);
  let value = ((num / total) * 100).toFixed(2) + "%";
  console.log("加载进度的百分比：", value);
  div.innerHTML = value;
};
event.onError = function (e) {
  console.log("图片加载出现错误");
  console.log(e);
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load(
  "./textures/door/color.jpg"
);

```

## 灯光与阴影
```js

  // 灯光 Light( color : Integer, intensity : Float )( 颜色,强度)
  // 环境光 
  const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
  //直线光源(聚光灯)
  const spotLight = new THREE.SpotLight(0xffffff, 1);
  // 聚光灯位置
  spotLight.position.set(5, 5, 5);
  spotLight.castShadow = true;// 投射阴影
  // spotLight.shadow 用于计算此光照的阴影
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
	// spotLight.shadow.camera 设置聚光灯投射相机的属性
  spotLight.shadow.camera.near = 500;
  spotLight.shadow.camera.far = 4000;
  spotLight.shadow.camera.fov = 30;
  spotLight.intensity = 2;

	spotLight.target = sphere;// 聚光灯投射目标的位置
	spotLight.angle = Math.PI / 6;// 光线散射角度
	spotLight.distance = 0;// 从光源发出光的最大距离，其强度根据光源的距离线性衰减
	spotLight.penumbra = 0;// 聚光锥的半影衰减百分比
	// spotLight.decay = 0;// 灯光沿光照距离的衰减量。 默认值为 2。使用物理上正确的光照模式中，不应更改默认值。
	// 使用物理上正确的光照模式 
	renderer.physicallyCorrectLights = true;


	// 平行光
  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.shadow.camera.top = 5;
	directionalLight.shadow.camera.bottom = -5;
	directionalLight.shadow.camera.left = -5;
	directionalLight.shadow.camera.right = 5;

	// 灯光阴影
	// 1、材质要满足能够对光照有反应
	// 2、设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true;
	// 3、设置光照投射阴影 directionalLight.castShadow = true;
	// 4、设置物体投射阴影 sphere.castShadow = true;
	// 5、设置物体接收阴影 plane.receiveShadow = true;

	// 设置阴影贴图模糊度
	directionalLight.shadow.radius = 20;
	// 设置阴影贴图的分辨率
	directionalLight.shadow.mapSize.set(4096, 4096);


	// 点光源
	const pointLight = new THREE.PointLight(0xff0000, 1);
	// pointLight.position.set(2, 2, 2);
	pointLight.castShadow = true;

	// 设置阴影贴图模糊度
	pointLight.shadow.radius = 20;
	// 设置阴影贴图的分辨率
	pointLight.shadow.mapSize.set(512, 512);
	pointLight.decay = 0;

	// 点光源添加到物体
	smallBall.add(pointLight);



```
### 光线投射与物体交互 Raycaster

光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
官网示例：
```js
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function render() {

	// 通过摄像机和鼠标位置更新射线
	raycaster.setFromCamera( pointer, camera );

	// 计算物体和射线的焦点  检测物体
	const intersects = raycaster.intersectObjects( scene.children );

	for ( let i = 0; i < intersects.length; i ++ ) {

		intersects[ i ].object.material.color.set( 0xff0000 );

	}

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );
window.requestAnimationFrame(render);
```







## 其它
### 性能监视器
```js
let stats = new Stats() // 创建性能监视器 

stats.setMode(0) // 设置监视器面板，传入面板id(0: fps, 1: ms, 2: mb) 
// 设置监视器位置 
stats.domElement.style.position = 'absolute' 
stats.domElement.style.left = '0px' 
stats.domElement.style.top = '0px'

// 将监视器添加到页面中 
document.body.appendChild(stats.domElement)

function render() {

 stats.update() // 更新帧数

  renderer.render(scene, camera) 
  requestAnimationFrame(render) 
}

render()
```
## GSAP （GreenSock 动画平台）

构建适用于所有主流浏览器的高性能动画

```js
import gsap from "gsap";
// 设置动画 
// 5秒向x轴移动10个单位  
gsap.to(cube.position, { x: 10,duration: 5 })
// 5秒旋转180度
gsap.to(cube.rotation, { x: 2 / Math.PI,duration: 5 })
// 调整动画速率 https://greensock.com/docs/v3/Eases
gsap.to(cube.rotation, { x: 2 / Math.PI,duration: 5,easy: "power3.out" })
// 设置回调函数及其它参数
let animate1 = gsap.to(cube.rotation, { 
    x: 2 / Math.PI,
    duration: 5,
    easy: "power3.out" ,
    repeat:2,// 重复次数  无限次设置-1
    yoyo:true,// 往返运动
    delay:2,// 延迟n秒运动
    onComplete:() => {
        console.log("动画完成")
    },
    onStart:() =>{
        console.log("动画开始")
    }
})

window.addEventListener("dblclick",() => {
    if(animate1.isActive()){
        animate1.pause()// 暂停动画
    }else {
        animate1.pause()// 恢复动画
    }
})
```




## dat.gui 轻量级的图形用户界面库(GUI 组件)

用于 JavaScript 的轻量级控制器库。它允许您轻松地即时操作变量和触发函数。
### 使用
示例中 cube 为 threejs 场景中加入的物体
**step 步进器**
```js
    const gui = new dat.GUI();

    // 修改物体  x 轴位置  修改范围及步进值 设置名称 设置修改触发事件
    gui.add(cube.position,"x").min(0).max(5).step(0.01).name('x轴上移动').onChange((value) =>{
        console.log("值被修改:",value);
    }).onFinishChange((value)=>{
        console.log("修改结束:",value);
        
    })

```

**颜色选择器**
```js
    const gui = new dat.GUI();

    // 修改物体 颜色
    let params = {
        color: "#ffff00"
    }
    gui.addColor(params,"color").onChange((value) =>{
        console.log("值被修改:",value);
        cube.material.color.set(value)
    })

```
**按钮**
```js
    const gui = new dat.GUI();
    let params = {
        fn: () =>{
            gsap.to(cube.position,{x:5,duration:2,yoyo:true,repeat:-1})
        }
    }
    gui.add(params,"fn").name('立方体运动')

```

**选项框**
```js
    const gui = new dat.GUI();

    gui.add(cube,"visible").name('是否显示')

```

**文件夹（菜单分组 可嵌套）**
```js
    const gui = new dat.GUI();

    let folder = gui.addFolder("设置立方体")
    folder.add(cube.material,"wireframe").name( '线框展示')
    folder.add(cube.position,"x").min(0).max(5).step(0.01).name('x轴上移动')
```    





## FAQ
物体绕自身旋转