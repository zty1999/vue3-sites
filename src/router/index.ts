import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';
import { threejsRoute } from "./modules/threejs"
import { App } from 'vue';
import NProgress from "@/utils/progress";
import { config } from '@/config';
import { openWindow } from './util';
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

// export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
//   name: string;
//   meta: RouteMeta;
//   component?: Component | string;
//   components?: Component;
//   children?: AppRouteRecordRaw[];
//   props?: any;
//   fullPath?: string;
// }
// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/three',
  meta: {
    title: 'Root'
  }
};

export const MainRoutes: AppRouteRecordRaw[] = [

  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main/Main.vue'),
    meta: {

    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {

    },

  },
  {
    path: '/demos',
    name: 'Demos',
    component: () => import('@/views/Demos.vue'),
    meta: {

    },

  },
  {
    path: '/blog',
    name: 'blog',
    meta: {
      extraLink: "https://blog.intheway.cloud",
    },
  },


]



// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];



const routes: Array<AppRouteRecordRaw >= [RootRoute, ...MainRoutes,threejsRoute]

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
  routes :routes as unknown as RouteRecordRaw[],
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

/**
 * 公共路由守卫
 */
router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar
  const title = to.meta && (to.meta.title as string);
  document.title = title?config.title + title:config.title;
  // 外链 直接打开外链会被浏览器拦截  需点击事件触发
  // if(to.meta.extraLink){
  //   openWindow(to.meta.extraLink as string);
  // }else {
  //   next();
  // }
  next();
  // return true
});
router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}
