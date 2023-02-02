<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-01-31 17:40:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import Asd from './components/asd.vue'
const testValue = ref(1)
</script>
<template>
  <div class="shard">
    <Asd v-model:testValue="testValue"></Asd>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
