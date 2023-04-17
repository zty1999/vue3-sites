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
      path: '/three',
      name: 'dashboard',
      component: () => import('@/views/threejs/Three.vue'),
      meta: {
        title: 'dashboard'
      }
    },
    {
      path: 'starry-sky',
      name: 'starry-sky',
      meta: {
        hideInMenu: false,
        title: '星空',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/particles/starry-sky.vue'),
    },
    {
      path: 'snow-flake',
      name: 'snow-flake',
      meta: {
        hideInMenu: false,
        title: '雪花',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/particles/snow-flake.vue'),
    },
    {
      path: 'spiral-galaxy',
      name: 'spiral-galaxy',
      meta: {
        hideInMenu: false,
        title: '臂旋星系',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/particles/spiral-galaxy.vue'),
    },
    {
      path: 'image-to-particles',
      name: 'image-to-particles',
      meta: {
        hideInMenu: false,
        title: '图片粒子化',
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
    {
      path: 'car-showroom',
      name: 'car-showroom',
      meta: {
        hideInMenu: false,
        title: '3d汽车展厅',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/car-showroom/car-showroom.vue'),
    },
    {
      path: 'image-transition',
      name: 'image-transition',
      meta: {
        hideInMenu: false,
        title: '图片转换粒子特效',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/views/threejs/image-transition/image-transition.vue'),
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
    // 3d地球 飞线
    {
      path: '/3d-earth',
      name: '3d-earth',
      component: () => import('@/views/3d-earth/3d-earth.vue'),
      meta: {

      },

    },
    // 智慧园区
    {
      path: '/smart-park',
      name: 'smart-park',
      component: () => import('@/views/smart-park/smart-park.vue'),
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

    }
  ]
}