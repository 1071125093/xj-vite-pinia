/*
 * @Author: XiaoJun
 * @Date: 2022-07-09 08:48:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-09 08:51:45
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/promise/index.js
 */
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
  reject('error')
}).then(() => {
  console.log(5)
})
setTimeout(()=>{
  console.log(6);
})
promise
  .then(() => {
    console.log(3)
  })
  .catch((e) => console.log(e))
console.log(4)
