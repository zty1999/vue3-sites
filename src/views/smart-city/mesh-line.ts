import * as THREE from "three";
export default class MeshLine {
  material:THREE.LineBasicMaterial
  geometry: THREE.EdgesGeometry
  mesh:THREE.LineSegments
  constructor(geometry:THREE.EdgesGeometry) {
    // 边缘几何体 EdgesGeometry
    const edges = new THREE.EdgesGeometry(geometry);
    // LineBasicMaterial 基础线条材质
    this.material = new THREE.LineBasicMaterial({ 
      color: 0xffffff,
      linewidth: 1,
      linecap: 'round', //ignored by WebGLRenderer
      linejoin:  'round' //ignored by WebGLRenderer
    });
    const line = new THREE.LineSegments(edges, this.material);
    this.geometry = edges;
    this.mesh = line;
  }
}