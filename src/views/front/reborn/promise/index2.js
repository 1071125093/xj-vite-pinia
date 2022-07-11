/*
 * @Author: XiaoJun
 * @Date: 2022-07-09 08:52:32
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-09 09:01:57
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/promise/index2.js
 */
const p1 = () =>
  new Promise((resolve, reject) => {
    console.log(1) //1
    let p2 = new Promise((resolve, reject) => {
      console.log(2) //2
      const timeOut1 = setTimeout(() => {
        console.log(3) //6
        resolve(4) //8
      }, 0)
      resolve(5) //5
    })
    resolve(6) //4--6
    p2.then((arg) => {
      console.log(arg)
    })
  })
const timeOut2 = setTimeout(() => {
  console.log(8) //7
  const p3 = new Promise((reject) => {
    reject(9) //9
  }).then((res) => {
    console.log(res)
  })
}, 0)

p1().then((arg) => {
  console.log(arg)
})
console.log(10) //3
