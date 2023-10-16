<!--
 * @Author: XiaoJun
 * @Date: 2023-09-27 11:36:18
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-27 13:57:59
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard51/getRegexDemo/index.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { RegexState } from './util'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/
// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="getRegexDemo">
    <div>
      <span>正则内容《匹配style标签》：</span>
      <span>{{ RegexState.getReg('匹配style标签') }}</span>
    </div>
    <div>
      <span>正则内容《严格密码校验》：</span>
      <span>{{ RegexState.getItem('严格密码校验')?.reg }}</span>
      <span>正则提示：</span>
      <span>{{ RegexState.getItem('严格密码校验')?.message }}</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
.getRegexDemo {
}
</style>
