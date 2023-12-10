<!--
 * @Author: XiaoJun
 * @Date: 2023-12-10 16:20:07
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-12-10 17:30:29
 * @Description: threejs-demo
 * @FilePath: /xj-vite-pinia/src/views/front/threeJs/components/theDemo.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { useThreeInit } from './methods'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 初始化相关 start **************/
const theNoobRef = ref()
onMounted(() => {
  useThreeInit(theNoobRef)
})
// #endregion ******* 初始化相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="the-demo" ref="theNoobRef">啥情况</div>
</template>
<style lang="less" scoped>
.the-demo {
  height: 100%;
}
</style>
