3d渲染场景
- 渲染背景
- 城市模型
  - 模型线框
  - 模型材质
    - 模型高度越高的部分颜色越浅  混合颜色，与白色混合， 高度越高，白色混合值越大
  - 模型动画
    - 1. 光圈从中心向外扩散    
      - 扩散起始位置 ：中心 可配置
      - 时间增加 扩散直径变大
      - 光圈宽度可配置
      - 光圈，时间变化，直径变大   时间变化，颜色为xx的 x,y 值变大
    - 2. 直线光带掠过城市效果
      - 当前顶点颜色   时间变大 混合值变高
    - 3. 建筑表面 光带向上动画
      - y > 0 随时间变化 当前颜色反色
    - 4. 飞线动画
      - 创建曲线 根据曲线创建管道几何体  设置贴图大小 动画修改贴图偏移量
    - 5. 雷达动画
      - 圆形 轴线旋转动画 颜色渐变  
    - 6. 光墙动画
      - 圆形光圈环绕  直径波动  

html交互
- html展示 叠加层
- 状态展示
- 事件列表

