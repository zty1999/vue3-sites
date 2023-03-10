import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router';


import { App } from 'vue';
import * as text from "../locales"

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
  // {
  //   path: '/snow-flake',
  //   name: 'snow-flake',
  //   // component: () => import('@/components/three-particles/snow-flake.vue'),
  //   component: () => import('@/views/snow-flake.vue'),
  //   meta: {

  //   },

  // },
  {
    path: '/three',
    name: 'Three',
    component: () => import('@/views/Three.vue'),
    meta: {

    },

  },
  {
    path: '/3d-scroll',
    name: '3d-scroll',
    component: () => import('@/views/3d-scroll/3d-scroll.vue'),
    meta: {

    },

  },
  {
    path: '/3d-text',
    name: '3d-text',
    component: () => import('@/views/3d-text.vue'),
    meta: {

    },

  },
  {
    path: '/physics',
    name: 'physics',
    component: () => import('@/views/physics.vue'),
    meta: {

    },

  },
  {
    path: '/shader',
    name: 'shader',
    meta: {

    },
    children: [
      {
        path: 'basic',
        name: 'basic',
        component: () => import('@/views/shader/basic.vue'),
        meta: {

        },

      },
      {
        path: 'create-pattern',
        name: 'create-pattern',
        component: () => import('@/views/shader/create-pattern.vue'),
        meta: {

        },

      },
      {
        path: 'kongming-lantern',
        name: 'kongming-lantern',
        component: () => import('@/views/shader/kongming-lantern.vue'),
        meta: {

        },

      },
    ]

  },
  {
    path: '/earth-moon-rotation',
    name: 'earth-moon-rotation',
    component: () => import('@/views/earth-moon-rotation.vue'),
    meta: {

    },

  },
  {
    path: '/smart-city',
    name: 'smart-city',
    component: () => import('@/views/smart-city/smart-city.vue'),
    meta: {

    },

  },
  {
    path: '/image-to-particles',
    name: 'image-to-particles',
    component: () => import('@/views/image-to-particles/image-to-particles.vue'),
    meta: {

    },

  },
  // 3d地球 飞线
  {
    path: '/3d-earth',
    name: '3d-earth',
    component: () => import('@/views/3d-earth/3d-earth.vue'),
    meta: {

    },

  },
  {
    path: '/note',
    name: 'note',
    component: () => import('@/views/note/note.vue'),
    meta: {

    },
    children: [
      {
        path: '/note-list',
        name: 'note-list',
        component: () => import('@/views/note/note-list.vue'),
        meta: {

        },

      },
      {
        path: '/note-edit',
        name: 'note-edit',
        component: () => import('@/views/note/note-edit.vue'),
        meta: {

        },

      },
    ]

  },


]



// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];



const routes = [RootRoute, ...ThreejsRoutes]

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
