<!--
 * @Author: XiaoJun
 * @Date: 2023-06-09 13:50:11
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-09 15:11:08
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard43/components/comp1.vue
-->
<script lang="ts" setup generic="T extends Shard43.ListItem">
// #region ********** 库&组件等引入 start **************/
// import { NInput } from 'naive-ui'

// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
// const modelValue = defineModel<string>()
const props = defineProps<{
  list: T[]
}>()
const xjGo = () => {
  props.list.forEach((f) => {
    console.log(f.label + '我是好人')
  })
}
xjGo()

// #endregion ******* define区域 ~end~ **************/

// #region ********** defineModel start **************/

// const calcModelValue = computed({
//   get() {
//     return modelValue.value
//   },
//   set() {
//     modelValue.value = modelValue
//   }
// })
// #endregion ******* defineModel ~end~ **************/

// #region ********** defineSlots start **************/
// #endregion ******* defineSlots ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="comp1">
    填充内容
    <!-- <n-input v-model:value="modelValue" type="text" placeholder="基本的 Input" /> -->
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>我是谁</span>
        <slot name="bobo" :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comp1 {
}
</style>
