<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import moduleName from './components/map/index.vue'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <!-- <div class="main-map"> -->
    <!-- <div class="map-box"> -->
      <moduleName></moduleName>
    <!-- </div> -->
  <!-- </div> -->
</template>
<style lang="less" scoped>
.main-map {
  width: 100%;
  height: 700px;
  // position: relative;
  display: flex;
  justify-content: center;
  .map-box {
    // width: 800px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
