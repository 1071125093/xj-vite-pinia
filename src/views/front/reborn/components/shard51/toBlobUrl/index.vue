<template>
  <div>
    <!-- 此处显示组件内容 -->
    <div
      class="btn"
      @click="handleExport"
      :style="{
        cursor: 'pointer'
      }"
    >
      点我生成url并导出
    </div>
  </div>
</template>

<script setup lang="ts">
// #region ********** 这两行根据项目进行特定的改动 start **************/
import { getTemporaryBlob } from './utils'
// #endregion ******* 这两行根据项目进行特定的改动 ~end~ **************/

/** 处理导出逻辑 */
const handleExport = async () => {
  await getTemporaryBlob()
}
</script>
