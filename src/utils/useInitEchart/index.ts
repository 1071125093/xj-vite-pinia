import { App, createApp, HTMLAttributes, StyleHTMLAttributes, StyleValue } from 'vue'
/*
 * @Author: HuangXiaojun
 * @Date: 2022-06-30 12:40:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 20:14:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/utils/useInitEchart/index.ts
 */
import { ComputedRef, Component } from 'vue'
import * as echarts from 'echarts'
// 1.我们引入了线图和bar图，所以这里我们引入了两者的类型
import { ComposeOption } from 'echarts/core'
import {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  GaugeSeriesOption,
} from 'echarts/charts'
//2.引入组件，也就是option选项中的类型
import {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  // 数据集组件
  DatasetComponentOption,
  RadarComponentOption,
  GraphicComponentOption,
} from 'echarts/components'
export type EchartsOption = echarts.EChartsOption
// 3.通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  // seriesOption
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  // 其他Option
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | RadarComponentOption
  | GraphicComponentOption
>
// 4.将这个类型暴露出去
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import Module from 'module'
/**折线图 柱状图配置项
 * @param {*} props
 * @param {*} option
 * @return {*}
 */
export function useInitChart(option: ComputedRef<ECOption>) {
  const chartRef = ref(null)
  let myChart: echarts.ECharts
  let resizeTimer: NodeJS.Timeout
  onMounted(() => {
    window.addEventListener('resize', resizeChart)
    renderChart()
    watch(
      () => option.value,
      (newV) => {
        if (!newV) return
        renderChart()
      },
      {
        deep: true,
      }
    )
  })
  function dispose() {
    if (myChart) {
      myChart.dispose()
      myChart = null
    }
  }
  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    dispose()
  })
  function renderChart() {
    if (!myChart) {
      myChart = echarts.init(chartRef.value)
    } else {
      myChart.clear()
    }
    nextTick(() => {
      myChart.setOption(option.value, true)
    })
  }
  function resizeChart() {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      myChart.resize()
    }, 400)
  }
  return {
    chartRef,
    echarts,
  }
}
export const loadComponent = (component: any) => {
  return new Promise((resolve) => {
    if (typeof component === 'function') {
      component().then((res: any) => {
        resolve(res.default)
      })
    } else {
      resolve(component)
    }
  })
}
// export const echarts
