<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-19 10:46:56
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard41/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'

const name = 123
const name1 = 123
const name2 = 123
const name3 = 123
const obj = reactive({
  name: 123
})

// #flag 尝试失败，感觉不好用，理论上不如hooks 但是hooks存在其他问题
// const xjTest = reactive<{
//   lake: number[]
//   queryLake: () => void
//   calcLake: any
// }>({
//   lake: [],
//   queryLake() {
//     this.lake = [...this.lake, Math.random()]
//   },
//   calcLake: [...xjTest.lake, ...xjTest.lake]
// })
// onMounted(() => {
//   xjTest.queryLake()
// })
</script>
<template>
  <div>我我我</div>
  <!-- <div class="shard" @click="xjTest.queryLake">
    {{ xjTest.lake }}
  </div>
  <div>{{ xjTest.calcLake }}</div>
  <div>{{ xjTest.calcLake }}</div>
  <div>{{ xjTest.calcLake }}</div>
  <div>{{ xjTest.calcLake }}</div>
  <div>{{ xjTest.calcLake }}</div> -->
</template>
<style lang="less" scoped>
.shard {
}
</style>
