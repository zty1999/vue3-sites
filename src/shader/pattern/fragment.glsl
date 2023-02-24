// 表示顶点/片元着色器中所有浮点精度为低精度  精度必须放在对应声明前面  不然语法错误
precision lowp float;// 计算精度   lowp -2^8~2^8  mediump -2^10~2^10  highp -2^16~2^16

uniform float time;// 动画时间
uniform float scale;// 波浪的幅度


varying vec2 v_Uv;

#define PI 3.1415926535897932384626433832795

// 随机函数
float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

// 旋转函数
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

// 噪声函数
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main(){
  // 通过顶点对应的uv(坐标位置)，决定每一个像素在uv图像的位置，通过这个位置决定渲染的颜色
  // gl_FragColor =  vec4(v_Uv,0.0,1.0);
  gl_FragColor =  vec4(v_Uv,1.0,1.0);

  // 1. 利用uv实现渐变效果  
  // 1.1 渐变效果  从左到右
  // float strength = v_Uv.x;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 1.2 渐变效果  从上到下
  // float strength = v_Uv.y;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 1.3 渐变效果  从右到左
  // float strength = 1.0 - v_Uv.x;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 1.4 渐变效果  从下到上
  // float strength = 1.0 - v_Uv.y;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 1.5 渐变效果  调整渐变开始位置
  // float strength = v_Uv.y * 10.0;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 1.6 渐变效果  通过取模实现反复渐变  百叶窗
  // float strength = mod(v_Uv.y * 10.0,1.0);
  // gl_FragColor =  vec4(strength,strength,strength,1.0);



  // 2. 条纹效果  通过step函数实现条纹效果 step(edge,x) x<edge=>0.0 x>edge=>1
  // 2.1 水平条纹效果
  // float strength = mod(v_Uv.y * 10.0,1.0);
  // strength = step(0.3,strength);
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 2.2 竖直条纹效果  
  // float strength = mod(v_Uv.x * 10.0,1.0);
  // strength = step(0.3,strength);
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 2.3 条纹相加网格效果  
  // float strength = step(0.8,mod(v_Uv.x * 10.0,1.0));
  // strength += step(0.8,mod(v_Uv.y * 10.0,1.0));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 2.4 条纹相乘 瓷砖效果  step(edge,x)  edge值调整形成点状/瓷砖效果
  // float strength = step(0.1,mod(v_Uv.x * 10.0,1.0));
  // strength *= step(0.1,mod(v_Uv.y * 10.0,1.0));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);
  

  // 2.5 条纹相减 虚线效果 
  // float strength = step(0.8,mod(v_Uv.x * 10.0,1.0));
  // strength -= step(0.8,mod(v_Uv.y * 10.0,1.0));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);


  // 3. 值调整形成除方块条纹外的其它形状
  // 3.1 值调整形成除方块条纹外的其它形状
  // float barx = step(0.4,mod(v_Uv.x * 10.0,1.0)) * step(0.8,mod(v_Uv.y+time*0.1 * 10.0,1.0));
  // float bary = step(0.4,mod(v_Uv.y * 10.0,1.0)) * step(0.8,mod(v_Uv.x+time*0.1 * 10.0,1.0));
  // float strength = barx + bary;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.2 传入动态数据让图形滚动
  // float barx = step(0.4,mod(v_Uv.x+time*0.1 * 10.0,1.0)) * step(0.8,mod(v_Uv.y+time*0.1 * 10.0,1.0));
  // float bary = step(0.4,mod(v_Uv.y+time*0.1 * 10.0,1.0)) * step(0.8,mod(v_Uv.x+time*0.1 * 10.0,1.0));
  // float strength = barx + bary;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.3 T形图
  // float barx = step(0.4,mod(v_Uv.x * 10.0 - 0.2,1.0)) * step(0.8,mod(v_Uv.y * 10.0,1.0));
  // float bary = step(0.4,mod(v_Uv.y * 10.0,1.0)) * step(0.8,mod(v_Uv.x * 10.0,1.0));
  // float strength = barx + bary;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.4 T形图彩色
  // float barx = step(0.4,mod(v_Uv.x * 10.0 - 0.2,1.0)) * step(0.8,mod(v_Uv.y * 10.0,1.0));
  // float bary = step(0.4,mod(v_Uv.y * 10.0,1.0)) * step(0.8,mod(v_Uv.x * 10.0,1.0));
  // float strength = barx + bary;
  // gl_FragColor =  vec4(v_Uv,strength,1.0);

  // 3.5 利用绝对值
  // // float strength = v_Uv.x - 0.5;
  // float strength = abs(v_Uv.x - 0.5);
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.6 十字架/交叉效果 光暗调节
  // // // float strength = min(abs(v_Uv.x - 0.5),abs(v_Uv.y - 0.5));
  // // float strength = max(abs(v_Uv.x - 0.5),abs(v_Uv.y - 0.5));
  // float strength = 1.0 - max(abs(v_Uv.x - 0.5),abs(v_Uv.y - 0.5));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);  

  // 3.7 中空 回字形
  // float strength = step(0.2,max(abs(v_Uv.x - 0.5),abs(v_Uv.y - 0.5)));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);


  // 3.8 利用取整实现阶段性图形变换 条纹渐变
  // float strength = floor(v_Uv.x*10.0)/10.0;
  // gl_FragColor =  vec4(strength,strength,strength,1.0);



  // 3.9 随机效果
  // float strength = random(v_Uv);
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.9 随机格子
  // float strength = ceil(v_Uv.x*10.0)/10.0*ceil(v_Uv.y*10.0)/10.0;
  // strength = random(vec2(strength,strength));
  // gl_FragColor =  vec4(strength,strength,strength,1.0);

  // 3.10 依据length返回向量长度
  // float strength = length(v_Uv);
  // gl_FragColor =vec4(strength,strength,strength,1);


  // 3.11 根据distance计算2个向量的距离
  // float strength =1.0 - distance(v_Uv,vec2(0.5,0.5));
  // gl_FragColor =vec4(strength,strength,strength,1);


  // 3.12 根据相除，实现光点
  // float strength = 0.15 / distance(v_Uv,vec2(0.5,0.5)) - 0.2;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.13 十字交叉的星星
  // float  strength = 0.15 / distance(vec2(v_Uv.x,(v_Uv.y-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
  // strength += 0.15 / distance(vec2(v_Uv.y,(v_Uv.x-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.14 旋转飞镖，旋转uv
  // vec2 rotateUv = rotate(v_Uv,3.14*0.25,vec2(0.5));
  // rotateUv = rotate(v_Uv,-time*5.0,vec2(0.5));
  // float  strength = 0.15 / distance(vec2(rotateUv.x,(rotateUv.y-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
  // strength += 0.15 / distance(vec2(rotateUv.y,(rotateUv.x-0.5)*5.0+0.5),vec2(0.5,0.5)) - 1.0;
  // gl_FragColor =vec4(strength,strength,strength,1.0);



  // 3.14 圆孔方块
  // float strength = step(0.5,distance(v_Uv,vec2(0.5))+0.25) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

    

  // 3.15 绘制圆
  // float strength = 1.0 - step(0.5,distance(v_Uv,vec2(0.5))+0.25) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.16 圆环
  // float strength = step(0.5,distance(v_Uv,vec2(0.5))+0.35) ;
  // strength *= (1.0 - step(0.5,distance(v_Uv,vec2(0.5))+0.25)) ;
  // gl_FragColor =vec4(strength,strength,strength,1);
  // or
  // float strength = 1.0 - step(0.1,abs(distance(v_Uv,vec2(0.5))-0.25))   ;
  // gl_FragColor =vec4(strength,strength,strength,1);
    
  // 3.17 渐变环
  // float strength =  abs(distance(v_Uv,vec2(0.5))-0.25) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.18 打靶
  // float strength = step(0.1,abs(distance(v_Uv,vec2(0.5))-0.25))   ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.19 波浪环
  // vec2 waveUv = vec2(
  //     v_Uv.x,
  //     v_Uv.y+sin(v_Uv.x*30.0)*0.1
  // );
  // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.20 一滩水
  // vec2 waveUv = vec2(
  //     v_Uv.x+sin(v_Uv.y*30.0)*0.1,
  //     v_Uv.y+sin(v_Uv.x*30.0)*0.1
  // );
  // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
  // gl_FragColor =vec4(strength,strength,strength,1);


  // 3.21
  // vec2 waveUv = vec2(
  //     v_Uv.x+sin(v_Uv.y*100.0)*0.1,
  //     v_Uv.y+sin(v_Uv.x*100.0)*0.1
  // );
  // float strength = 1.0 - step(0.01,abs(distance(waveUv,vec2(0.5))-0.25))   ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.22 根据角度显示视图
  // float angle = atan(v_Uv.x,v_Uv.y);
  // float strength = angle;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.23 根据角度实现螺旋渐变
  // float angle = atan(v_Uv.x-0.5,v_Uv.y-0.5);
  // float strength = (angle+3.14)/6.28;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.24 实现雷达扫射
  // float alpha =  1.0 - step(0.5,distance(v_Uv,vec2(0.5)));
  // float angle = atan(v_Uv.x-0.5,v_Uv.y-0.5);
  // float strength = (angle+3.14)/6.28;
  // gl_FragColor =vec4(strength,strength,strength,alpha);

  // 3.25 通过时间实现动态旋转
  // vec2 rotateUv = rotate(v_Uv,3.14*0.25,vec2(0.5));
  // rotateUv = rotate(v_Uv,-time*5.0,vec2(0.5));
  // float alpha =  1.0 - step(0.5,distance(v_Uv,vec2(0.5)));
  // float angle = atan(rotateUv.x-0.5,rotateUv.y-0.5);
  // float strength = (angle+3.14)/6.28;
  // gl_FragColor =vec4(strength,strength,strength,alpha);

  // 3.26 万花筒
  // float angle = atan(v_Uv.x-0.5,v_Uv.y-0.5)/PI;
  // float strength = mod(angle*10.0,1.0);
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.27 光芒四射
  // float angle = atan(v_Uv.x-0.5,v_Uv.y-0.5)/(2.0*PI);
  // float strength = sin(angle*100.0);
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 3.28 使用噪声实现烟雾、波纹效果
  // float strength = noise(v_Uv);
  // gl_FragColor =vec4(strength,strength,strength,1);
  // strength = noise(v_Uv * 10.0);
  // gl_FragColor =vec4(strength,strength,strength,1);
  // strength = step(0.5,noise(v_Uv * 100.0)) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 通过时间设置波形
  // float strength = step(scale,cnoise(v_Uv * 10.0+time)) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // float strength = abs(cnoise(v_Uv * 10.0)) ;
  // gl_FragColor =vec4(strength,strength,strength,1);


  // 发光路径
  // float strength =1.0 - abs(cnoise(v_Uv * 10.0)) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // 波纹效果
  // float strength = sin(cnoise(v_Uv * 10.0)*5.0+time) ;
  // gl_FragColor =vec4(strength,strength,strength,1);

  // float strength = step(0.9,sin(cnoise(v_Uv * 10.0)*20.0))  ;
  // gl_FragColor =vec4(strength,strength,strength,1);
  

    // 使用混合函数混颜色
    vec3 purpleColor = vec3(1.0, 0.0, 1.0);
    vec3 greenColor = vec3(1.0, 1.0, 1.0);
    vec3 uvColor = vec3(v_Uv,1.0);
    float strength = step(0.9,sin(cnoise(v_Uv * 10.0)*20.0))  ;


    vec3 mixColor =  mix(greenColor,uvColor,strength);
    // gl_FragColor =vec4(mixColor,1.0);
    gl_FragColor =vec4(mixColor,1.0);

}