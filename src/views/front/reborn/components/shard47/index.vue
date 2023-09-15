<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-27 16:59:30
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard47/index.vue
-->
<script lang="ts" setup>
import * as API from '@/api/xjtest'
// #region ********** 初始化相关 start **************/
const initXjTest = async () => {
  const { data } = await API.godie()
  console.log(data)
}
/** 开始初始化 */
const startInit = () => {
  initXjTest()
}
onMounted(() => {
  startInit()
})
// const vFocus = {
//   mounted(el: any) {
//     el?.focus()
//   }
// }
// #endregion ******* 初始化相关 ~end~ **************/
</script>
<template>
  <div class="shard" >空123</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
