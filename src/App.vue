<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 19:54:41
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/App.vue
-->

<script setup lang="ts"></script>

<template>
  <!-- <router-view></router-view> -->
  <div id="nav">
    <router-link to="/front">我是front页面|</router-link>
  </div>
  <router-view />
</template>

<style lang="less">
@import './assets/less/init.less';
.test {
  color: @themeColor;
}
</style>
