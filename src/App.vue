<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-30 18:32:11
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/App.vue
-->

<script setup lang="ts">
// const scaleStop = false
// const global_width_scale = ref(1)
// const global_height_scale = ref(1)
// const _GXResizeEvent = () => {
//   if (scaleStop) {
//     return
//   }
//   const nDefault_width = 1920
//   const nDefault_height = 1080
//   const nClient_width = document.documentElement.clientWidth
//   const nClient_height = document.documentElement.clientHeight
//   const nAuot_width = nClient_width / nDefault_width
//   const nAuot_height = nClient_height / nDefault_height
//   global_width_scale.value = nAuot_width
//   global_height_scale.value = nAuot_height
//   const jNodeBody = document.getElementById('app') as HTMLElement
//   jNodeBody.style.transform = `scale(${nAuot_width},${nAuot_height})`
//   if (document.getElementById('mapContainer')) {
//     const scaleWidth =
//       nAuot_width > 1 ? nDefault_width / nClient_width : nAuot_width
//     const scaleHeight =
//       nAuot_height > 1 ? nDefault_height / nClient_height : nAuot_height
//     const mapContainer = document.getElementById('mapContainer') as HTMLElement
//     mapContainer.style.transform = `scale(${(1 / scaleWidth).toFixed(2)},${(
//       1 / scaleHeight
//     ).toFixed(2)})`
//   }
// }
// provide('global_width_scale', global_width_scale)
// provide('global_height_scale', global_height_scale)
// provide('resize', _GXResizeEvent) // provide("名字",值)
</script>

<template>
  <!-- <router-view></router-view> -->
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/less/init.less';
#app{
  height: 100%;
}
.test {
  color: @themeColor;
}
</style>
