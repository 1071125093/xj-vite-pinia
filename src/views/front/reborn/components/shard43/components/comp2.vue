<!--
 * @Author: XiaoJun
 * @Date: 2023-06-09 15:11:08
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-09 15:40:10
 * @Description: 先别用defineModel 看上去很香，但是问题很多
 1.会导致DefineProps中定义的属性无法直接在模板上直接调用 必须props.list
 2.多个双向绑定展示，会导致与defineProps关系割裂
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard43/components/comp2.vue
-->
<script lang="ts" setup generic="T extends Shard43.DetailItem |Shard43.ListItem">
// #region ********** 库&组件等引入 start **************/
// import { NInput } from 'naive-ui'

// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
const xjTest = defineModel<any>()
const props = defineProps<{
  list: T[],
  asd:number
}>()
const emits = defineEmits<{
  xjTest: [id: number]
}>()
const xjGo = () => {
  props.list.forEach((f) => {
    if ('title' in f) {
      console.log(f.title + '我是好人')
    } else if ('label' in f) {
      console.log(f.value + '我是好人')
    }
  })
  emits('xjTest', 2)
}
xjGo()

// #endregion ******* define区域 ~end~ **************/
// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="comp1">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>我是谁</span>
        <slot name="bobo" :item="item"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.comp1 {
}
</style>
