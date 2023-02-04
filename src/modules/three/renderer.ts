import * as THREE from "three";
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({

});
// 设置渲染尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// document.querySelector(".three-render")!.appendChild(renderer.domElement);



export  { renderer };