// /**
//  * @Author: XiaoJun
//  * @Date: 2023-04-19 13:06:26
//  * @LastEditors: XiaoJun
//  * @LastEditTime: 2023-08-04 17:46:44
//  * @Description: I C U 集合
//  * @FilePath: /xj-vite-pinia/src/types/common.d.ts
//  */
// /** interface */
// declare namespace I {
//   // 地基
//   interface PropAny {
//     [propName: string]: any
//   }
//   type PropAnyAble<T> = {
//     [key in keyof T]: T[key]
//   } & PropAny
// }
// /** common */
// declare namespace C {
//   type baseResponse<T> = {
//     code: number
//     data?: T
//     error: boolean
//     success: boolean
//     message: string
//   }
//   type ListDataResponse<T = any> = {
//     records?: T[]
//     total: number
//     size: number
//     current: number
//     orders?: any[]
//     searchCount?: boolean
//     maxLimit: any
//     countId?: any
//     pages?: number
//   }
//   type RuleType =
//     | 'string'
//     | 'number'
//     | 'boolean'
//     | 'method'
//     | 'regexp'
//     | 'integer'
//     | 'float'
//     | 'array'
//     | 'object'
//     | 'enum'
//     | 'date'
//     | 'url'
//     | 'hex'
//     | 'email'
//     | 'pattern'
//     | 'any'
//   // type Fun<T> = () => T
// }

// /** utils */
// declare namespace U {
//   /** 获取数组中元素的类型 */
//   type GetType<T> = T extends (infer R)[] ? R : never

//   /** 获取对象中属性的类型 */
//   type GetTypeFromObj<T, K> = Pick<T, K>[K]

//   /** 获取所有的键枚举 没啥用 不如手写 */
//   // type Keys<T> = keyof T

//   /** 获取所有的值类型 */
//   type Values<T> = T[keyof T]

//   type LimitedKeyArr<T> = Array<
//     {
//       key: keyof T
//     } & I.PropAny
//   >
//   type LimitedKeyObj<T> = {
//     [keyof in T]: any
//   }

//   type MaybeArray<T> = T | Array<T>

//   // 类型推导
//   type XjTestType<T> = {
//     [K in keyof T]: {
//       type: K
//       data: T[K]
//     }
//   }[keyof T]

//   type XjTestTypeAsd<T, Field = 'data'> = {
//     [K in keyof T]: {
//       type: K
//     } & { [P in Field]: T[K] }
//   }[keyof T]
// }
