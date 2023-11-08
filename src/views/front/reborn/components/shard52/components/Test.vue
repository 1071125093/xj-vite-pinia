<!--
 * @Author: XiaoJun
 * @Date: 2023-10-16 10:10:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-18 15:49:46
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard52/components/Test.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { type ButtonProps } from 'naive-ui'
import { Asd } from '../types'

interface Props extends /** @vue-ignore */ ButtonProps {
  foo: string
}

defineProps<Props>()

// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="test">填充内容</div>
</template>
<style lang="less" scoped>
.test {
}
</style>
