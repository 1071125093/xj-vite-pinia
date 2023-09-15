<!--
 * @Author: XiaoJun
 * @Date: 2022-07-14 09:40:13
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-27 16:45:06
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard18/component/one.vue
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const init = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, 3000)
  })
}

await init()
setTimeout(async() => {
  await init()
})
</script>
<template>
  <div class="default_class">页面渲染成功</div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
