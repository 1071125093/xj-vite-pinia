<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-22 16:44:52
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard32/index.vue
-->
<script setup>
// #region ********** 前端测试 start **************/
// import Test from './components/test/index.vue'
import { provide, ref } from 'vue'
import test from './components/test.vue'
const asd = ref(123)
provide('asd', asd)
const value = ref(null)

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
// #endregion ******* 前端测试 ~end~ **************/
</script>
<template>
  <div class="shard">
    <test></test>
    <blockTitle title="右边"></blockTitle>
    {{ value === null ? '我是null' : '我是undefined' }}
    <el-select v-model="value" class="m-2" placeholder="我是placeholder" size="large" clearable>
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<style lang="less" scoped>
.shard {
  .codeEditBox {
    height: 600px;
  }
}
</style>
