import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';


import { App } from 'vue';
import * as text from  "../locales"

// // import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
// const modules = import.meta.glob('./modules/**/*.ts', { eager: true });
// const routeModuleList: AppRouteModule[] = [];

// // 加入到路由集合中
// Object.keys(modules).forEach((key) => {
//   const mod = (modules[key] as any).default || {};
//   const modList = Array.isArray(mod) ? [...mod] : [mod];
//   routeModuleList.push(...modList);
// });

// export const asyncRoutes = [...routeModuleList];

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/main',
  meta: {
    title: 'Root'
  }
};

export const ThreejsRoutes: RouteRecordRaw[] = [
  {
    path: '/threejs',
    name: 'Threejs',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      title: text.router.dashboard
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    meta: {

    }
  },
  {
    path: '/demos',
    name: 'Demos',
    component: () => import('@/views/Demos.vue'),
    meta: {

    },

  },
  {
    path: '/snow-flake',
    name: 'snow-flake',
    // component: () => import('@/components/three-particles/snow-flake.vue'),
    component: () => import('@/views/snow-flake.vue'),
    meta: {

    },

  },
  {
    path: '/three',
    name: 'Three',
    component: () => import('@/views/Three.vue'),
    meta: {

    },
    
  },

]



// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];



const routes = [RootRoute,...ThreejsRoutes]

// export const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// });
// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录。
  // history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  // routes: basicRoutes as unknown as RouteRecordRaw[],
  routes,
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
