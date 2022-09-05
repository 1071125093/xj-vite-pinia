/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 21:02:39
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-05 10:45:48
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/global.d.ts
 */

declare namespace global {
  type MyType = number | string
  type MyTypeB = boolean | boolean[]
  type Size = 'small' | 'medium' | 'large'
}
declare module 'vuedraggable'
declare module 'd3' {
  const content: any
  export = content
}
