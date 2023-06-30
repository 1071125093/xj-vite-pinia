<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
defineProps<{
  name?: string
  age?: number
  modelValue: number
}>()
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
const emits = defineEmits<{
  xjTest: [id: number]
  'update:modelValue': [id: number]
}>()

const xjTest = () => {
  emits('xjTest', 123123)
  emits('update:modelValue', Math.random())
}
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="the-inner">
    发生什么事了
    <div>我是{{ name }}</div>
    <div>年龄{{ age }}</div>
    <el-button type="primary" @click="xjTest">你点我下</el-button>
  </div>
</template>
<style lang="less" scoped>
.the-inner {
}
</style>
