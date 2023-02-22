import * as THREE from "three";
import scene from "@/modules/three/scene";

// 添加坐标辅助器，帮助我们查看3维坐标轴 AxesHelper(坐标系大小)
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
export default axesHelper;