<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-18 17:35:04
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard20/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
//#region ****** 冒泡排序 start **********/
// let testArr = [12, 3, 3, 344, 13, 54, 77, 435, 3452, 21]
// const swap = (arr: number[], preIndex: number, nextIndex: number) => {
//   ;[arr[preIndex], arr[nextIndex]] = [arr[nextIndex], arr[preIndex]]
// }
// const bubbleSort = (arr: number[], callback: any) => {
//   for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i; j++) {
//       if (callback(arr[j], arr[j + 1]) > 0) {
//         swap(arr, j, j + 1)
//       }
//     }
//   }
// }
// bubbleSort(testArr, (pre: number, next: number) => {
//   return next - pre
// })
// console.log(testArr)
//#endregion *** 冒泡排序 end   **********/

//#region ****** shuffle排序 start **********/
// const shuffle = (arr: number[]) => {
//   let maxIndex = arr.length - 1

//   while (maxIndex) {
//     const tempIndex = Math.floor(Math.random() * maxIndex--)
//     ;[arr[maxIndex], arr[tempIndex]] = [arr[tempIndex], arr[maxIndex]]
//   }

//   return arr
// }
// const shuffle = (arr: number[]) => {
//   let maxIndex = arr.length - 1
//   arr.forEach((value, index) => {
//     // let randomIndex = Math.floor(Math.random() * index + 1)
//   })
//   return arr
// }
// const res = shuffle([1, 3, 45, 12, 3, 12, 321, 312, 67, 6, 6745, 45])
// console.log(res)

//#endregion *** shuffle排序 end   **********/
// const getFileSizeAndUnit = (fileSize) => {
//   const unitMap = ['B', 'KB', 'MB', 'GB', 'TB']
//   const fileIndex = Math.log(fileSize) / Math.log(1024)
// }

const basicArray = [
  {
    name: '默认1'
  },
  {
    name: '默认2'
  },
  {
    name: '默认3'
  }
]
const insertObj = {
  name: '插入对象'
}
const addArr = [insertObj, insertObj, insertObj]
const tranferArray = () => {
  const resultArr = []
  basicArray.forEach((item, index) => {
    resultArr.push(basicArray[index], addArr[index])
  })
  console.log(resultArr)
}
tranferArray()
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
