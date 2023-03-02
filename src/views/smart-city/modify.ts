export  function modifyCityMaterial(mesh:THREE.Mesh) {
  // onBeforeCompile 在编译shader程序之前立即执行的可选回调
  (mesh.material as THREE.Material).onBeforeCompile = (shader) => {
    console.log(shader);
    console.log(shader.fragmentShader);
    // 裁剪空间坐标值 gl_Position:vec4
    // 裁剪空间颜色值 gl_FragColor:vec4
    // 修改颜色
    // 基础颜色
    let {r,g,b,a} = rgb255To1(244, 211, 19,1)
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `
      #include <dithering_fragment>
      gl_FragColor = vec4(${r},${g},${b},${a});
      vec4 topColor = vec4(0.149,0.141,0.912,1);
      vec3 mixColor = mix(gl_FragColor.rgb,topColor.rgb,0.5);
      gl_FragColor = vec4(mixColor,1);
      ` 
    )
    // 颜色混合
    // 模型高度越高的部分颜色越浅  混合颜色，与白色混合， 高度越高，白色混合值越大
    mesh.geometry.computeBoundingBox();
    let { min, max } = mesh.geometry.boundingBox!;
    
    // float height = abs(min.y) + abs(max.y) // 总高度
    // // gl_Position.y // 顶点所在高度  高度 越高，混合值越大
    // mix(color1,color2,gl_Position.y)



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

// 取值范围为0-255之间的rgb值转换成0-1
const rgb255To1 = (r:number,g:number,b:number,a?:number) =>{
  return {r:r/255,g:g/255,b:b/255,a}
}