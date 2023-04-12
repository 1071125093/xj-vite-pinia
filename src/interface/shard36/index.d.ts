/*
 * @Author: XiaoJun
 * @Date: 2022-12-15 17:29:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-02-28 22:37:57
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/interface/shard36/index.d.ts
 */

declare namespace Shard36 {
  /** 这是啥呢 */
  interface XjTest {
    cateId: number // 主键
    name: string // 前端测试
    alias: string //我感觉很难受
    is_deleted: string //这是什么
  }
  type Zero = number | string

  type XjTestKeys = keyof XjTest
  type XjTestValues = XJ.Values<XjTest>
}
