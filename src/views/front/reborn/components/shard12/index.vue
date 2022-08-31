<!--
 * @Author: XiaoJun
 * @Date: 2022-07-02 21:23:59
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-31 11:53:44
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard12/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
// import useStore from "@/store";
import { usePiniaOne } from '@/store'
import { storeToRefs } from 'pinia'
//#region ****** piniaOne模块测试 start **********/
const piniaOne = usePiniaOne()
const { count } = storeToRefs(piniaOne)
const testCount = ref<number>(0)
const doTest = () => {
  const num = Number(testCount.value)
  piniaOne.increaseCount(num)
}
const doReset = () => {}
//#endregion *** piniaOne模块测试 end   **********/
</script>
<template>
  <el-input v-model="testCount"></el-input>
  <button class="test" @click="doTest">点我增加num</button>
  <button class="test" @click="doReset">点我重置</button>
  <!-- <div class="shard">{{ piniaOne.age }}</div> -->
  <div class="test">{{ count }}</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
