<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 01:32:53
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 12:40:14
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard3\index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
class Plug {
  getName() {
    return 'iphone充电头'
  }
}

class Target {
  plug: Plug
  constructor() {
    this.plug = new Plug()
  }
  getName() {
    return this.plug.getName() + ' 适配器Type-c充电头'
  }
}

const target = new Target()
target.getName() // iphone充电头 适配器转Type-c充电头
</script>
<template>
  <div class="shard3">适配器模式</div>
  <!-- 
   -->
</template>
<style lang="less" scoped>
.shard3 {
}
</style>
