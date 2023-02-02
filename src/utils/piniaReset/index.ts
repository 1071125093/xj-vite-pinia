/*
 * @Author: XiaoJun
 * @Date: 2023-01-31 14:04:07
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-01-31 16:28:37
 * @Description: pinia重置方法
 * @FilePath: /xj-vite-pinia/src/utils/piniaReset/index.ts
 */

import { cloneDeep } from 'lodash-es'

// 透過 $patch、$state 實現 pinia reset 成初始狀態
export function resetStore({ store }: any) {
  // 透過 cloneDeep 複製初始狀態並保存在 initialState （這裏使用 cloneDeep 是考慮到 Set 等狀態）
  /** 以闭包形式存在*/
  const initialState = cloneDeep(store.$state)

  // 當調用 $custom_reset 時，使用 $patch 將當前 Store 還原為 initialState
  /** 重写$reset方法
   *  支持重置指定key
   */
  const xjReset = (key: string) => {
    let tempObj
    if (key) {
      /** 如果重置指定key */
      tempObj = cloneDeep(store.$state)
      tempObj[key] = initialState[key]
    } else {
      /** 否则直接初始数据带入 */
      tempObj = cloneDeep(initialState)
    }
    store.$patch()
  }
  store.$reset = xjReset
  // store.$custom_reset = () => store.$patch(cloneDeep(initialState))
}
