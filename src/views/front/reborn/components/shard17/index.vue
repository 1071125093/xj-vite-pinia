<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-09 12:35:42
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard17/index.vue
-->
<script lang="ts" setup>
import { ref, computed } from 'vue'
const items = ref<number[]>([1, 2, 3, 4, 5, 6, 7])
const getItem = (count = 1) => {
  return items.value.sort((item) => Math.random() - 0.5)[count]
}
const currentItem = ref(1)
const changeMe = () => {
  currentItem.value = getItem()
}
</script>
<template>
  <button class="test" @click="changeMe">点我切换button隐藏显示</button>
  <transition-group tag="div" name="slide-fade">
    <div :key="currentItem" class="shard">{{ currentItem }}</div>
  </transition-group>
</template>
<style lang="less" scoped>
.shard {
  width: 300px;
  height: 300px;
  background: @themeColor;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-to {
  display: none;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(60px);
}
</style>
