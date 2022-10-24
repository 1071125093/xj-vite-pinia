/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-21 13:06:49
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import { pinia } from './store'
import router from './router/index'
import directives from './directives'
import print from 'vue3-print-nb'
createApp(App).use(pinia).use(router).use(print).use(directives).mount('#app')
