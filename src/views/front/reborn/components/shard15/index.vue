<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 13:48:34
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard15/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import testComponent from './testComponent/index.vue'
import { ElButton } from 'element-plus'
</script>
<template>
  <div class="shard">
    <testComponent title="44"></testComponent>
    <el-button type="primary"></el-button>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
