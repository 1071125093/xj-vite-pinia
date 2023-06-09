/*
 * @Author: XiaoJun
 * @Date: 2022-08-08 15:14:55
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-23 16:09:58
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/env.d.ts
 */
/// <reference types="vite/client" />
// / <reference types="vue/macros-global" />
export {}
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
