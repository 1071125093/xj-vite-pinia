<!--
 * @Author: XiaoJun
 * @Date: 2022-07-03 12:17:35
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-09 23:47:31
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard13/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
</script>
<template>
  <!-- <div class="container">
    <div class="row">
      <div class="row_item">
        <div class="item_text">左侧:</div>
        <div class="item_content">右侧内容</div>
      </div>
      <div class="row_item">
        <div class="item_text">左侧:</div>
        <div class="item_content">右侧内容</div>
      </div>
      <div class="row_item">
        <div class="item_text">左侧:</div>
        <div class="item_content">右侧内容</div>
      </div>
    </div>
  </div> -->
  <div class="parent">
    <div class="child"></div>
  </div>
  <div class="container">
    <div class="shard1">
      <div class="inner1"></div>
      <!-- <div class="inner2"></div> -->
    </div>
    <div class="shard2"></div>
  </div>
</template>
<style lang="less" scoped>
.parent {
  width: 100px;
  height: 100px;
  background: pink;
}

.child {
  margin-top: 100px;
  width: 50px;
  height: 50px;
  background: blue;
}
.shard1 {
  width: 100%;
  height: 200px;
  display: flex;
  background: #bfa;
  .inner1 {
    width: 80px;
    height: 80px;
    background: #bfa;
    vertical-align: top;
    margin-right: 100px;
    margin-top: 100px;
  }
  .inner2 {
    width: 80px;
    height: 80px;
    background: #bfa;
    display: inline-block;
    margin-left: 100px;
  }
}
.shard2 {
  width: 200px;
  height: 200px;
  border: 1px solid #87ceeb;
  margin-top: 150px;
}

.test {
  width: 600px;
  height: 20px;
  border: 1px solid #87ceeb;
  display: flex;
  .item {
    flex: 1;
  }
}
.container {
  width: 600px;
  border: 1px solid #87ceeb;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.row_item {
  display: inline-flex;
  align-items: center;
  flex: 1;
  justify-content: center;
  &:first-of-type {
    justify-content: flex-start;
  }
  &:last-of-type {
    justify-content: flex-end;
  }
}
.item_text {
  flex-shrink: 0;
}
.item_content {
  .title_overflow(1);
}
</style>
