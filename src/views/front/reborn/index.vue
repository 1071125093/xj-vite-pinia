<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 00:11:08
 * @LastEditors: XiaoJun
 * @LastEditTime: 2024-05-30 14:33:33
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/index.vue
-->
<script lang="ts" setup>
import { ref, markRaw, computed } from 'vue'
import shard1 from './components/shard1/index.vue'
import shard2 from './components/shard2/index.vue'
import shard3 from './components/shard3/index.vue'
import shard4 from './components/shard4/index.vue'
import shard5 from './components/shard5/index.vue'
import shard6 from './components/shard6/index.vue'
import shard7 from './components/shard7/index.vue'
import shard8 from './components/shard8/index.vue'
import shard9 from './components/shard9/index.vue'
// TIPS:
import shard10 from './components/shard10/index.vue'
import shard11 from './components/shard11/index.vue'
import shard12 from './components/shard12/index.vue'
import shard13 from './components/shard13/index.vue'
import shard14 from './components/shard14/index.vue'
import shard15 from './components/shard15/index.vue'
import shard16 from './components/shard16/index.vue'
import shard17 from './components/shard17/index.vue'
import shard18 from './components/shard18/index.vue'
import shard19 from './components/shard19/index.vue'
import shard20 from './components/shard20/index.vue'
import shard21 from './components/shard21/index.vue'
import shard22 from './components/shard22/index.vue'
import shard23 from './components/shard23/index.vue'
import shard24 from './components/shard24/index.vue'
import shard25 from './components/shard25/index.vue'
import shard26 from './components/shard26/index.vue'
import shard27 from './components/shard27/index.vue'
import shard28 from './components/shard28/index.vue'
import shard29 from './components/shard29/index.vue'
import shard30 from './components/shard30/index.vue'
import shard31 from './components/shard31/index.vue'
import shard32 from './components/shard32/index.vue'
import shard33 from './components/shard33/index.vue'
import shard34 from './components/shard34/index.vue'
import shard35 from './components/shard35/index.vue'
import shard36 from './components/shard36/index.vue'
import shard37 from './components/shard37/index.vue'
import shard38 from './components/shard38/index.vue'
import shard39 from './components/shard39/index.vue'
import shard40 from './components/shard40/index.vue'
import shard41 from './components/shard41/index.vue'
import shard42 from './components/shard42/index.vue'
import shard43 from './components/shard43/index.vue'
import shard44 from './components/shard44/index.vue'
import shard45 from './components/shard45/index.vue'
import shard46 from './components/shard46/index.vue'
import shard47 from './components/shard47/index.vue'
import shard48 from './components/shard48/index.vue'
import shard49 from './components/shard49/index.vue'
import shard50 from './components/shard50/index.vue'
import shard51 from './components/shard51/index.vue'
import shard52 from './components/shard52/index.vue'
import shard53 from './components/shard53/index.vue'
import shard54 from './components/shard54/index.vue'
import { piniaSystem } from '@/store'
// 测试
// 测试
/**
 * @param {*} computed
 * @return {*}
 */
const tabs = computed(() => {
  return [
    {
      label: '工厂模式',
      component: markRaw(shard1)
    },
    {
      label: '单例模式',
      component: markRaw(shard2)
    },
    {
      label: '适配器模式',
      component: markRaw(shard3)
    },
    {
      label: '装饰者模式',
      component: markRaw(shard4)
    },
    {
      label: '状态模式',
      component: markRaw(shard5)
    },
    {
      label: '策略模式',
      component: markRaw(shard6)
    },
    {
      label: 'vueUse',
      component: markRaw(shard7),
      show: true
    },
    {
      label: 'echarts',
      component: markRaw(shard8)
    },
    {
      label: 'Ts',
      component: markRaw(shard9),
      show: true
    },
    {
      label: '递归组件',
      component: markRaw(shard10),
      show: true
    },
    {
      label: 'setup语法糖',
      component: markRaw(shard11),
      show: true
    },
    {
      label: 'pinia',
      component: markRaw(shard12),
      show: true
    },
    {
      label: 'css布局',
      component: markRaw(shard13),
      show: true
    },
    {
      label: '正则表达式',
      component: markRaw(shard14)
    },
    {
      label: '全局&局部组件代码提示',
      component: markRaw(shard15)
    },
    {
      label: '钩子',
      component: markRaw(shard16),
      show: true
    },
    {
      label: '过渡效果',
      component: markRaw(shard17)
    },
    {
      label: '异步组件',
      component: markRaw(shard18),
      show: true
    },
    {
      label: '防抖节流',
      component: markRaw(shard19)
    },
    {
      label: '算法',
      component: markRaw(shard20)
    },
    {
      label: 'd3js',
      component: markRaw(shard21)
    },
    {
      label: '鼠标事件',
      component: markRaw(shard22)
    },
    {
      label: 'setup无根组件形式',
      component: markRaw(shard23),
      show: true
    },
    {
      label: 'xjModalDialog',
      component: markRaw(shard24)
    },
    {
      label: 'elementUI生吃',
      component: markRaw(shard25)
    },
    {
      label: 'vue2测试',
      component: markRaw(shard26)
    },
    {
      label: 'vue.draggable',
      component: markRaw(shard27),
      show: true
    },
    {
      label: '.env测试',
      component: markRaw(shard28)
    },
    {
      label: '贪吃蛇',
      component: markRaw(shard29)
    },
    {
      label: ':is测试',
      component: markRaw(shard30)
    },
    {
      label: 'node接口',
      component: markRaw(shard31)
    },
    {
      label: 'monaco-editor',
      component: markRaw(shard32)
    },
    {
      label: 'vitest',
      component: markRaw(shard33)
    },
    {
      label: 'vue3官网',
      component: markRaw(shard34)
    },
    {
      label: 'node接口测试-fsExtra',
      component: markRaw(shard35)
    },
    {
      label: 'TS最新测试+Node+vue3工具类学习',
      component: markRaw(shard36)
    },
    {
      label: 'node文件上传',
      component: markRaw(shard37)
    },
    {
      label: '高德地图',
      component: markRaw(shard38),
      show: true
    },
    {
      label: 'tsx测试',
      component: markRaw(shard39)
    },
    {
      label: 'npm包',
      component: markRaw(shard40)
    },
    {
      label: '很奇怪的echarts地图bug',
      component: markRaw(shard41)
    },
    {
      label: 'gtmd天地图',
      component: markRaw(shard42)
    },
    {
      label: 'vue3.3',
      component: markRaw(shard43)
    },
    {
      label: '事件透传问题',
      component: markRaw(shard44)
    },
    {
      label: '理解受控和非受控',
      component: markRaw(shard45)
    },
    {
      label: '试试playground',
      component: markRaw(shard46)
    },
    {
      label: '试试ts自动生成',
      component: markRaw(shard47)
    },
    {
      label: 'v3指令',
      component: markRaw(shard48)
    },
    {
      label: '表格render',
      component: markRaw(shard49)
    },
    {
      label: '弹窗问题优化',
      component: markRaw(shard50)
    },
    {
      label: '组件库utils开发',
      component: markRaw(shard51)
    },
    {
      label: '我裂开了',
      component: markRaw(shard52)
    },
    {
      label: '测试海龙的鬼东西',
      component: markRaw(shard53)
    },
    {
      label: 'nest项目分页器',
      component: markRaw(shard54),
      show: true
    }
  ].filter((item) => item.show)
})
// const activeTabName = ref('继承naiveui组件')
// const activeTabName = ref('弹窗问题优化')
const currentTab = computed(() => {
  return tabs.value.find((item) => item.label === piniaSystem.currentTabName)
})
</script>
<template>
  <div class="reborn">
    <el-tabs v-model="piniaSystem.currentTabName" class="demo-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.label"></el-tab-pane>
    </el-tabs>
    <component class="the-noob" :is="currentTab?.component"></component>
  </div>
</template>
<style lang="less" scoped>
.reborn {
  display: flex;
  flex-direction: column;
  height: 100%;
  .the-noob {
    flex: 1;
    // min-height: 600px;
    // height: 100%;
    overflow-y: auto;
  }
}
</style>
