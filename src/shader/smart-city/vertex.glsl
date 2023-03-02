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
varying vec4 v_color;//varying声明顶点颜色插值后变量
varying float deep;
void main () {
    //顶点颜色插值计算
    // v_color = (1.0,0.0,0.0,1);
    // uv的值给到
    v_Uv = uv;
    // 声明待绘制的位置
    // position 属性 不可直接修改
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 );
    // modelPosition.x += 1.0;
    // modelPosition.z += modelPosition.x;

    // 数值精细程度和几何体顶点数量控制形状扭曲度
    modelPosition.z = sin((modelPosition.x + time)  * 10.0) * 0.05;
    modelPosition.z += sin((modelPosition.y + time) * 10.0) * 0.05;
    deep = modelPosition.z;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ) ;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // 声明待绘制的点的大小
    // gl_PointSize = 10.0;
}