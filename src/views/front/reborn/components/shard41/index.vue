<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
import axios from 'axios'
import * as echarts from 'echarts'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const theFuck = ref()
const myChart = ref()

// #endregion ******* 通用部分 ~end~ **************/
const visualMapColors = ['#196BD7', '#4D9AFF', '#BDE8F9', '#FFFCA9', '#FFC26A']
const dataList = ref([
  {
    name: '浙江省',
    value: 100
  },
  {
    name: '江西省',
    value: 54
  },
  {
    name: '河南省',
    value: 13
  },
  {
    name: '安徽省',
    value: 40
  },
  {
    name: '重庆',
    value: 75
  }
])
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  visualMap: {
    type: 'continuous',
    orient: 'vertical',
    min: 0,
    max: 100,
    left: '3%',
    bottom: '5%',
    calculable: true,
    inRange: {
      color: visualMapColors
    },
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      name: '企业数量',
      type: 'map',
      map: 'china',
      selectedMode: 'false',
      label: {
        show: true,
        shadowColor: 'rgba(10, 12, 68, 1)',
        shadowBlur: 2,
        fontSize: 14,
        position: 'inside'
      },
      itemStyle: {
        label: {
          show: true,
          textBorderWidth: 3
        },
        borderWidth: 1
      },
      layoutSize: '130%',
      layoutCenter: ['50%', '65%'],
      data: dataList.value as any
    }
  ]
}

onMounted(async () => {
  await axios.get('/public/static/china.json').then((res) => {
    echarts.registerMap('china', res.data)
  })
  myChart.value = echarts.init(theFuck.value)
  myChart.value.setOption(option)
  setTimeout(() => {
    myChart.value.setOption(option)
  })
})

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="xj-fuck" ref="theFuck">填充内容</div>
</template>
<style lang="less" scoped>
.xj-fuck {
  width: 800px;
  height: 600px;
}
</style>
