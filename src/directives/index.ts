/*
 * @Author: HuangXiaojun
 * @Date: 2022-06-17 11:21:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 09:35:16
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/directives/index.ts
 */
import { App } from 'vue'
import dateFormat from './dateFormat/dateFormat'
export default {
  install(app: App) {
    const directives = {
      dateFormat,
    }
    for (let key in directives) {
      app.directive(key, (directives as any)[key])
    }
  },
}
