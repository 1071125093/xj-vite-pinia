/*
 * @Author: XiaoJun
 * @Date: 2022-12-07 21:06:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-08 17:21:04
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/copyShard.js
 */
const path = require('path')
const fs = require('fs-extra')

const getMyDist = (filePath) => {
  filePath = [[filePath]].flat(Infinity).filter((item) => item)
  let reg = /(.*)\\service$/

  let myDirname = __dirname.match(reg)?.[1]
  return path.join(myDirname, ...filePath)
}

const myTransferFileName = (fileList) => {
  const baseName = 'shard'
  let targetNum = 0
  if (fileList?.length) {
    const numList = fileList.map((item) => {
      let num = item.match(/[a-zA-Z]*(\d+)/)[1]
      return num
    })
    targetNum = Math.max(...numList) + 1
  }

  return `${baseName}${targetNum}`
}

const xjTest = async () => {
  /** 拷贝对象 */
  const sourceDir = getMyDist('/views/front/reborn/components/shard0')
  /** 查询全文件 */
  const fileList = await fs.readdir(getMyDist('/views/front/reborn/components'))

  /** 目标文件名 */
  let currentTargetName = myTransferFileName(fileList)
  /** 目标对象 */
  const targetDir = getMyDist(`/views/front/reborn/components/${currentTargetName}`)
  // const asd = await readFile(sourceDir)
  fs.copy(sourceDir, targetDir)
}
xjTest()
