<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 15:28:10
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import Asd from './components/asd.vue'
import xjMiniTsx from './components/xjMiniTsx.vue'

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
    <xjMiniTsx></xjMiniTsx>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
