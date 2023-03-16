
import City from "./mesh/City";
import scene from "./scene";
let city;
export function createMesh(){
  // 创建城市
  let city = new City(scene);
  return city;
}