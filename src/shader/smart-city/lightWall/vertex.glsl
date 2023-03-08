// 表示顶点/片元着色器中所有浮点精度为低精度  精度必须放在对应声明前面  不然语法错误
precision lowp float;// 计算精度   lowp -2^8~2^8  mediump -2^10~2^10  highp -2^16~2^16

// attribute vec2 uv;// 纹理坐标为UV
attribute vec4 a_color;// attribute声明顶点颜色变量





varying vec4 v_color;//varying声明顶点颜色插值后变量
varying vec3 vPosition;
void main () {
    
    gl_Position = projectionMatrix * viewMatrix * modelMatrix *vec4(position,1.0);
    vPosition = position;

}