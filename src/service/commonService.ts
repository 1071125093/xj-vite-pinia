/*
 * @Author: HuangXiaojun
 * @Date: 2022-06-09 15:20:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 19:40:30
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/commonService.ts
 */
// const minusFileSize = (fileSize) => {
//   const theIndex = 1
//   return (Math.log(fileSize/1024)-Math.log(1024))/Math.log(1024)
// }
export const loadComponent = async (component: any) => {
  if (typeof component === 'function') {
    const module = await component()
    return module.default
  }
  return component
}
