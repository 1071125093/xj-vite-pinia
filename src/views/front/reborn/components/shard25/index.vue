<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-19 16:55:58
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard25/index.vue
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'
const calcOps = computed(() => {
  return [
    {
      name: 123,
      method: asd,
    },
  ]
})
const asd = () => {}
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
