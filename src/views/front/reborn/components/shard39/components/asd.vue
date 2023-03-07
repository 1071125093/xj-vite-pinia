<!--
 * @Author: XiaoJun
 * @Date: 2023-02-28 22:37:32
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-03-08 00:24:16
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/components/asd.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

import { number } from 'echarts'

// const props = defineProps<{
//   list: any[]
// }>()
const props = defineProps(['list'])
type Asd = typeof props.list

// #region ********** 通用部分 start **************/
const outObj = {
  name: 123,
  age: 444,
}
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="default_class">
    <div v-for="item in list">
      <slot name="xjWanna" v-bind="item"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
