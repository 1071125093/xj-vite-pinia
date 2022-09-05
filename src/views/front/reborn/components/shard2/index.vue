<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 00:44:21
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 01:22:16
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard2\index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
class LoginForm {
  state: string
  static getInstance = (() => {
    let instance: LoginForm | undefined
    return () => {
      {
        if (!instance) {
          console.log('上面')
          instance = new LoginForm()
        }
        return instance
      }
    }
  })()
  constructor() {
    this.state = 'hide'
  }
  show() {
    if (this.state === 'show') {
      return
    }
    this.state = 'show'
  }
  hide() {
    if (this.state === 'hide') {
      return
    }
    this.state = 'hide'
  }
}
const obj1 = LoginForm.getInstance()
const obj2 = LoginForm.getInstance()
obj1.show()
console.log(obj2)
obj2.hide()
console.log(obj1)
// console.log(obj2.state);
</script>
<template>
  <div class="default_class">单例模式</div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
