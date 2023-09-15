<!--
 * @Author: XiaoJun
 * @Date: 2023-07-27 16:41:47
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-27 16:41:52
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard18/component/theLoading.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <Suspense>
    <template #default>
      <one></one>
    </template>
    <template #fallback>
      <div>加载中</div>
    </template>
  </Suspense>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
