/*
 * @Author: XiaoJun
 * @Date: 2022-12-23 15:34:47
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-28 14:45:52
 * @Description: 通用型工具类--级别最高
 * @FilePath: /xj-vite-pinia/src/interface/index.d.ts
 */
declare namespace XJ {
  // #region ********** 工具类部分 start **************/
  // keyof的本质是解构对象类型 并以 | 连接
  /** 获取值的类型集合 */
  type Values<T> = T[keyof T]
  // #endregion ******* 工具类部分 ~end~ **************/

  // #region ********** 手写部分 start **************/
  type MyPartial<T> = {
    [key in keyof T]?: T[key]
  }
  // 扩展一下，将制定的key变成可选类型:

  type MyPartialOptional<T, K extends keyof T = T> = {
    [key in K]?: T[key]
  }

  /**
   * 遍历T中的所有子类型，如果该子类型约束于U（存在于U、兼容于U），
   * 则返回never类型，否则返回该子类型
   */
  type MyExclude<T, U> = T extends U ? never : T

  // #endregion ******* 手写部分 ~end~ **************/
}
