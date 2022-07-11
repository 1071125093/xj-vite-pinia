<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 20:16:12
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 21:31:36
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard15/testComponent copy/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
defineProps<{
  name: global.Size
}>()
</script>
<template>
  <div class="test_component">测试prop组件</div>
</template>
<style lang="less" scoped>
.test_component {
}
</style>
