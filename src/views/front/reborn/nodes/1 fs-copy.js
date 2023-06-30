/*
 * @Author: XiaoJun
 * @Date: 2022-07-08 11:01:41
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 12:15:51
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/nodes/1 fs-copy.js
 */
const fs = require('fs-extra')
const path = require('path')
// fs.copy(path.join(__dirname, '/shard1')).then(() => {
//   console.log('文件复制完成')
// })
// fs.copy(path.join(__dirname, './shard1'), path.join(__dirname, './shard2')).then(() => {
//   console.log('文件复制完成')
// })

// fs.copy(path.join(__dirname, './shard1'), path.join(__dirname, './shard2'), {
//   filter(src, dest) {
//     console.log(src, dest)
//   },
// }).then(() => {
//   console.log('文件复制完成')
// })
// 该copy不同于writeFile 会创建深层目录
fs.copy(path.join(__dirname, './shard1/asd.json'), path.join(__dirname, './shard2/test/asd2.json'), {
  filter(src, dest) {
    console.log(src, dest)
    // 有filter必须return
    return true
  }
}).then(() => {
  console.log('文件复制完成')
})
