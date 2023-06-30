<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-14 10:11:16
 * @Description: suspense仍然是实验性API 即使是在vite下
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard18/index.vue
-->
<script lang="ts" setup>
import { ref, defineAsyncComponent } from 'vue'
// const one = defineAsyncComponent(() => import('./component/one.vue'))
import loadingComponent from './component/loadingComponent.vue'
// 带选项的异步组件
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./component/one.vue'),
  delay: 3000,
  timeout: 1,
  errorComponent: loadingComponent
})
console.log('啥玩意 我东西呢')
</script>
<template>
  <div class="shard">
    <asyncPageWithOptions></asyncPageWithOptions>
    <!-- <Suspense>
      <template #default>
        <one></one>
      </template>
      <template #fallback>
        <div>默认展示</div>
      </template>
    </Suspense> -->
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
