<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-14 15:09:53
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard50/index.vue
-->
<script lang="ts" setup>
import bobo from './components/bobo.vue'
import { showDialog } from '@/service/fsDialog'
const xjTest = () => {
  showDialog(() => import('./components/TestDialog.vue'))
}
</script>
<template>
  <div class="shard">
    <bobo></bobo>
    <n-button type="primary" @click="xjTest">你动我试试</n-button>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
