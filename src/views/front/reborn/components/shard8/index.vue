<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-30 00:42:54
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-06-05 15:31:51
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard8/index.vue
-->
<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useInitChart, ECOption, EchartsOption } from '@/utils/useInitEchart'
import { RegisteredSeriesOption } from 'echarts'
const chartData = ref()
type A = {
  name: string
  age: number
  judge: boolean
}
type Values<T> = T[keyof T]
type all = Values<A>
const queryData = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          value: 1048,
          name: 'Search Engine',
          itemStyle: {
            borderColor: 'red'
          }
        },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
      resolve(data)
    }, 500)
  })
  chartData.value = res
}
const moreOption = reactive<ECOption>({})
onMounted(() => {
  queryData()
})


const option = computed<any>(() => {
  return {
    title: {
      text: 'Les Miserables',
      subtext: 'Default layout',
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: [
      {
        // selectedMode: 'single',
        data: graph.categories.map(function (a) {
          return a.name
        })
      }
    ],
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'none',
        data: graph.nodes,
        links: graph.links,
        categories: graph.categories,
        roam: true,
        label: {
          position: 'right',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: {
            width: 10
          }
        }
      }
    ]
  }
})
const { chartRef } = useInitChart(option)
</script>
<template>
  <div class="shard">
    <button class="asd" @click="queryData">前端测试</button>
    <div ref="chartRef" class="test_dom"></div>
  </div>
</template>
<style lang="less" scoped>
.shard {
  position: relative;
  .test_dom {
    margin-left: 300px;
    width: 400px;
    height: 300px;
  }
}
</style>
