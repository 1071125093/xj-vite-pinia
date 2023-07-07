<!--
 * @Author: XiaoJun
 * @Date: 2023-07-06 19:27:04
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-07 16:22:52
 * @Description: 我是中间那根柱子
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/components/xjMap/components/prismContent.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
defineProps({
  prismHeight: {
    type: Number,
    default: 170
  }
})
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div
    class="prism-content"
    :style="{
      '--height': `${prismHeight}px`,
      position: 'relative',
      width: '10px',
      transform: 'translate(50%, 0)'
    }"
  >
    <div
      class="prism-item"
      :style="{
        display: prismHeight ? 'block' : 'none'
      }"
    >
      <i></i>
    </div>
  </div>
</template>
<style lang="less" scoped>
.prism-content {
  /* 柱形下部分颜色+柱形底部菱形 */
  --bar-bg: #ff8f411a;
  /* 柱形上部分颜色 */
  --bar-shape: #fddb84ff;
  /* 柱形顶部菱形颜色 */
  --bar-top: #ffeab3ff;
  /* 柱形左侧顶部颜色 */
  --bar-left-top: #dda20aff;
  /* 柱形左侧底部颜色 */
  --bar-left-bottom: #ff8f4100;
  /* 柱形线条颜色 */
  --bar-line: rgba(0, 0, 0, 0.1);
  /* clip-path裁剪菱形 */
  --path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  --path-bottom: polygon(50% 50%, 100% 50%, 50% 100%, 0% 50%);
  /* 柱形宽度 */
  --w: 16px;
  /* 柱形高度最大值 */
  --h: 200px;
  /* clip-path左侧裁剪菱形 */
  --path-left: polygon(-0% -0%, 100% -0%, 100% 100%, 40% 100%);
  /* clip-path右边侧裁剪菱形 */
  --path-right: polygon(-300% -400%, 100% -5%, 90% 100%, 10% 100%);

  .prism-item-out {
    /* 柱形下部分颜色+柱形底部菱形 */
    --bar-bg: #ffeab370;
    /* 柱形上部分颜色 */
    --bar-shape: #ffeab370;
    /* 柱形顶部菱形颜色 */
    --bar-top: #c1b896ff;
    /* 柱形左侧顶部颜色 */
    --bar-left-top: #dda20a5e;
    /* 柱形左侧底部颜色 */
    --bar-left-bottom: #ff8f4100;
    /* clip-path右边侧裁剪菱形 */
    --path-right: polygon(-300% -400%, 100% -5%, 92% 100%, 4% 100%);
    z-index: 3;
  }
  .prism-item {
    position: absolute;
    left: 3px;
    top: calc(var(--height) * -1);
    width: var(--w);
    transform: translate(-50%, 0px);
    height: var(--height);
    background: linear-gradient(to top, var(--bar-bg), var(--bar-shape));
    // clip-path: var(--path-right);
    i {
      position: absolute;
      width: var(--w);
      height: calc(var(--w) / 2);
      clip-path: var(--path-bottom);
      left: 0;
      bottom: calc(var(--w) * -0.5);
      background: linear-gradient(-90deg, var(--bar-left-bottom) 0%, var(--bar-bg) 100%);
      /* 层级置于最上层 */
      z-index: 2;
      transform: translateY(-50%);
    }
  }
  .prism-item:hover {
    .prism-board {
      display: block;
    }
  }

  .prism-item:last-child {
    margin-right: 0;
  }

  /* bar添加前后伪元素，设置为clip-path裁剪后的菱形 */
  .prism-item::before {
    content: '';
    position: absolute;
    width: var(--w);
    height: calc(var(--w) / 2);
    clip-path: var(--path);
    left: 0;
    top: 0;
    background: var(--bar-top);
    /* 层级置于最上层 */
    z-index: 2;
    transform: translateY(-50%);
  }

  .prism-item::after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(var(--height) * -0.5);
    z-index: 1;
    width: calc(var(--w) / 2);
    height: calc(var(--height));
    background: linear-gradient(to top, var(--bar-left-bottom), var(--bar-left-top));
    transform: translateY(50%);
    // clip-path: var(--path-left);
  }

  .prism-item span {
    position: absolute;
    width: 1px;
    height: 100%;
    left: 50%;
    top: 0;
    box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.2);
  }
}
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
