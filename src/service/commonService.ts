/**
 * @Author: XiaoJun
 * @Date: 2023-04-12 16:37:54
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-18 20:46:30
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/commonService.ts
 */
/*
 * @Author: HuangXiaojun
 * @Date: 2022-06-09 15:20:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 18:37:25
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/commonService.ts
 */
import deepcopy from 'deepcopy'
import path from 'path'

export const loadComponent = async (component: any) => {
  if (typeof component === 'function') {
    const module = await component()
    return module.default
  }
  return component
}

export const copy = deepcopy

type MyFsPath = string | string[]
export const getMyDist = (filePath: MyFsPath) => {
  filePath = [[filePath]].flat(Infinity).filter((item) => item) as MyFsPath
  const reg = /(.*)\\service$/
  const myDirname = __dirname.match(reg)?.[1] as string
  return path.join(myDirname)
}

export const xjSleep = (second = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(second)
    }, second * 1000)
  })
}
