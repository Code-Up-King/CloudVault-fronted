import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/views/index.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout
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
