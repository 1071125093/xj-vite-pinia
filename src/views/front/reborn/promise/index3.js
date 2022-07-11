/*
 * @Author: XiaoJun
 * @Date: 2022-07-09 09:05:26
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-09 09:08:08
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/promise/index3.js
 */
let p1, p2
p1 = new Promise((resolve) => {
  console.log(1)
  setTimeout(() => {
    console.log(2)
    p2 = new Promise((resolve) => {
      console.log(3)
      resolve()
    })
  })
  resolve()
})
p1.then(() => {
  console.log(4)
})
