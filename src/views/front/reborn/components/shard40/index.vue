<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-19 09:56:51
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard40/index.vue
-->
<script lang="ts" setup>
import { xjSleep } from '@/service/commonService'
const a = ref(1)
const b = ref(2)
const c = reactive({
  name: '好人'
})
const bfn = async () => {
  // 理论上
  // await xjSleep()
  console.log(b.value)
}
const cfn = () => {
  console.log(c.name)
}
const updateB = () => {
  b.value++
}
const updateC = () => {
  c.name += '加一'
}
const bobo = computed(() => {
  // 理论上我只监听a，也就是这里应该不会有事
  console.log(a)
  bfn()
  cfn()
})

// watchEffect(() => {
//   // 理论上我只监听a，也就是这里应该不会有事
//   console.log(a)
//   bfn()
//   cfn()
// })
</script>
<template>
  <div class="shard">
    {{ bobo }}
    <div @click="updateB">我我我</div>
    <div @click="updateC">我我我</div>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
