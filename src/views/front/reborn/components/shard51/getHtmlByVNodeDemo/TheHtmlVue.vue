<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
defineProps({
  name: {
    type: String,
    default: ''
  },
  age: {
    type: Number,
    default: 0
  },
  hobby: {
    type: String,
    default: 'money'
  }
})
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="the-html-vue">
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age }}</div>
    <div>爱好：{{ hobby }}</div>
  </div>
</template>
<style lang="less" scoped>
.the-html-vue {
}
</style>
