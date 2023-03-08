import * as THREE from "three";
import gsap from "gsap"
import {rgb255To1} from '@/utils/colorConvert'
export function modifyCityMaterial(mesh: THREE.Mesh) {
  // onBeforeCompile 在编译shader程序之前立即执行的可选回调
  (mesh.material as THREE.Material).onBeforeCompile = (shader) => {
    // 裁剪空间坐标值 gl_Position:vec4    vertex 顶点着色器中获取
    // 裁剪空间颜色值 gl_FragColor:vec4    fragment 片元着色器
    setShaderVarible(shader)
    // 混合颜色
    mixColor(mesh,shader)

    // 添加建筑材质光波扩散特效
    addLightWave(shader)
    // 添加光线掠过特效
    addLightLine(shader)
    // console.log(shader.fragmentShader);
    // 添加建筑表面光线向上特效
    addToTopLine(shader);
 
  };
}
// 统一声明 shader 通用变量
const setShaderVarible = (shader:THREE.Shader) =>{
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
        #include <common>
        
        varying vec3 vPosition;
        `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      varying vec3 vPosition;
      `
  )
}
// 颜色混合 模型高度越高的部分颜色越浅  混合颜色，与白色混合， 高度越高，白色混合值越大
const mixColor = (mesh:THREE.Mesh,shader:THREE.Shader) => {
  // 基础颜色
  let color = rgb255To1(36, 172, 242, 1) 
  shader.uniforms.vColor = { value: [color.r, color.g, color.b, color.a] }// 接收数组  不能接受对象  对象形式传入报错 Failed to execute 'uniform4fv' on 'WebGL2RenderingContext'
  // 顶部颜色
  color = rgb255To1(241, 241, 241, 1)
  shader.uniforms.vTopColor = { value: [color.r, color.g, color.b, color.a] }
  // 高度绝对值
  mesh.geometry.computeBoundingBox();
  let { min, max } = mesh.geometry.boundingBox!;
  // // gl_Position.y 
  // mix(color1,color2,gl_Position.y) 
  let height = max.y - min.y; // 物体高度差
  shader.uniforms.vHeight = { value: height }


  shader.vertexShader = shader.vertexShader.replace(
    "#include <uv_vertex>",
    `
        #include <uv_vertex>
        vPosition = position;
    `
  );
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec4 vColor;
      uniform vec4 vTopColor;
      uniform float vHeight;
      `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <dithering_fragment>",
    `
      #include <dithering_fragment>
      vec4 color = vec4(vColor[0],vColor[1],vColor[2],vColor[3]);
      vec4 topColor = vec4(vTopColor[0],vTopColor[1],vTopColor[2],vTopColor[3]);
      vec3 mixColor = mix(color.rgb,topColor.rgb,(vPosition.y - vHeight/2.0)/vHeight);// 顶点所在高度  高度 越高，混合值越大
      gl_FragColor = vec4(mixColor,1);
      // #mixColorEnd
    `
  )
}

// 光圈从中心向外扩散
const addLightWave = (shader:THREE.Shader,center:THREE.Vector2 = new THREE.Vector2(0,0)) =>{
  // 设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: center };
  // 扩散的时间
  shader.uniforms.uSpreadTime = { value: -1000 };
  // 设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 400.0 };
  // 设置条带的颜色 在裁剪空间颜色值的基础上进行混合
  let color = rgb255To1(255, 255, 255,1);
  shader.uniforms.uColor = { value: new THREE.Vector4(color.r,color.g,color.b,color.a) };
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>
      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      uniform vec4 uColor;
      
      `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    "// #mixColorEnd",
    `
      // #mixColorEnd
      // 光圈半径 顶点位置到中心点的距离  
      float spreadRadius = distance(vPosition.xz,uSpreadCenter);

      //  扩散范围的函数  uSpreadTime 越大半径越大
      float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;
  
      // 扩散范围大于0 
      if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor,uColor,spreadIndex/uSpreadWidth);
      }
      // #lightWaveEnd
      `
  )

  // 动画循环 修改uSpreadTime的值 修改扩散半径
  gsap.to(shader.uniforms.uSpreadTime, {
    value: 800,
    duration: 2,
    ease: "none",
    repeat: -1,
  });



}



// 直线光带掠过城市效果
const addLightLine = (shader:THREE.Shader) =>{
    // 扩散的时间
    shader.uniforms.lightLineTime = { value: -1500 };
    // 设置条带的宽度
    shader.uniforms.lightLineWidth = { value: 200.0 };
    // 设置条带的颜色 在裁剪空间颜色值的基础上进行混合
    let color = rgb255To1(245, 221, 220,1);
    shader.uniforms.lightLineColor = { value: new THREE.Vector4(color.r,color.g,color.b,color.a) };
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <common>",
      `
        #include <common>
        uniform float lightLineTime;
        uniform float lightLineWidth;
        uniform vec4 lightLineColor;
        
        `
    )

    shader.fragmentShader = shader.fragmentShader.replace(
      `// #lightWaveEnd`,
      `
      // #lightWaveEnd
      float LightLineMix = -(vPosition.x+vPosition.z-lightLineTime)*(vPosition.x+vPosition.z-lightLineTime)+lightLineWidth;
      if(LightLineMix > 0.0){
          gl_FragColor =  mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /lightLineWidth);
          
      }
      // #lightLineEnd
      `
    )
    
    // shader.fragmentShader = shader.fragmentShader.replace(
    //   "// #lightWaveEnd",
    //   `
    //     // #lightWaveEnd
    //     // vPosition.x + lightLineTime
    //     // x轴大于0.5 渲染色2 小于0.5 渲染色1
    //     // gl_FragColor=  mix(gl_FragColor,vec4(0.8,1.0,1.0,1),step(0.5,vPosition.x)); 
        
     
    //     // gl_FragColor=  mix(gl_FragColor,vec4(0.8,1.0,1.0,1),vPosition.x/lightLineWidth/2.0 ); 
    //     // vec4 lightColor = vec4(0.8,1.0,1.0,1,0.2);
    //     // y = -x   y=-x+time
    //         float x = vPosition.x;
    //         float lighty = -x*1.2 + lightLineTime;// 该时间下，颜色进行修改的坐标y轴位置
    //         float alpha = abs(vPosition.y - lighty);
    //         // 应修改的位置与当前空间坐标位置差值小于0.1
    //         if(alpha < 0.1){
    //             float a = 1.0 -  alpha / 0.1;
    //             float enda = smoothstep(0.0,1.0,a) + 0.3;
    //             gl_FragColor =  mix(gl_FragColor,vec4(0.8,1.0,1.0,1),1.0-alpha);
    //         }
    //         // else{
    //         //     gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),0.3);
    //         // }



    //     // _index = fract(((_index-0.5)*2.0));
    //     // float LightLineMix = -(vPosition.x+vPosition.z-lightLineTime)*(vPosition.x+vPosition.z-lightLineTime)+lightLineWidth;
    //     // 小于零 混合函数混合出的是材质颜色值，不是光带颜色值
    //     // if(LightLineMix>0.0){
    //         // gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),lightLineWidth);
    //         // gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /lightLineWidth);
            
    //     // }

    //     // #lightLineEnd
    //   `
    // )
    // 动画循环 修改lSpreadTime的值 
    gsap.to(shader.uniforms.lightLineTime, {
      value: 1500,
      duration: 2,
      ease: "none",
      repeat: -1,
    });
}


function addToTopLine(shader:THREE.Shader,config:{color:string,width:number,time:number} = {color: '255,255,255,0.8',width:40,time:0.0}) {
  let { color,width,time } = config;
  //   扩散的时间
  shader.uniforms.uToTopTime = { value: time };
  //   设置条带的宽度
  shader.uniforms.uToTopWidth = { value: width };
  //   设置条带的颜色
  let rgba = rgb255To1(color);
  shader.uniforms.uToTopColor = { value:  new THREE.Vector4(rgba.r,rgba.g,rgba.b,rgba.a)};
  
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
          #include <common>
          uniform float uToTopTime;
          uniform float uToTopWidth;
          uniform vec4 uToTopColor;
          `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "// #lightLineEnd",
    `
    // #lightLineEnd
        float ToTopMix = -(vPosition.y-uToTopTime)*(vPosition.y-uToTopTime)+uToTopWidth;
    
        if(ToTopMix>0.0){
            gl_FragColor = mix(gl_FragColor,uToTopColor,ToTopMix /uToTopWidth);
            
        }
    
        //#toTopLineEnd#
        `
  );

  gsap.to(shader.uniforms.uToTopTime, {
    value: 500,
    duration: 3,
    ease: "none",
    repeat: -1,
  });
}




// const rgb255To1 = (r: number, g: number, b: number, a?: number) => {
//   return { r: r / 255, g: g / 255, b: b / 255, a }
// }