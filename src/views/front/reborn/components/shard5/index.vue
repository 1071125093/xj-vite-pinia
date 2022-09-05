<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 13:15:18
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 13:23:43
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard5\index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
// 状态 （弱光、强光、关灯）
class State {
  state: string
  constructor(state: string) {
    this.state = state
  }
  handle(context: Context) {
    console.log(`this is ${this.state} light`)
    context.setState(this.state)
  }
}
class Context {
  state: string
  constructor() {
    this.state = null
  }
  getState() {
    return this.state
  }
  setState(state: string) {
    this.state = state
  }
}
// test
const context = new Context()
const weak = new State('weak')
const strong = new State('strong')
const off = new State('off')

// 弱光
weak.handle(context)
console.log(context.getState())

// 强光
strong.handle(context)
console.log(context.getState())

// 关闭
off.handle(context)
console.log(context.getState())
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
