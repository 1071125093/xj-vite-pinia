/*
 * @Author: XiaoJun
 * @Date: 2022-12-09 17:16:23
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-09 17:34:38
 * @Description: fsExtra
 * @FilePath: /xj-vite-pinia/src/interface/fsExtra/index.d.ts
 */

declare namespace FsExtra {
  interface ItemOne {
    name: string
    age: num
  }
  /** 文章类型 */
  interface ArticleCateItem {
    cateId: number //主键
    /** 文章类型名称 */
    name: string
    alias: string //别名
    is_deleted: string //是否删除
  }
}
