/*
 * @Author: HuangXiaojun
 * @Date: 2022-06-09 15:20:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-12 22:18:22
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/commonService.ts
 */
import deepcopy from 'deepcopy'
export const loadComponent = async (component: any) => {
  if (typeof component === 'function') {
    const module = await component()
    return module.default
  }
  return component
}
export const copy = deepcopy
