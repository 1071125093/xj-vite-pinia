<!--
 * @Author: XiaoJun
 * @Date: 2023-02-16 16:38:11
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-25 13:42:56
 * @Description: 可爱的混合图一号
 * @FilePath: /xj-vite-pinia/src/components/echarts/mix/mixChartOne/index.vue
-->

<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { useInitChart, ECOption } from '@/utils/useInitChart'
import { computed } from 'vue'
import * as echarts from 'echarts'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    // seriesPiece?: ECOption[]
    chartData: FsC.MixChartOneChartData
    legendFlag?: boolean
    barWidth?: number
    showBarTopLabel: boolean // 是否展示柱状图顶部的值
    // seriesPiece: Pick<Asd, 'name'>[]
    // seriesPiece: Utils.GetTypeFromObj<ECOption, 'series'>
  }>(),
  {
    width: '100%',
    height: '100%',
    chartData: () => {
      return {
        seriesPiece: [
          {
            name: '轮次',
            type: 'line',
            data: ['40', '20', '30', '80', '30'],
            meta: {
              unit: '次'
            }
          },
          {
            name: '融资金额A',
            type: 'bar',
            data: ['70', '20', '60', '80', '30'],
            meta: {
              unit: '万元'
            }
          },
          {
            name: '融资金额B',
            type: 'bar',
            data: ['70', '20', '60', '80', '30'],
            meta: {
              unit: '万元'
            }
          }
        ],
        xAxisData: ['2019', '2020', '2021', '2022', '2023']
      }
    },
    legendFlag: true,
    barWidth: 16,
    showBarTopLabel: false
  }
)

const emit = defineEmits(['clickBar'])
// #endregion ******* define区域 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

const getMyUnit = (index: number) => {
  let theItem: U.GetType<FsC.MixChartOneChartData['seriesPiece']> | undefined
  // 不知道为什么 echarts好像默认柱状图的y轴在左
  if (index === 0) {
    theItem = props.chartData.seriesPiece.find((item) => item.type === 'bar')
  } else {
    theItem = props.chartData.seriesPiece.find((item) => item.type === 'line')
  }
  if (theItem?.meta?.unit) {
    return `单位：${theItem?.meta?.unit}`
  } else {
    return ''
  }
  // return props.chartData.seriesPiece[index]?.meta?.unit || '暂无'
}

// const isSingleBar = computed(() => {
//   return props.chartData.seriesPiece.filter((item) => item.type === 'bar')?.length === 1
// })
const onlySingleLine = true
// watch(
//   () => props.chartData.seriesPiece,
//   (newV) => {
//     if (newV?.length === 1 && newV.filter((item) => item.type === 'line')?.length === 1) {
//       onlySingleLine.value = true
//     } else {
//       onlySingleLine.value = false
//     }
//   },
//   {
//     immediate: true
//   }
// )
const hasLine = true
// watch(
//   () => props.chartData.seriesPiece,
//   (newV) => {
//     if (newV.filter((item) => item.type === 'line')?.length >= 1) {
//       hasLine.value = true
//     } else {
//       hasLine.value = false
//     }
//   },
//   {
//     immediate: true
//   }
// )

const calcOption = computed<ECOption>(() => {
  return {
    grid: {
      top: '20%',
      bottom: props.legendFlag ? '14%' : '4%',
      left: '3%',
      right: '20',
      containLabel: true
    },
    legend: [
      {
        show: props.legendFlag,
        bottom: '0%',
        textStyle: {
          color: '#80A4C9'
        }
      }
    ],
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: function (param: any) {
        let topStr = `${param[0].name}<br>`
        let listStr = param
          .map((item: any, index: number) => {
            const meta = props.chartData.seriesPiece[index]?.meta
            let unit = meta?.unit || ''
            let theValStr
            if (item.value) {
              theValStr = `${item.value}${unit}`
              // theValStr = `${Number(item.value).toFixed(meta?.toFixed || 2)}${unit}`
            } else {
              theValStr = '-'
            }

            return `${item.marker}${item.seriesName}：${theValStr}<br>`
            // if (item.value) {
            //   return `${item.marker}${item.seriesName}：${Number(
            //     item.value
            //   ).toFixed(meta?.toFixed || 0)}${unit}<br>`
            // } else {
            //   return ''
            // }
          })
          .join('')
        return topStr + listStr
      }
    },
    xAxis: [
      {
        type: 'category',
        data: props.chartData.xAxisData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          // rotate: 30,
          color: 'rgba(138, 171, 204, 1)',
          fontSize: 12
        }
      }
    ],
    yAxis: [
      {
        name: getMyUnit(0),
        nameTextStyle: {
          color: '#999999' // 设置 Y 轴名称的颜色为蓝色
        },
        type: 'value',
        minInterval: 1,
        splitLine: {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#E6E6E6',
            opacity: 1
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#999999',
          fontSize: 12,
          formatter: '{value}'
        }
      },
      {
        name: getMyUnit(1),
        nameTextStyle: {
          color: '#999999' // 设置 Y 轴名称的颜色为蓝色
        },
        type: 'value',
        scale: false,
        max() {
          try {
            return Math.max(...(props.chartData.seriesPiece[1].data as any)) || 100
          } catch (error) {
            return undefined
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          color: '#999999',
          fontSize: 12,
          formatter: '{value}'
        }
      }
    ],
    series: props.chartData.seriesPiece.map((item, index) => {
      if (item.type === 'bar') {
        return {
          name: item.name,
          label: {
            show: props.showBarTopLabel, // 显示标签
            position: 'top', // 标签位置（也可以是 insideTop）
            color: 'rgba(40, 255, 219, 1)', // 标签颜色
            fontSize: 12, // 标签字体大小
            formatter: '{c}' // 标签内容格式，{c} 表示数据值
          },
          type: 'bar',
          symbol: 'none',
          stack: hasLine ? 'total' : '',
          barWidth: props.barWidth,
          data: item.data,
          itemStyle: {
            color(params) {
              return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: `${params.color}` },
                { offset: 1, color: `${params.color}33` }
              ])
            },
            barBorderRadius: [4, 4, 0, 0],
            ...item?.meta?.itemStyle
          },
          ...(item.meta?.moreSeriesConfig || {})
        }
      } else {
        return {
          name: item.name,
          type: 'line',
          symbol: 'circle',
          symbolSize: 0,
          yAxisIndex: index,
          data: item.data,
          ...item?.meta?.itemStyle,
          areaStyle: onlySingleLine
            ? {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(142, 253, 244, 1)'
                      },
                      {
                        offset: 1,
                        color: 'rgba(85, 251, 230, 0.20)'
                      }
                    ],
                    false
                  ),
                  shadowColor: 'rgba(108,80,243, 0.9)',
                  shadowBlur: 20
                }
              }
            : null
        }
      }
    })
  }
})
const { chartRef, giftCallback, renderChart } = useInitChart(calcOption)
giftCallback((params: any) => {
  emit('clickBar', params)
})

// #region ********** 测试区域 start **************/
defineExpose({
  renderChart
})
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div ref="chartRef" class="echarts_ref"></div>
</template>
<style lang="less" scoped>
.echarts_ref {
  // width: 100%;
  // height: 100%;
  width: v-bind(width);
  height: v-bind(height);
  color: #38b2f44d;
}
</style>
