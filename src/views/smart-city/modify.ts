import * as THREE from "three";
import gsap from "gsap"
export function modifyCityMaterial(mesh: THREE.Mesh) {
  // onBeforeCompile 在编译shader程序之前立即执行的可选回调
  (mesh.material as THREE.Material).onBeforeCompile = (shader) => {
    console.log(shader);
    // 裁剪空间坐标值 gl_Position:vec4    vertex 顶点着色器中获取
    // 裁剪空间颜色值 gl_FragColor:vec4    fragment 片元着色器
    setShaderVarible(shader)
    // 混合颜色
    mixColor(mesh,shader)

    // 添加建筑材质光波扩散特效
    addLightWave(shader)
    // 添加光线掠过特效
    addLightLine(shader)
    console.log(shader.fragmentShader);

    // console.log(shader.vertexShader);
    // console.log(shader.fragmentShader);
    // shader.fragmentShader = shader.fragmentShader.replace(
    //   "#include <dithering_fragment>",
    //   `
    //     #include <dithering_fragment>
    //     //#end#
    // `
    // );
    // addGradColor(shader, mesh);
    // addSpread(shader);
    // addLightLine(shader);
    // addToTopLine(shader);
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
  let color = rgb255To1(245, 221, 220,1);
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
    // shader.fragmentShader = shader.fragmentShader.replace(
    //   "// #lightWaveEnd",
    //   `
    //     // #lightWaveEnd
    //     // _index = fract(((_index-0.5)*2.0));
    //     float LightLineMix = -(vPosition.x+vPosition.z-lightLineTime)*(vPosition.x+vPosition.z-lightLineTime)+lightLineWidth;
  
    //     if(LightLineMix>0.0){
    //         gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /lightLineWidth);
            
    //     }

    //     // #lightLineEnd
    //   `
    // )
    // 动画循环 修改lSpreadTime的值 
    gsap.to(shader.uniforms.lSpreadTime, {
      value: 1500,
      duration: 2,
      ease: "none",
      repeat: -1,
    });
}





// 取值范围为0-255之间的rgb值转换成0-1
const rgb255To1 = (r: number, g: number, b: number, a?: number) => {
  return { r: r / 255, g: g / 255, b: b / 255, a }
}