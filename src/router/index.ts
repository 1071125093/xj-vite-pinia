/*
 * @Author: HuangXiaojun
 * @Date: 2022-04-01 11:09:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-10 12:41:56
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/router/index.ts
 */
import { createRouter, RouteRecordRaw, Router, createWebHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/front',
    name: 'front',
    component: () => import('@/views/front/index.vue'),
    redirect: '',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'reborn',
        name: 'reborn',
        component: () => import('@/views/front/reborn/index.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/front',
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
