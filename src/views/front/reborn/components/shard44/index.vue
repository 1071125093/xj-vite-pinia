<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-28 13:40:43
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard44/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { useXjContainer } from './useXjContainer'
import theInner from './components/theInner.vue'
const theAsd = useXjContainer({
  theComponent: theInner,
  initWidth: 896,
  initHeight: 809,
  value: {
    name: '好人',
    age: 3333
  }
})
const xjWannaGo = () => {
  console.log('我我我试试看')
}
const boboValue = ref(1)
</script>
<template>
  <div class="shard">
    {{ boboValue }}
    <component :is="theAsd" @xjTest="xjWannaGo" v-model="boboValue"></component>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
