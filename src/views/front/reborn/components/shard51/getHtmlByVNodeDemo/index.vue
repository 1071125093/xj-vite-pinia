<!--
 * @Author: XiaoJun
 * @Date: 2023-09-26 14:53:03
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-26 15:28:13
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard51/getHtmlByVNodeDemo/index.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { getHtmlByVNode } from './utils'
import TheHtmlVue from './TheHtmlVue.vue'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/

const theHtml = ref('')
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 初始化相关 start **************/
/** 开始初始化 */
const startInit = () => {
  theHtml.value = getHtmlByVNode(
    h(TheHtmlVue, {
      name: '我好了',
      age: 10086
    })
  )
}
onMounted(() => {
  startInit()
})
// #endregion ******* 初始化相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="getHtmlByVNodeDemo">
    <div>1.直接展示文案，常用于echarts的tooltip或者高德地图的content{{ theHtml }}</div>
    <div>
      2.用v-html渲染(该写法无实用场景)
      <span v-html="theHtml"></span>
    </div>
  </div>
</template>
<style lang="less" scoped></style>
