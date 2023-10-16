<!--
 * @Author: XiaoJun
 * @Date: 2023-09-26 17:17:55
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-27 11:09:21
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard51/imageToCanvasDemo/index.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { convertImageToCanvas } from './utils'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 初始化相关 start **************/
/** 开始初始化 */
const startInit = () => {
  convertImageToCanvas('image', 'canvas')
}
onMounted(() => {
  startInit()
})
// #endregion ******* 初始化相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="imageToCanvasDemo">
    <canvas id="canvas"></canvas>
    <img id="image" src="./imageToCanvasDemo.png" alt="Your Image" />
  </div>
</template>
<style lang="less" scoped>
.imageToCanvasDemo {
}
</style>
