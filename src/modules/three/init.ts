import cameraModule from "./camera";
import { renderer } from "./renderer";
// import cameraModule from "./camera";
// import rendererModule from "./renderer";
import { useResize } from "@/hooks/useResize";
import { useEventListener } from "@/hooks/useEventListener";


useEventListener('resize',() => {
    // 监听画面变化，更新渲染画面
      console.log("画面变化了");
    // 更新摄像头
    cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵 在摄像机任何参数被改变以后必须被调用
    cameraModule.activeCamera.updateProjectionMatrix();

    // 更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);

})
// // 更新摄像头
// cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
// //   更新摄像机的投影矩阵
// cameraModule.activeCamera.updateProjectionMatrix();

// // 监听屏幕大小改变的变化，设置渲染的尺寸
// window.addEventListener("resize", () => {
//   //   console.log("resize");
//   // 更新摄像头
//   cameraModule.activeCamera.aspect = window.innerWidth / window.innerHeight;
//   //   更新摄像机的投影矩阵
//   cameraModule.activeCamera.updateProjectionMatrix();

//   //   更新渲染器
//   rendererModule.renderer.setSize(window.innerWidth, window.innerHeight);
//   //   设置渲染器的像素比例
//   rendererModule.renderer.setPixelRatio(window.devicePixelRatio);
//   // 更新cssrender
//   rendererModule.css3drender.setSize(window.innerWidth, window.innerHeight);
// });



