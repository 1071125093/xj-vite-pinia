<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-03-08 00:12:05
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import Asd from './components/asd.vue'
const testValue = ref(1)
const xjList = [
  {
    label: '123',
    value: 12313,
  },
  {
    label: '444',
    value: 12313,
  },
]
</script>
<template>
  <div class="shard">
    <Asd :list="xjList">
      <template #xjWanna="item">
        <div>{{ item.value }}</div>
      </template>
    </Asd>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
