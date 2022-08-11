<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-11 09:50:44
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard23/index.vue
-->
<script lang="ts" setup>
import { xjFormOne, xjFormTwo } from './components/xjForm/index'
// import { xjFormOne, xjFormTwo } from './components/xjForm/index'
import { ref, reactive } from 'vue'
const xjTestObj = reactive({
  width: '600px',
})
</script>
<template>
  <div class="shard">
    <xjFormOne></xjFormOne>
    <xjFormTwo></xjFormTwo>
  </div>
  <!-- <div class="shard">
    <xjForm.xjFormOne></xjForm.xjFormOne>
    <xjForm.xjFormTwo></xjForm.xjFormTwo>
  </div> -->
  <div class="more"></div>
</template>
<style lang="less" scoped>
.shard {
  width: v-bind('xjTestObj.width');
  height: 300px;
}
</style>
