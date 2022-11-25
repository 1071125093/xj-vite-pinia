<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 00:11:08
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-23 15:48:09
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
      component: markRaw(shard1),
    },
    {
      label: '单例模式',
      component: markRaw(shard2),
    },
    {
      label: '适配器模式',
      component: markRaw(shard3),
    },
    {
      label: '装饰者模式',
      component: markRaw(shard4),
    },
    {
      label: '状态模式',
      component: markRaw(shard5),
    },
    {
      label: '策略模式',
      component: markRaw(shard6),
    },
    {
      label: 'vueUse',
      component: markRaw(shard7),
      show: true,
    },
    {
      label: 'echarts',
      component: markRaw(shard8),
    },
    {
      label: 'Ts',
      component: markRaw(shard9),
    },
    {
      label: '递归组件',
      component: markRaw(shard10),
      show: true,
    },
    {
      label: 'setup语法糖',
      component: markRaw(shard11),
      show: true,
    },
    {
      label: 'pinia',
      component: markRaw(shard12),
      show: true,
    },
    {
      label: 'css布局',
      component: markRaw(shard13),
      show: true,
    },
    {
      label: '正则表达式',
      component: markRaw(shard14),
    },
    {
      label: '全局&局部组件代码提示',
      component: markRaw(shard15),
    },
    {
      label: '钩子',
      component: markRaw(shard16),
      show: true,
    },
    {
      label: '过渡效果',
      component: markRaw(shard17),
    },
    {
      label: '异步组件',
      component: markRaw(shard18),
    },
    {
      label: '防抖节流',
      component: markRaw(shard19),
    },
    {
      label: '算法',
      component: markRaw(shard20),
    },
    {
      label: 'd3js',
      component: markRaw(shard21),
      show: true,
    },
    {
      label: '鼠标事件',
      component: markRaw(shard22),
      show: true,
    },
    {
      label: 'setup无根组件形式',
      component: markRaw(shard23),
    },
    {
      label: 'xjModalDialog',
      component: markRaw(shard24),
      show: true,
    },
    {
      label: 'elementUI生吃',
      component: markRaw(shard25),
    },
    {
      label: 'vue2测试',
      component: markRaw(shard26),
    },
    {
      label: 'vue.draggable',
      component: markRaw(shard27),
    },
    {
      label: '.env测试',
      component: markRaw(shard28),
    },
    {
      label: '贪吃蛇',
      component: markRaw(shard29),
    },
    {
      label: ':is测试',
      component: markRaw(shard30),
    },
    {
      label: 'node接口',
      component: markRaw(shard31),
      show: true,
    },
    {
      label: 'monaco-editor',
      component: markRaw(shard32),
      show: true,
    },
    {
      label: 'vitest',
      component: markRaw(shard33),
      show: true,
    },
    {
      label: 'vue3官网',
      component: markRaw(shard34),
      show: true,
    },
  ].filter((item) => item.show)
})
const activeTabName = ref('ProvideInject')
const currentTab = computed(() => {
  return tabs.value.find((item) => item.label === activeTabName.value)
})
</script>
<template>
  <div class="reborn">
    <el-tabs v-model="activeTabName" class="demo-tabs">
      <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.label">
      </el-tab-pane>
    </el-tabs>
    <component :is="currentTab?.component"></component>
    <shard9></shard9>
  </div>
</template>
<style lang="less" scoped>
.reborn {
}
</style>
