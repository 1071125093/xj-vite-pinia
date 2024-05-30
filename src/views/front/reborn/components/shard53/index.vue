<!--
 * @Author: XiaoJun
 * @Date: 2024-02-19 16:25:16
 * @LastEditors: XiaoJun
 * @LastEditTime: 2024-05-20 10:09:50
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard53/index.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { useDebounceFn } from '@vueuse/core'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const xjTest = ref('')
const btnFn = () => {
  showPopover.value = true
  execHidden()
}
const showPopover = ref(false)

const execHidden = useDebounceFn(() => {
  showPopover.value = false
}, 3000)
window.$message('success', '我裂开了')
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div :style="{ width: '400px' }">
    <n-popover :show="showPopover" trigger="manual" placement="top">
      {{ xjTest }}
      <template #trigger>
        <n-input-group>
          <NInput v-model:value="xjTest"></NInput>
        </n-input-group>
      </template>
    </n-popover>

    <n-button
      :style="{
        marginTop: '32px'
      }"
      @click="btnFn"
    >
      点我康康
    </n-button>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
