<script
  lang="ts"
  setup
  generic="T extends {
  label:string
}"
>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
defineProps<{
  list: T[]
}>()
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="xj-test">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span>我是谁</span>
      {{ item.label }}
      <slot v-bind="{ item }"></slot>
    </div>
  </div>
</template>
<style lang="less" scoped>
.xj-test {
}
</style>
