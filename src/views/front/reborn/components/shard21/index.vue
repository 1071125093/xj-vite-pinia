<!--
 * @Author: XiaoJun
 * @Date: 2022-07-12 14:42:39
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-12 21:14:18
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard21/index.vue
-->
<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 20:08:37
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard0/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import containerOne from './components/containerOne.vue'
import circleProgress from './components/circleProgress.vue'
import d3Line from './components/d3Line.vue'
</script>
<template>
  <div class="shard">
    <!-- <containerOne></containerOne> -->
    <circleProgress></circleProgress>
  </div>
  <div class="lines-wrap">
    <!-- <d3Line :x1="28.5" :id="1" :highlights="true" /> -->
    <!-- <d3Line :x1="94.5" :id="2" />
    <d3Line :x1="160.5" :id="3" />
    <d3Line :x1="238.5" :id="4" />
    <d3Line :x1="328.5" :id="5" />
    <d3Line :x1="406.5" :id="6" /> -->
    <!-- <d3Line :x1="55.5" /> -->
  </div>
</template>
<style lang="less" scoped>
.lines-wrap {
  width: 300px;
  height: 90px;
  position: relative;
  background: #000;
}
</style>
