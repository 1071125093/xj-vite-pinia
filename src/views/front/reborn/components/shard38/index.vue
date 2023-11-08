<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import xjMap from './components/xjMap/index.vue'
// #endregion ******* 库&组件等引入 ~end~ **************/
import { useGXResizeEvent } from '@/utils/useGXResizeEvent'
// #region ********** 通用部分 start **************/
useGXResizeEvent({
  element: '#theContainer'
})
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <!-- <div class="main-map"> -->
  <div class="map-box" id="theContainer">
    <!-- <moduleName></moduleName> -->
    <xjMap></xjMap>
  </div>
  <!-- </div> -->
</template>
<style lang="less" scoped>
.map-box {
  display: flex;
  justify-content: center;
  & > div {
    // flex: 1;
    width: 100%;
    // &:not(:last-of-type) {
    //   margin-right: 40px;
    // }
  }
}
</style>
