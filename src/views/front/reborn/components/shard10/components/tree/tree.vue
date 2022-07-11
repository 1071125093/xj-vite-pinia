<!--
 * @Author: XiaoJun
 * @Date: 2022-07-02 16:36:31
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-05 16:38:39
 * @Description: 组件功能
 * @FilePath: /my-vite/src/views/front/reborn/components/shard10/components/tree/index.vue
-->
<script lang="ts" setup name="tree">
import { onMounted, ref } from "vue";
interface TreeItem {
  label: "string";
  children: TreeItem[];
}
const props = defineProps<{
  tree: TreeItem[];
}>();
</script>
<template>
  <div class="tree" v-for="treeItem in tree" :key="treeItem.label">
    <div class="label">{{ treeItem.label }}</div>
    <tree :tree="treeItem.children"></tree>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
