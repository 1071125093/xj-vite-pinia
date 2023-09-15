<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:25:21
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-08 17:31:06
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/App.vue
-->

<script setup lang="ts">
import { lightTheme, GlobalThemeOverrides } from 'naive-ui'
// const themeOverrides: GlobalThemeOverrides = {
//   common: {
//     primaryColor: '#38EFF5',
//     primaryColorHover: '#38EFF5D4',
//     primaryColorPressed: '#38EFF5D4',
//     primaryColorSuppl: '#38EFF5D4',
//     popoverColor: '#082D53FF' // select的选项背景色
//   },
//   LoadingBar: {
//     colorLoading: '#5ce2ff',
//     colorError: '#d03050',
//     height: '3px'
//   },
//   Spin: {
//     textColor: '#09F4FCFF',
//     color: '#fff',
//     opacitySpinning: '0.3'
//   },
//   Tabs: {
//     colorSegment: '#259eff0d',
//     tabTextColorActiveSegment: '#14fffeFF',
//     tabTextColorHoverSegment: '#14fffeFF',
//     tabTextColorDisabledSegment: '#14FFFEBA',
//     tabColorSegment: '#3EC5FF45',
//     tabTextColorSegment: 'rgba(255, 255, 255, 0.96)'
//   },
//   Radio: {
//     dotColorActive: '#05D2FFFF',
//     buttonBorderColorActive: '#05D2FFFF',
//     buttonBorderColorHover: '#05D2FFFF',
//     buttonColorActive: '#05D2FF00',
//     buttonTextColorHover: '#05D2FFFF',
//     colorActive: '#05D2FFFF',
//     textColor: '#D0E1FFFF',
//     buttonTextColor: '#D0E1FFFF',
//     buttonBorderColor: ' #254685FF',
//     buttonTextColorActive: '#05D2FFFF'
//   },
//   Form: {},
//   DataTable: {
//     borderColor: '#FFFFFF00',
//     borderColorModal: 'transparent',
//     tdColorHover: 'rgba(95,204,255,0.16)',
//     tdColorHoverModal: 'rgba(176,215,255,0.1)',
//     tdColor: 'rgba(255, 255, 255, 0)',
//     tdColorModal: 'transparent',
//     tdColorStriped: 'rgba(255, 255, 255, 0)',
//     tdColorStripedModal: 'rgba(176,215,255,0.05)',
//     thColor: 'rgba(255, 255, 255, 0)',
//     thColorModal: 'rgba(176,215,255,0.2)',
//     tdTextColor: '#FFFFFFFF',
//     thTextColor: '#CCEEFFFF',
//     thFontWeight: '700',
//     thColorPopover: 'rgba(255, 255, 255, 0)',
//     tdColorStripedPopover: 'rgba(255, 255, 255, 0)',
//     tdPaddingMedium: '20px 23px',
//     thPaddingMedium: '12px 23px',
//     fontSizeMedium: '18px'
//   },
//   Pagination: {
//     itemTextColorActive: '#081D42FF',
//     itemColorActive: '#38EFF5FF',
//     itemColorActiveHover: '#38EFF5FF',
//     buttonBorder: '1px solid #B0D7FF33',
//     buttonBorderHover: '1px solid #38EFF5FF',
//     buttonBorderPressed: '1px solid #38EFF5FF',
//     buttonIconColor: '#A2C6EDFF',
//     buttonIconColorHover: '#38EFF5FF',
//     buttonIconColorPressed: '#38EFF5FF',
//     itemTextColorDisabled: '#B0D7FF33',
//     itemColorDisabled: '#B0D7FF24',
//     buttonColor: '#0000',
//     itemTextColor: '#A2C6EDFF',
//     itemColorHover: '#38EFF5FF',
//     itemTextColorHover: '#081D42FF',
//     itemTextColorPressed: '#38EFF5FF',
//     jumperTextColor: '#A2C6EDFF'
//   },
//   Tooltip: {
//     color: '#082D53FF',
//     textColor: '#FFFFFF'
//   }
//   // Modal:{
//   // }
// }

const themeOverrides: GlobalThemeOverrides = {
  DataTable: {
    borderColor: 'red'
  }
}
provide('xjTest', 213)
</script>

<template>
  <!-- <router-view></router-view> -->
  <fs-config-provider>
    <div id="app">
      <router-view />
    </div>
  </fs-config-provider>
</template>

<style lang="less">
@import './assets/less/init.less';
#app {
  height: 100%;
}
.test {
  color: @themeColor;
}
</style>
<style lang="less" scoped module>
.blue {
  color: blue;
}
</style>
