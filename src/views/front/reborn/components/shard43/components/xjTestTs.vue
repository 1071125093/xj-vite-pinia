<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
interface Product {
  id: string
  type: 'digital' | 'physical'
}

interface One extends Product {
  type: 'digital'
}

// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="xj-test-ts">填充内容</div>
</template>
<style lang="less" scoped>
.xj-test-ts {
}
</style>
