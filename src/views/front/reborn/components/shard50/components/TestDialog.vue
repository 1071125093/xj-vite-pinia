<!--
 * @Author: XiaoJun
 * @Date: 2023-09-08 11:55:56
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-20 17:27:52
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard50/components/TestDialog.vue
-->
<script lang="ts" setup>
import { piniaSystem } from '@/store'

// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const xjTest = inject('xjTest')
provide('bobobno', '我裂开了')
console.log(xjTest)
console.log(piniaSystem)

// #endregion ******* 通用部分 ~end~ **************/
const instance = getCurrentInstance()
const trymeseesee = () => {
  console.log(instance)
}
// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <BaseDialog title="我裂开">
    <n-button type="primary" @click="trymeseesee">我是一个按钮</n-button>
    {{ piniaSystem }}
  </BaseDialog>
</template>
<style lang="less" scoped>
.test-dialog {
}
</style>
