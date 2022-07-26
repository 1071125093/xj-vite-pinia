<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-25 12:35:02
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard22/index.vue
-->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const shard = ref<any>()
onMounted(() => {})
</script>
<template>
  <div class="container">
    <div class="shard" ref="shard">空</div>
  </div>
</template>
<style lang="less" scoped>
.container {
  height: 3000px;
  overflow-y: auto;
}
.shard {
  margin-top: 200px;
  height: 600px;
  background: linear-gradient(#fff, #000);
}
</style>
