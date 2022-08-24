<!--
 * @Author: XiaoJun
 * @Date: 2022-08-12 14:27:26
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-16 13:44:16
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard24/service/demo.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
</script>
<template>
  <teleport to="body">
    <div class="demo_container">
      <div class="demo">teleport测试</div>
      <slot name="title">我是好人</slot>
    </div>
  </teleport>
</template>
<style lang="less" scoped>
.demo {
}
</style>
