// 表示顶点/片元着色器中所有浮点精度为低精度  精度必须放在对应声明前面  不然语法错误
precision lowp float;// 计算精度   lowp -2^8~2^8  mediump -2^10~2^10  highp -2^16~2^16

uniform sampler2D texture;// 接收图片纹理


varying vec2 v_Uv; 
varying float deep;

// 接收顶点着色器中v_color数据
// varying vec4 v_color;
void main(){
  float shadow = deep + 0.05 * 10.0;
  // gl_FragColor = vec4(1.0,0.0,0.0,1);
  // gl_FragColor = texture2D(texture,vec2(v_Uv.x,v_Uv.y));
  // gl_FragColor =  vec4(v_Uv,0.0,1.0);
  // gl_FragColor =  vec4(1.0 * shadow,0.0,0.0,1.0);

  // 根据 uv 取出对应的颜色
  vec4 textureColor = texture2D(texture,v_Uv);
  textureColor.rgb *= shadow;
  gl_FragColor =  textureColor;


}