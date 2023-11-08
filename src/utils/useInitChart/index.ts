/*
 * @Author: XiaoJun
 * @Date: 2023-03-16 13:50:41
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-03-28 17:17:12
 * @Description: 我cv我自己
 * @FilePath: /digital-economy/src/utils/useInitChart.ts
 */

import { ref, watch, onMounted, onUnmounted, nextTick, Ref } from 'vue'
import * as echarts from 'echarts'
import { ComposeOption } from 'echarts/core'
import { THEME_COLORS } from './common/index'
import { useAutoplay } from './plugins/useAutoplay'

echarts.registerTheme('fsEcharts', {
  color: THEME_COLORS
})

import { BarSeriesOption, LineSeriesOption, PieSeriesOption, RadarSeriesOption, GaugeSeriesOption } from 'echarts/charts'
//2.引入组件，也就是option选项中的类型
import {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption,
  SingleAxisComponentOption,
  // 数据集组件
  DatasetComponentOption,
  RadarComponentOption,
  GraphicComponentOption
} from 'echarts/components'
// import { getRandomCount } from './common'
/** 全量类型-这个不太好用 */
// type EchartsOption = echarts.EChartsOption
/** 分量类型-用这个，网上CV来的*/
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
  | LegendComponentOption
  | GridComponentOption
  | SingleAxisComponentOption
  | DatasetComponentOption
  | RadarComponentOption
  | GraphicComponentOption
>

interface Config {
  autoplay: boolean
}
/** 折线图 柱状图配置项
 * 丢进来一个响应式的option 谢谢
 * @param {*} option
 * @return {*}
 */
export function useInitChart(option: Ref<ECOption>, config?: Config) {
  const chartRef = ref()
  let myChart: any
  let resizeTimer: any
  let clickCallback: any
  let innerConfig: Config

  const giftCallback = (fn: any) => {
    clickCallback = fn
  }
  /** 初始化ts -- what a noob ts */
  function initBaseConfig() {
    const baseConfig: Config = {
      autoplay: false
    }
    innerConfig = Object.assign(baseConfig, config || {})
  }
  /** 赋予图点击回调能力 */
  function giftChartClick() {
    myChart.getZr().on('click', (params: any) => {
      // 折线柱状图
      const pointInPixel = [params.offsetX, params.offsetY]
      let xIndex // x轴索引
      if (myChart.containPixel('grid', pointInPixel)) {
        xIndex = myChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]
      }
      // 点击到图表其他区域不操作
      if (typeof xIndex !== 'number') {
        return
      }
      clickCallback?.(xIndex)
    })

    myChart.on('click', (params: any) => {
      // 目前用于饼图
      if (params.componentSubType !== 'pie') return
      clickCallback?.(params.dataIndex)
    })
  }
  onMounted(async () => {
    initBaseConfig()
    window.addEventListener('resize', resizeChart)
    await renderChart()
    const { initAutoPlay } = useAutoplay(myChart, option)
    if (innerConfig.autoplay) {
      initAutoPlay()
    }
    watch(
      () => option.value,
      (newV) => {
        if (!newV) return
        renderChart()
        initAutoPlay()
      },
      {
        deep: true
      }
    )
    giftChartClick()
  })
  onUnmounted(() => {
    dispose()
    window.removeEventListener('resize', resizeChart)
  })
  /** 渲染组件 */
  const renderChart = async () => {
    if (!myChart) {
      myChart = echarts.init(chartRef.value, 'fsEcharts')
    } else {
      myChart.clear()
    }
    await nextTick(() => {
      myChart.setOption(option.value, true)
    })
  }

  /** 组件resize监听 */
  const resizeChart = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      myChart.resize()
    }, 400)
  }

  /** 组件销毁 */
  const dispose = () => {
    if (myChart) {
      myChart.dispose()
      myChart = null
    }
  }

  // #region ********** 定制化需求 start **************/
  // #endregion ******* 定制化需求 ~end~ **************/
  return {
    chartRef,
    giftCallback,
    echarts,
    renderChart
  }
}
