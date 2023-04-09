import { RouteRecordRaw } from "vue-router";

export const threejsRoute: RouteRecordRaw = {
  path: '/three',
  name: 'threejs demos',
  meta: {
    hideInMenu: false,
    notCache: true,
    title: 'threejs demos',
    icon: 'ep-menu',
  },
  children: [
    {
      path: '/image-to-particles',
      name: 'image-to-particles',
      meta: {
        hideInMenu: false,
        title: '横向滚动',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/image-to-particles/image-to-particles.vue'),
    },
    {
      path: '/haunted-house',
      name: 'haunted-house',
      meta: {
        hideInMenu: false,
        title: '鬼屋',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/haunted-house/haunted-house.vue'),
    },
  ]
}