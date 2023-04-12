<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-12 09:54:15
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import Asd from './components/asd.vue'
import xjMiniTsx from './components/xjMiniTsx.vue'

const testValue = ref(1)
const xjList = [
  {
    label: '123',
    value: 12313,
  },
  {
    label: '444',
    value: 12313,
  },
] as const

const xjTestObj = {
  label: '我是表头',
  value: '我是返回值',
}

/** 划重点 */
// anfn->匿名箭头函数
// funf->不带参数

// nfn->实名函数带
const nameFn = () => { }

// dob->解构 :destructing object 破坏对象
// 同理dar 数组解构 destructing array 破坏数组
const { label: xjTestObjLabel } = xjTestObj
const [xjTestItemOne] = xjList

// prom->promise缩写
// return new Promise((resolve, reject) => {})

// fre-->forEach
xjList.forEach((currentItem) => { })

/** fof-->for of */
for (const ele of xjList) {
  console.log(ele)
}

//  function Foo<const T>(x: T): T ;
const names = ['active', 'hover', 'visited', 'link']
type Z = typeof names
// type Zero<const T> = T
</script>
<template>
  <div class="shard">
    <Asd :list="xjList">
      <template #xjWanna="item">
        <div>{{ item.value }}</div>
      </template>
    </Asd>
    <xjMiniTsx></xjMiniTsx>
  </div>
</template>
<style lang="less" scoped>
.shard {}
</style>
