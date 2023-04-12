<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-02-28 23:11:34
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard34/index.vue
-->
<script lang="ts" setup>
// import { $ref } from 'vue/macros'
let asd = $ref(1)
const bobo = ref(1)
const xjTest = () => {
  asd++
}
</script>
<template>
  <div class="shard">
    <el-button type="primary" @click="xjTest">点我</el-button>
    我在这里
    <div>{{ asd }}</div>
  </div>
</template>
<style lang="less" scoped>
.shard {
  height: 300px;
}
</style>
