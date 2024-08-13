import { createRouter, createWebHistory } from 'vue-router'
import userInfoStore from '@/stores/user'
import Layout from "@/views/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/all',
      children: [
        {
          path: '/home',
          redirect: '/home/all',
          component: Layout,
          meta: { title: '首页', belong: 'home' },
          children: [
            {
              path: 'all',
              name: 'All',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '全部', belong: 'home' },
            },
            {
              path: 'video',
              name: 'Video',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '视频', belong: 'home' },
            },
            {
              path: 'music',
              name: 'Music',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '音频', belong: 'home' },
            },
            {
              path: 'image',
              name: 'Image',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '图片', belong: 'home' },
            },
            {
              path: 'doc',
              name: 'Doc',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '文档', belong: 'home' },
            },
            {
              path: 'other',
              name: 'Other',
              component: () => import('@/views/Home/index.vue'),
              meta: { title: '其他', belong: 'home' },
            },
          ]
        },
        {
          path: '/share',
          redirect: '/share/record',
          component: Layout,
          meta: { title: '分享', belong: 'share' },
          children: [{
            path: 'record',
            name: 'SRecord',
            component: () => import('@/views/Test.vue'),
            meta: { title: '分享记录', belong: 'share' },
          }]
        },
        {
          path: '/recycle',
          redirect: '/recycle/record',
          component: Layout,
          meta: { title: '回收站', belong: 'recycle' },
          children: [{
            path: 'record',
            name: 'RRecord',
            component: () => import('@/views/Test.vue'),
            meta: { title: '删除的文件', belong: 'recycle' },
          }]
        },
        {
          path: '/set',
          redirect: '/set/file',
          component: Layout,
          meta: { title: '设置', belong: 'set' },
          children: [{
            path: 'file',
            name: 'File',
            component: () => import('@/views/Test.vue'),
            meta: { title: '用户文件', belong: 'set' },
          }, {
            path: 'user',
            name: 'User',
            component: () => import('@/views/Test.vue'),
            meta: { title: '用户管理', belong: 'set' },
          }, {
            path: 'system',
            name: 'System',
            component: () => import('@/views/Test.vue'),
            meta: { title: '系统管理', belong: 'set' },
          }]
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 未登录
  if (!sessionStorage.token && to.path != '/login') {
    return next({ path: '/login' })
  }
  // 已登录
  if (sessionStorage.token && to.path == '/login') {
    return next({ path: from.path ? from.path : '/' })
  }
  // 是否存在TODO
  if (sessionStorage.token) {
    const whiteList = userInfoStore().whiteList
    // console.log(whiteList);
    // if (whiteList.findIndex(item => item.path == to.path) == -1) {
    //   return next({path: '/'})
    // }
  }
  next()
});

export default router
