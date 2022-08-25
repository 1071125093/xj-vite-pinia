<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-25 17:33:26
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard28/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import testOne from './components/testOne.vue'
const isProd = import.meta.env.PROD
const idDev = import.meta.env.DEV
</script>
<template>
  <div class="shard">
    <testOne></testOne>
    <span>isProd: {{ isProd }}</span>
    <span>isDev:{{ idDev }}</span>
  </div>
</template>
<style lang="less" scoped>
.shard {
  height: 800px;
}
</style>
