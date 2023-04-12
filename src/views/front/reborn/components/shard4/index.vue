/** * @Author: XiaoJun * @Date: 2022-08-08 15:14:55 * @LastEditors: XiaoJun * @LastEditTime:
2023-04-12 16:16:27 * @Description: 组件功能 * @FilePath:
/xj-vite-pinia/src/views/front/reborn/components/shard4/index.vue */
<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 12:44:49
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 13:20:33
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard4\index.vue
-->
<script lang="ts" setup>
// @ts-nocheck
import { ref } from 'vue'
class Cellphone {
  create() {
    console.log('生成一个手机')
  }
}
class Decorator {
  cellphone: Cellphone
  constructor(cellphone) {
    this.cellphone = cellphone
  }
  create() {
    this.cellphone.create()
    this.createShell()
  }
  createShell() {
    console.log('生成手机壳')
  }
}
// 测试代码
const cellphone = new Cellphone()
cellphone.create()

console.log('------------')
const dec = new Decorator(cellphone)
dec.create()
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
