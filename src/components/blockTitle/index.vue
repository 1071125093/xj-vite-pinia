<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:25:25
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-14 17:05:13
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/components/blockTitle/index.vue
-->
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
interface Props {
  // title: global.Size
  title: 'one' | 'two' | 'three' | 'four' | 'five' | 'six'
}
withDefaults(defineProps<Props>(), {
  // title: 'one',
})
const startInit = () => {
  debugger
}

onMounted(() => {
  startInit()
})
onBeforeUnmount(() => {
  debugger
})
</script>
<template>
  <div class="block_title">公共标题</div>
</template>
<style lang="less" scoped>
.block_title {
}
</style>
