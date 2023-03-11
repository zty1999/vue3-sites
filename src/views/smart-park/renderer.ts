import * as THREE from "three";

// 初始化渲染器
// 渲染器透明
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
// 开启场景中的阴影贴图
renderer.shadowMap.enabled = true;
export default renderer