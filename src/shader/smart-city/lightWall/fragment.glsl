// 表示顶点/片元着色器中所有浮点精度为低精度  精度必须放在对应声明前面  不然语法错误
precision mediump float;// 计算精度   lowp -2^8~2^8  mediump -2^10~2^10  highp -2^16~2^16

// 声明通用属性 外部传入的数据也使用uniform声明获取
uniform float uHeight;
uniform vec3 uColor;

varying vec3 vPosition;
void main(){
  // 设置混合的百分比
  float gradMix = (vPosition.y+uHeight/2.0)/uHeight;
  gl_FragColor = vec4(uColor,1.0-gradMix);

}