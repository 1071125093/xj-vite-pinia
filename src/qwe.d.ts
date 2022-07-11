/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 21:55:58
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 22:01:27
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/qwe.d.ts
 */
import BlockTitle from './components/blockTitle/index.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BlockTitle: typeof BlockTitle
  }
}
