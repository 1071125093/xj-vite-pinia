<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-21 11:23:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard24/index.vue
-->
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import { useModalDialog } from './service/xjModalDialog'
import demo from './service/demo.vue'
const { remove, startInit } = useModalDialog()
</script>
<template>
  <div class="shard">
    <el-button type="primary" size="small" @click="startInit">打开弹窗</el-button>
    <el-button type="primary" size="small" @click="remove">关闭弹窗</el-button>
    <demo>
      <template #title>
        <div class="xj_test">qd测试</div>
      </template>
    </demo>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
