import * as THREE from "three";
import scene from "@/modules/three/scene";

// 添加坐标辅助器，帮助我们查看3维坐标轴 AxesHelper(坐标系大小)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
export default axesHelper;