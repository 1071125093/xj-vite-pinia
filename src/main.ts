/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-08 19:12:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import { piniaInstall } from './store'
import router from './router/index'
import directives from './directives'
const app = createApp(App)

piniaInstall(app)

app.use(router).use(directives).mount('#app')
