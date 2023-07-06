<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// defineProps({
//   title: {
//     type: String,
//     default: '123'
//   }
// })
defineProps<{
  title: string
}>()
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="map-content" id="the-asd">
    填充内容{{ title }}
  </div>
</template>
<style lang="less" scoped>
.map-content {
  z-index: 20;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  padding: 16px;
  color: #283951;
  text-align: left;
  width: 300px;

  .title {
    margin-bottom: 12px;
    line-height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI;
    word-break: break-all;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      &.unit {
        margin-left: 5px;
      }
      &:nth-of-type(2) {
        color: #001532ff;
      }
    }
  }
}
</style>
