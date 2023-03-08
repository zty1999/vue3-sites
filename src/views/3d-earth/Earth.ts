type City = {
  name:string,
  longitude:number,
  latitude:number
}
type Citys = {
  [key:string]:City
}
type Line = {
  from:string,
  to:string[],
  color:string
}
export class Earth {
  constructor(ele:string | HTMLElement,citys:Citys,lines:Line[],config:any){}
  load(){
    
  }
}