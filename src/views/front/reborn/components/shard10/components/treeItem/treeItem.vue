<!--
 * @Author: HuangXiaojun
 * @Date: 2022-07-01 13:02:21
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-07-01 13:11:37
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard10\components\treeItem\index.vue
-->
<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  node: {
    type: Object,
  },
});
</script>
<template>
  <div class="tree_item" v-if="node">
    <div class="label">{{ node.label }}</div>
    <treeItem
      :node="item"
      v-for="item in node.children"
      :key="node.label"
    ></treeItem>
  </div>
</template>
<style lang="less" scoped>
.tree_item {
}
</style>
