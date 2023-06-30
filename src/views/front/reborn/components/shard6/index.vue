<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 13:44:50
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 17:25:32
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard6\index.vue
-->
<script lang="ts" setup>
// @ts-nocheck
import { ref } from 'vue'
const checkType = (function () {
  const rules = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
    }
  }
  //暴露接口
  return {
    //校验
    check(str, type) {
      return rules[type] ? rules[type](str) : false
    },
    //添加规则
    addRule(type, fn) {
      rules[type] = fn
    }
  }
})()
//调用方式
//使用mobile校验规则
console.log(checkType.check('188170239', 'mobile'))
//添加金额校验规则
checkType.addRule('money', function (str) {
  return /^[0-9]+(.[0-9]{2})?$/.test(str)
})
//使用金额校验规则
console.log(checkType.check('18.36', 'money'))
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
