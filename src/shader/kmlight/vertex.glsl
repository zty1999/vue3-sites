// 表示顶点/片元着色器中所有浮点精度为低精度  精度必须放在对应声明前面  不然语法错误
precision lowp float;// 计算精度   lowp -2^8~2^8  mediump -2^10~2^10  highp -2^16~2^16

attribute vec3 position;
attribute vec2 uv;// 纹理坐标为UV
attribute vec4 a_color;// attribute声明顶点颜色变量

// 声明通用属性 外部传入的数据也使用uniform声明获取
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float time;// 动画时间



varying vec2 v_Uv;



void main () {
    v_Uv = uv;
    
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

}