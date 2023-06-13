<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-13 15:00:10
 * @Description: 垃圾vue3.3 有没有测试啊 啥都不用不了
  我是垃圾，泛型generic挺好用的，defineSlots和defineModel有点过于复杂了，效率好低
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard43/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import comp1 from './components/comp1.vue'
import comp2 from './components/comp2.vue'
import xjTestTs from './components/xjTestTs.vue'
const xjTest = ref('1')
const xjList = ref([
  {
    label: '我是好人',
    value: 1,
    more: 123,
    moreTwo: '我的天啊'
  },
  {
    label: '我是好人',
    value: 2,
    more: 123,
    moreTwo: '我的天啊'
  }
])
const xjList2 = ref([
  {
    title: '我是好人',
    id: 1,
    more: 123,
    moreTwo: '我的天啊'
  },
  {
    title: '我是好人',
    id: 2,
    more: 123,
    moreTwo: '我的天啊'
  }
])
const xjTestEvent = (id: number) => {
  console.log(id)
}
</script>
<template>
  <div class="shard">
    <fsCount :envVal="3333"></fsCount>
    <span>我是值：{{ xjTest }}</span>
    <!-- @xjTestEvent="xjTestEvent" -->
    <comp2 :list="xjList2" name="我">
      <template #bobo="{ item }">
        <div>
          {{ item.title }}
        </div>
      </template>
    </comp2>
    <!-- <comp2 :list="xjList">
      <template #bobo="{ item }">
        <div>
          {{ item.label }}
        </div>
      </template>
    </comp2> -->

    <comp1 :list="xjList">
      <template #bobo="{ item }">
        <div>
          {{ item.label }}
        </div>
      </template>
    </comp1>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
