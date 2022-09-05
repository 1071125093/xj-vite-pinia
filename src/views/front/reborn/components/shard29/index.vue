<!--
 * @Author: XiaoJun
 * @Date: 2022-08-31 15:38:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-05 15:20:11
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard29/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
/**
 * @param {*} age
 * @param {*} name
 * @return {*}
 */
const name: number = '123'

const funName = (age: number, name: string): number => {
  return age
}
const xjTest = () => {}
</script>
<template>
  <div class="shard" @click="xjTest">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
