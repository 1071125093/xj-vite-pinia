<!--
 * @Author: HuangXiaojun
 * @Date: 2022-07-01 13:02:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-05 14:40:49
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard10/components/treeItem/treeItem.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  node: {
    type: Object
  }
})
</script>
<template>
  <div v-if="node" class="tree_item">
    <div class="label">{{ node.label }}</div>
    <treeItem v-for="item in node.children" :key="item.label" :node="item"></treeItem>
  </div>
</template>
<style lang="less" scoped>
.tree_item {
}
</style>
