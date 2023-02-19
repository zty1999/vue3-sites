import * as THREE from "three";
/**
 * @param count  三角形个数
 * @param size   三角形组成的立方体大小
 */

export const generateTriangles = (count: number = 5000, size: number = 800, itemSize: number = 120) => {
  const geometry = new THREE.BufferGeometry();
  // 每一个三角形，需要3个顶点，每个顶点都是一个三元组需要3个值 所以一个三角形的顶点位置值长度为9
  const positions = new Float32Array(count * 3 * 3);
  const colors = new Float32Array(count * 3 * 3);
  const color = new THREE.Color();
  const n = size * 2, n2 = size;	// triangles spread in the cube
  const d = itemSize, d2 = d / 2;	// individual triangle size
  for (let i = 0; i < positions.length; i += 9) {
    // positions 
    //  n = 800 d = 120     x = -400~400     ax = -460~460
    // const x = Math.random() * n - n2; // 0~1  => 0~800 => -400~400
    // const y = Math.random() * n - n2;
    // const z = Math.random() * n - n2;

    const x = Math.random() * n - n2;
    const y = Math.random() * n - n2;
    const z = Math.random() * n;

    const ax = x + Math.random() * d - d2;// -400~400 + -60~60  -460~460
    const ay = y + Math.random() * d - d2;
    const az = z + Math.random() * d - d2;

    const bx = x + Math.random() * d - d2;
    const by = y + Math.random() * d - d2;
    const bz = z + Math.random() * d - d2;

    const cx = x + Math.random() * d - d2;
    const cy = y + Math.random() * d - d2;
    const cz = z + Math.random() * d - d2;

    positions[i] = ax;
    positions[i + 1] = ay;
    positions[i + 2] = az;

    positions[i + 3] = bx;
    positions[i + 4] = by;
    positions[i + 5] = bz;

    positions[i + 6] = cx;
    positions[i + 7] = cy;
    positions[i + 8] = cz;


    // colors

    const vx = (x / n) + 0.5;// -400~400 / 800   => -0.5~0.5  + 0.5 => 0~1
    const vy = (y / n) + 0.5;
    const vz = (z / n) + 0.5;

    color.setRGB(vx, vy, vz);

    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;

    colors[i + 3] = color.r;
    colors[i + 4] = color.g;
    colors[i + 5] = color.b;

    colors[i + 6] = color.r;
    colors[i + 7] = color.g;
    colors[i + 8] = color.b;

  }

  // itemSize = 3 因为每个顶点都是一个三元组。
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.MeshBasicMaterial({
    // color: color,
    // transparent: true,
    // opacity: 0.5,
    side: THREE.DoubleSide,
    vertexColors: true,// 使用顶点着色
  });
  // let material = new THREE.MeshPhongMaterial( {
  // 				color: 0xaaaaaa, specular: 0xffffff, shininess: 250, // 高亮的程度，越高的值越闪亮
  // 				side: THREE.DoubleSide, vertexColors: true
  // 			} );
  // 根据几何体和材质创建物体
  const mesh = new THREE.Mesh(geometry, material);
  // console.log(mesh);

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(800);
  mesh.add(axesHelper);


  // const pivot = new THREE.Object3D();
  // const center = new THREE.Vector3();
  // pivot.position.set(center.x ,center.y - 200,center.z)
  // // mesh.position.set(-center.x,-center.y,-center.z)
  // pivot.add( mesh );

  let group = new THREE.Group();




  group.add(mesh)

  // return pivot 
  return group

}