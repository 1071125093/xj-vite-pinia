<!--
 * @Author: suzb@hsmap.com
 * @Date: 2022-04-05 12:59:58
 * @LastEditTime: 2023-09-26 14:07:06
 * Copyright (c) 2022 by nick/火石创造, All Rights Reserved. 
-->
<script setup lang="ts">
import { NMessageProvider, NLoadingBarProvider, NDialogProvider } from 'naive-ui'
import { ZConfigProvider, lightTheme, darkTheme, coverThemeDark, coverThemeLight } from '@firestone/zing-ui'
import MessageContent from '@/components/MessageContent.vue'
import LoadingContent from '@/components/LoadingContent.vue'
import { useGXResizeEvent } from '@/utils/useGXResizeEvent'
const theme = inject('theme')
const id = inject('id')
// useGXResizeEvent()
function setColor() {
  const dom = document.getElementById('app') as HTMLElement
  if (theme === 'dark') {
    dom.style.backgroundColor = '#0a1837'
  } else {
    dom.style.backgroundColor = '#F5FAFF'
  }
}

const lightDisk = { primaryColor: '#1492FF', primaryColorHover: '#1492FF' }

const configLightTheme = computed(() => {
  return lightTheme(
    { ...lightDisk }, // 主基础色配置
    {}
  )
})

const darkDisk = { primaryColor: '#05D2FF', primaryColorHover: '#05D2FF' }

const configDarkTheme = computed(() => {
  return darkTheme(
    { ...darkDisk }, // 主基础色配置
    {}
  )
})
coverThemeLight.Popover = {
  textColor: 'rgb(51, 54, 57)',
  color: '#fff'
}

coverThemeDark.Popover = {
  textColor: 'rgba(255, 255, 255, 0.82)'
}

onMounted(() => {
  setColor()
})
</script>
<template>
  <z-config-provider
    :style="{
      height: '100%',
      width: '100%'
    }"
    :theme-name="theme"
    :theme="theme === 'dark' ? configDarkTheme : configLightTheme"
    :n-theme-overrides="theme === 'dark' ? coverThemeDark : coverThemeLight"
    :plugins="{
      echarts: true,
      AMap: {
        _AMapSecurityConfig: {
          securityJsCode: '625c593ac7df8c92ed717c6381e0b3be'
        },
        urlParams: {
          v: '2.0',
          key: '7c2eb821867de6628376e3d8585fbe96',
          plugin: ['AMap.DistrictSearch', 'AMap.Geolocation', 'AMap.HeatMap'].join(',')
        }
      }
    }"
  >
    <n-loading-bar-provider>
      <!-- 头部加载效果 注册 -->
      <LoadingContent />
      <n-message-provider>
        <n-dialog-provider>
          <!-- 全局消息提示 注册 -->
          <MessageContent />
          <router-view :id="id" :theme="theme"></router-view>
          <!-- style="width: 1200px; min-height: calc(100vh); margin: 0 auto; padding-top: 40px; /* transform: translateY(40px); */ padding-bottom: 40px" -->
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </z-config-provider>
</template>

<style lang="less">
@import './assets/less/init.less';
#app {
  height: 100%;
  transform-origin: 0 0;
  width: 1920px;
  height: 1080px;
}
.test {
  color: @themeColor;
}
</style>
<style lang="less" scoped>
.blue {
  color: blue;
}
</style>
