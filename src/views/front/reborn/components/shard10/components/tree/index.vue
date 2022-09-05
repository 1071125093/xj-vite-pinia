<!--
 * @Author: XiaoJun
 * @Date: 2022-07-02 16:36:31
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-25 11:24:19
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard10/components/tree/index.vue
-->
<script lang="ts" setup name="tree">
import { onMounted, ref, inject } from 'vue'
interface TreeItem {
  label: 'string'
  children: TreeItem[]
}
// defineOptions({
//   name: 'tree',
// })
const props = defineProps<{
  tree: TreeItem[]
}>()
</script>
<template>
  <div v-for="treeItem in tree" :key="treeItem.label" class="tree">
    <div class="label">{{ treeItem.label }}</div>
    <tree :tree="treeItem.children"></tree>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
