import { RouteRecordRaw } from "vue-router";

export const noteRoute: RouteRecordRaw = {
  path: '/note',
  name: 'note demos',
  meta: {
    hideInMenu: false,
    notCache: true,
    title: 'note demos',
    icon: 'ep-menu',
  },
  children: [
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