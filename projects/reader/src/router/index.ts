import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/css/nprogress.css' // 进度条样式

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/',
    component: () => import('../views/LayOut.vue'),
    children:[
      {
        path: 'home',
        name: 'home',
        meta: { hidden: true,title: '书城', },
        component: () => import('../views/Home.vue')
      },
      
    ]
  },
  {
    path: '/book-detail/:id',
    name: 'book-detail',
    meta: { hidden: true,title: '书籍详情', },
    component: () => import('../views/book/BookDetail.vue')
  },
  {
    path: '/book-chapter/:id',
    name: 'book-chapter',
    meta: { hidden: true,title: '章回列表', },
    component: () => import('../views/book/BookChapter.vue')
  },
  {
    path: '/book-reader/:id',
    name: 'book-reader',
    meta: { hidden: true,title: '', },
    component: () => import('../views/book/BookReader.vue')
  }
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/visual-editor/index.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(() => {
  // NProgress.start() // start progress bar
  return true
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})

export default router
