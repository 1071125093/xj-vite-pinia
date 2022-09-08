<script lang="ts" setup>
//#region ********** 库&组件等引入 start **************/
import { computed, ref } from 'vue'
import pageOne from './components/pageOne.vue'
import pageTwo from './components/pageTwo.vue'
import pageThree from './components/pageThree.vue'
//#endregion ******* 库&组件等引入 ~end~ **************/

//#region ********** 通用部分 start **************/
//#endregion ******* 通用部分 ~end~ **************/

//#region ********** tabs start **************/
const calcTabs = computed(() => {
  return [
    {
      label: 'pageOne',
      component: pageOne,
    },
    {
      label: 'pageTwo',
      component: pageTwo,
    },
    {
      label: 'pageThree',
      component: pageThree,
    },
  ]
})
const activeTabName = ref('ProvideInject')
const currentTab = computed(() => {
  return calcTabs.value.find((item) => item.label === activeTabName.value)
})
//#endregion ******* tabs ~end~ **************/

//#region ********** 测试区域 start **************/
//#endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="default_class">
    <el-tabs v-model="activeTabName" class="demo-tabs">
      <el-tab-pane v-for="tab in calcTabs" :key="tab.label" :label="tab.label" :name="tab.label">
      </el-tab-pane>
    </el-tabs>
    {{ currentTab?.label }}
    <component :is="currentTab?.component"></component>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
