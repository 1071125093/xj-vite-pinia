<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-28 15:07:39
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard45/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import baseOne from './components/baseOne/index.vue'
import tabList from './components/tabList/index.vue'
const xjTest = ref('规上企业')
const xjUpdate = () => {
  console.log(xjTest.value)
}
const enterpriseOptions = ref([
  {
    label: '规上企业',
    value: '规上企业',
    count: 0,
    unit: '家'
  },
  {
    label: '专精特新中小企业',
    value: '专精特新中小企业',
    count: 0,
    unit: '家'
  },
  {
    label: '专精特新小巨人企业',
    value: '专精特新小巨人企业',
    count: 0,
    unit: '家'
  }
])
const xjTabValue = ref('宁波市')
</script>
<template>
  <div class="shard">
    <!-- <baseOne v-model="xjTest"></baseOne> -->
    我是外面tab的值{{ xjTabValue }}
    <tabList v-model="xjTabValue"></tabList>
    <!-- <n-input v-model:value="xjTest" :onUpdate:value="xjUpdate"></n-input> -->
    <!-- <n-tabs type="line" @update:value="xjUpdate" v-model:value="xjTest" size="small">
      <n-tab :name="tab.label" v-for="tab in enterpriseOptions" :key="tab.label">
        {{ tab.label }}
      </n-tab>
    </n-tabs> -->
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
