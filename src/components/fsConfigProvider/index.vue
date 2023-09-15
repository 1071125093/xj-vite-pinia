<!--
 * @Author: XiaoJun
 * @Date: 2023-06-14 19:59:20
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-08 13:15:43
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/components/fsConfigProvider/index.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { NConfigProvider, zhCN, dateZhCN, NMessageProvider, NLoadingBarProvider, GlobalThemeOverrides } from 'naive-ui'
import { lightTheme } from 'naive-ui'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const themeOverrides: GlobalThemeOverrides = {
  common: {
    tableHeaderColor: 'rgba(37, 70, 133, 1)',
    fontSizeLarge: '16px', // 这玩意不生效 sb项目
    primaryColor: '#48f2ff',
    // errorColor: '#FF2A2B',
    // errorColorHover: '#FF2A2B',
    primaryColorHover: '#48f2ff',
    primaryColorPressed: '#48f2ff',
    primaryColorSuppl: '#48f2ff',
    borderColor: '#48f2ff',
    // textColor2: '#fff',
    pressedColor: '#48f2ff',
    borderRadius: '6px',
    successColor: '#2DD7A9',
    errorColor: '#D54F5D',
    warningColor: '#E3A94F'
  }
}
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="lightTheme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <el-config-provider :locale="zhCn">
            <slot></slot>
            <!-- <router-view /> -->
          </el-config-provider>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>
<style lang="less" scoped>
.fs-config-provider {
}
</style>
