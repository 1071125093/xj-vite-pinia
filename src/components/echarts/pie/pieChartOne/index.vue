<!--
 * @Author: XiaoJun
 * @Date: 2023-02-16 15:11:52
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-24 17:53:32
 * @Description: 可爱的饼图-1号
 * @FilePath: /fd-taizhou-medical-city/src/components/echarts/pie/pieChartOne/index.vue
-->

<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import { useInitChart, ECOption } from '@/utils/useInitChart'
import { computed } from 'vue'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
type PiechartOneData = {
  name: string
  value: number
  unit?: string
}
const props = withDefaults(
  defineProps<{
    data?: PiechartOneData[]
    name?: string
    width?: string
    height?: string
    diam?: number // 直径
    showCenter?: boolean
    offset?: number[]
  }>(),
  {
    data: (): PiechartOneData[] => {
      return [
        {
          name: '化学药',
          value: 18,
          unit: '位'
        },
        {
          name: '体外诊断',
          value: 12,
          unit: '位'
        },
        {
          name: '诊断',
          value: 10,
          unit: '位'
        },
        {
          name: '化药',
          value: 18,
          unit: '位'
        }
      ]
    },
    name: '',
    width: '100%',
    height: '100%',
    diam: 180,
    showCenter: false,
    offset: () => [0, 0]
  }
)
//
// #endregion ******* define区域 ~end~ **************/

// #region ********** 通用部分 start **************/
const theCenterValue = computed(() => {
  return `${props.data
    .map((item) => item.value)
    ?.reduce((preV, sufV) => Number(preV) + Number(sufV), 0)}`
})
// #endregion ******* 通用部分 ~end~ **************/

const calcOption = computed<ECOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        return `${params.data.name}     ${params.data.value}   ${params.data.unit || '家'}  `
      },
      className: 'tooltip-dark'
    },
    legend: {
      type: 'scroll',
      // 禁用图例的悬停效果
      show: true,
      top: 'center',
      // left: props.diam + 122 + props.offset[0],
      right: 0,
      itemWidth: 10,
      itemHeight: 10,
      height: '100%',
      orient: 'vertical',
      itemStyle: {
        borderWidth: 0
      },
      // icon: `path://M558.5999755859375,960.2000122070312l-156.99996948242188,
      // 0c-27.5,0,-50,-22.5,-50,-50l0,-795.0000152587891c0,-27.5,22.5,-50,50,-50l157.10000610351562,0c27.5,0,50,22.5,50,50l0,
      // 795.0999908447266c-0.10003662109375,27.4000244140625,-22.60003662109375,49.9000244140625,-50.10003662109375,49.9000244140625Z`,
      // pageIconColor: '#2f4554',
      // pageIconInactiveColor: '#aaa',
      pageIconColor: '#28FFDB',
      pageIconInactiveColor: '#BCE2FF',
      formatter: function (name: any) {
        if (name) {
          const itemInfor = props.data.find((item) => item.name === name)
          if (itemInfor) {
            return `{name|${name}}{value|${itemInfor.value || 0}}{unit|${
              itemInfor.unit ? itemInfor.unit : ''
            }}`
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      textStyle: {
        lineHeight: 10,
        rich: {
          name: {
            fontSize: 14,
            color: '#666666',
            width: 70 - props.offset[0] * 2,
            overflow: 'truncate',
            ellipsis: '...'
          },
          value: {
            fontSize: 14,
            align: 'right',
            color: '#666666',
            width: 50
          },
          unit: {
            fontSize: 14,
            color: '#666666',
            align: 'right',
            padding: [0, 0, 0, 10]
          }
        }
      },
      pageTextStyle: {
        color: '#A2C8ED' // 文字颜色
        // fontSize: 14,   // 文字大小
        // fontStyle: 'italic',  // 文字样式
        // fontWeight: 'bold',    // 文字粗细
        // fontFamily: 'Arial',   // 文字字体
      }
    },
    title: props.showCenter
      ? {
          text: `{title|${props.name}}\n{val|${theCenterValue.value}$}`,
          // text: `{val|${theCenterValue.value}}({unit|${props.data[0]?.unit}})`,
          // top: 'center',
          top: props.diam * 0.7 + props.offset[1],
          left: props.diam * 0.32 + props.offset[0],
          textStyle: {
            align: 'center',
            rich: {
              title: {
                lineHeight: 24,
                fontSize: 20,
                fontWeight: 'bold',
                color: '#000'
              },
              val: {
                lineHeight: 36,
                fontSize: 24,
                fontWeight: 'bold',
                color: '#00DAFF'
              },
              unit: {
                height: 16,
                fontSize: 16,
                color: '#00DAFF'
              }
            }
          }
        }
      : {},
    series: [
      {
        type: 'pie',
        radius: ['70%', '90%'],
        legendHoverLink: false,
        center: [0.5 * props.diam + props.offset[0], 'center'],
        data: props.data.map((item) => {
          return {
            itemStyle: {
              borderWidth: 2,
              borderRadius: 0,
              borderColor: '#fff'
            },
            ...item
          }
        }),
        width: props.diam,
        label: {
          show: false,
          position: 'center',
          formatter(params: { name: any; value: any; data: any }) {
            if (params.name) {
              return `{value|${params.value}${params.data?.unit}\n}{name|${params.name}}`
            }
            return ''
          },
          rich: {
            name: {
              color: '#000',
              fontSize: 14,
              lineHeight: 24,
              align: 'center'
            },
            value: {
              color: '#000',
              fontSize: 24,
              lineHeight: 24,
              align: 'center',
              fontWeight: 700,
              fontStyle: 'italic'
            },
            unit: {
              color: '#000',
              fontSize: 12,
              lineHeight: 30,
              align: 'center'
            }
          }
        },
        emphasis: {
          label: {
            show: props.showCenter ? false : true
          },
          scaleSize: 10,
          scale: true
        }
      }
    ]
  }
})
const { chartRef, giftCallback } = useInitChart(calcOption, {
  autoplay: props.showCenter ? false : true
})
const emit = defineEmits(['clickPie'])
giftCallback((params: any) => {
  emit('clickPie', params)
})
// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div ref="chartRef" class="pie-chart-one echarts-ref"></div>
</template>
<style lang="less" scoped>
.echarts-ref {
  // width: 100%;
  // height: 100%;
  width: v-bind(width);
  height: v-bind(height);
}
</style>
