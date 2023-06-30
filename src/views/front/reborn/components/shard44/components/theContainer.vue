<!--
 * @Author: XiaoJun
 * @Date: 2023-06-28 13:23:22
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-28 13:45:37
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard44/components/theContainer.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
const props = defineProps({
  // d2c属性
  initHeight: {
    type: Number,
    default: 0
  },
  initWidth: {
    type: Number,
    default: 0
  },
  theComponent: {
    type: Object
  },
  // 私有属性
  value: {
    type: Object,
    default: () => {}
  }
})
// #endregion ******* define区域 ~end~ **************/

// #region ********** 通用部分 start **************/

// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// const xjWannaGo = () => {
//   console.log('这是第一层')
// }
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="xj-container">
    <component :is="theComponent" v-if="theComponent" v-bind="{ ...value, ...$attrs }"></component>
  </div>
</template>
<style lang="less"></style>
