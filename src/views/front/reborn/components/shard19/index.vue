<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 17:22:39
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard19/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
//@ts-nocheck
// const throttle = (fun, delay) => {
//   let timer
//   return (...args) => {
//     // console.log(timer);
//     if (timer) return
//     timer = setTimeout(() => {
//       fun(...args)
//       clearTimeout(timer)
//       timer = null
//     }, delay)
//   }
// }
function debounce(fun, delay) {
  let timer
  let isInit = true
  return (...args) => {
    if (isInit) {
      isInit = false
      return fun.apply(this, args)
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(() => {
      console.log(this)
      fun.apply(this, args)
    }, 1000)
  }
}
// const debounce = (fun, delay) => {
//   let timer
//   let isInit = true
//   return (...args) => {
//     if (isInit) {
//       isInit = false
//       return fun.apply(this, args)
//     }
//     if (timer) {
//       clearTimeout(timer)
//       timer = null
//     }
//     timer = setTimeout(() => {
//       fun.apply(this, args)
//     }, 1000)
//   }
// }
const logFun = (...args) => {
  console.log(args)
}
// const test = throttle(logFun, 1000)
const test = debounce(logFun, 1000)
</script>
<template>
  <div class="shard">
    <button class="debounce" @click="test('我要说', '我列看来了')">前端测试</button>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
