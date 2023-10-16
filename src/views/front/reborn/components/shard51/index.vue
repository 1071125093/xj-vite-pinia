<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-08 11:54:19
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard51/index.vue
-->
<script lang="ts" setup>
// import getHtmlByVNodeDemo from './getHtmlByVNodeDemo/index.vue'
// import imageToCanvasDemo from './imageToCanvasDemo/index.vue'
import getRegexDemo from './getRegexDemo/index.vue'
import toBlobUrl from './toBlobUrl/index.vue'
const xjTest = (val) => {
  return val < new Date('2023-08').getTime()
}
</script>
<template>
  <div class="shard">
    <!-- <imageToCanvasDemo></imageToCanvasDemo> -->
    <toBlobUrl></toBlobUrl>
    <!-- <n-date-picker type="month" clearable :is-date-disabled="xjTest" /> -->
    <getRegexDemo></getRegexDemo>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
