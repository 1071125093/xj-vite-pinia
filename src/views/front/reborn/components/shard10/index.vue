<!--
 * @Author: HuangXiaojun
 * @Date: 2022-07-01 13:00:01
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-03-07 21:49:27
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard10/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import tree from './components/tree/index.vue'
const treeList = ref<any[]>([
  {
    label: '1',
    children: [
      {
        label: '1-1',
        children: [
          {
            label: '1-1-1',
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: '2',
    children: [
      {
        label: '2-1',
        children: [
          {
            label: '2-1-1',
            children: [],
          },
        ],
      },
    ],
  },
])
</script>
<template>
  <div class="shard">
    <tree :tree="treeList"></tree>
  </div>
</template>
<style lang="less" scoped>
.container {
  position: relative;
  top: 0;
  bottom: 0;
  width: 300px;
  height: 200px;
  .right,
  .left {
    display: inline-block;
    height: 100%;
  }
  .left {
    z-index: 100;
  }
}
</style>
