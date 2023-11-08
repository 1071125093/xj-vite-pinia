<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-25 13:37:27
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard52/index.vue
-->
<script lang="ts" setup>
import Test from './components/Test.vue'
import testVModel from './components/testVModel.vue'
import QuzhouProblem from './components/QuzhouProblem.vue'
const xjTestValue = ref('13213')
const tryMeSeeSee = () => {
  xjTestValue.value = '1'
}
</script>
<template>
  <div class="shard">
    <Test foo="123"></Test>
    <n-button @click="tryMeSeeSee"></n-button>
    {{ xjTestValue }}
    <testVModel v-model="xjTestValue"></testVModel>
    <QuzhouProblem></QuzhouProblem>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
