<!--
 * @Author: XiaoJun
 * @Date: 2023-07-07 16:57:29
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-18 09:41:45
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/components/xjMap/components/boardCard.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
const asd = 123
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
defineProps({
  prismHeight: {
    type: Number,
    default: 170
  },
  value: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  unit: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: 2022
  }
})
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="prism-board" :style="{ display: value ? 'flex' : 'none', position: 'relative', top: `-${prismHeight + 40}px` }">
    <div class="prism-board-content">
      <p class="prism-board-content-title">{{ name || '-' }}</p>
      <p class="prism-board-content-num">{{ year }}年：{{ value || '-' }}{{ unit || '' }}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.prism-board {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 2;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(0, 41, 85, 0.94) 0%, rgba(0, 49, 86, 0.94) 99%);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border: 1px solid;
  border-image: linear-gradient(159deg, rgba(57, 217, 219, 1), rgba(3, 89, 148, 1)) 1 1;
  transform: translate(-50%, calc(var(--height) * -1 - 43px - 12px));
  width: 200px;
  background: linear-gradient(89deg, rgba(0, 36, 82, 0.9) 0%, #002247 100%);
  border-radius: 6px;
  border: 1px solid rgba(75, 181, 235, 0.7);
  backdrop-filter: blur(0px);

  .prism-board-content {
    // display: flex;
    // justify-content: space-between;
    .prism-board-content-title {
      font-size: 14px;
      font-family: MicrosoftYaHeiUI;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .prism-board-content-num {
      font-size: 14px;
      font-family: MicrosoftYaHeiUI;
      color: #ffffff;
    }
  }
}
</style>
