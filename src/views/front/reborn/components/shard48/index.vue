<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-08-01 15:04:06
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard48/index.vue
-->
<script lang="ts" setup>
import { url } from 'inspector'
import { CSSProperties } from 'vue'
import { StyleHTMLAttributes } from 'vue'
import { Directive, ref } from 'vue'
import TestOne from './components/testOne.vue'

const vTest: Directive = {
  mounted(el: any) {
    console.log('我挂载')
  },
  created() {
    console.log('我创建')
  }
}
const theNoob: CSSProperties = {
  fontSize: '24px'
}
const $style = useCssModule('wtf')
console.log($style.red)
const theName = ref('我是谁')
const theLengthPx = ref('12px')
const theLength = ref(12)
</script>
<template>
  <div class="shard">
    <TestOne v-model:name="theName"></TestOne>
    <div class="wanna-go" :class="wtf.red" v-test>我我我</div>
    <div class="xj-list">
      <div class="xj-item">我是谁</div>
      <div class="xj-item">我是谁</div>
      <div class="xj-item">我是谁</div>
      <div class="xj-item">我是谁</div>
      <div class="xj-item">我是谁</div>
      <div class="xj-item">我是谁</div>
    </div>
    <div>我的天哪</div>
  </div>
</template>
<style lang="less" scoped>
@thelengthpx:v-bind (theLengthPx);
@thelength:v-bind (theLength);
.xj-list {
  display: flex;
  width: 300px;
  flex-wrap: wrap;
  margin-bottom: -12px;
  .xj-item {
    padding: 0 16px;
    &:not(:nth-of-type(-3n + 12)) {
      margin-right: 16px;
    }
    margin-bottom: 12px;
    // width: 100px;
  }
}
.wanna-go {
  color: red;
  font-size: v-bind('theNoob.fontSize'); // 有效，但是没ts提示，不推荐使用
}
</style>
<style lang="less" module="wtf">
.red {
  color: red;
}
</style>
