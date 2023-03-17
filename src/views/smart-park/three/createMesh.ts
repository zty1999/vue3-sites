
import City from "./mesh/City";
import scene from "./scene";
let city:City;
export function createMesh(){
  // 创建城市
  city = new City(scene);
  return city;
}



export function updateMesh(time:number) {
  city.update(time);
}


