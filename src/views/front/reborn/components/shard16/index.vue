<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 10:22:19
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard16/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
const theDateStr = ref(' 2022-3-3')
const changeDateStr = () => {
  theDateStr.value = `2022-3-${Math.floor(Math.random() * 31)}`
}
</script>
<template>
  <button class="change" @click="changeDateStr">按钮</button>
  <div class="shard" v-dateFormat>{{ theDateStr }}</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
