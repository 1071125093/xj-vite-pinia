<!--
 * @Author: XiaoJun
 * @Date: 2022-10-19 09:58:46
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-21 13:40:28
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard24/components/xjTestDialog.vue
-->
<script setup>
// #region ********** 库&组件等引入 start **************/
import { ref } from 'vue'
import { usePiniaOne } from '@/store'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
const dialogTableVisible = ref(true)
const gridData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
  {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄',
  },
])
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="xj_modal_container">
    <el-dialog v-model="dialogTableVisible" title="Shipping address">
      <el-table :data="gridData">
        <el-table-column property="date" label="Date" width="150" />
        <el-table-column property="name" label="Name" width="200" />
        <el-table-column property="address" label="Address" />
      </el-table>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped></style>
