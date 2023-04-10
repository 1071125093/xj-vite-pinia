/*
 * @Author: XiaoJun
 * @Date: 2023-03-15 14:57:55
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 18:45:18
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/interface/utils/index.d.ts
 */

declare namespace U {
  /** 获取数组中元素的类型 */
  type GetType<T> = T extends (infer R)[] ? R : never

  /** 获取对象中属性的类型 */
  type GetTypeFromObj<T, K> = Pick<T, K>[K]

  /** 获取所有的键枚举 没啥用 不如手写 */
  // type Keys<T> = keyof T
  type UnionKeys<P> = P extends infer T ? keyof T : never
  /** 获取所有的值类型 */
  type Values<T> = T[keyof T]
}
/** 接口类 */
declare namespace I {}
