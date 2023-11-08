<!--
 * @Author: XiaoJun
 * @Date: 2023-10-16 13:49:45
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-10-25 13:44:15
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard52/components/QuzhouProblem.vue
-->
<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/
// #endregion ******* 右侧列表 ~end~ **************/

// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 产业产值 start **************/
const industryMoneyState = reactive({
  currentTabValue: 1,
  tabs: [
    {
      label: '医药健康产业产值',
      value: 1
    },
    {
      label: '新增产值',
      value: 2
    }
  ]
})
const industryMoneyChartLake = ref([])

const industryMoneyChartData = computed(() => {
  return {
    seriesPiece: [
      {
        name: '完成值',
        type: 'bar',
        data: industryMoneyChartLake.value.map((mi) => mi.totalOutput),
        meta: {
          unit: '亿元'
        }
      },
      {
        name: '目标值',
        type: 'bar',
        data: industryMoneyChartLake.value.map((mi) => mi.targetOutput),
        meta: {
          unit: '亿元'
        }
      }
    ],
    xAxisData: ['2020', '2021', '2022']
  }
})
// const industryMoneyInfo = computed(()=>{

// })
/** 产业产值相关查询 */
const industryMoneyQuery = async () => {
  setTimeout(() => {
    xjTest.value = {
      seriesPiece: [
        {
          name: '我我我我',
          type: 'line',
          data: ['40', '20', '30', '80', '30'],
          meta: {
            unit: '次'
          }
        },
        {
          name: '12321312321我我我',
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
  }, 3000)
}
const xjTest = ref()

// #endregion ******* 产业产值 ~end~ **************/

// #region ********** 初始化相关 start **************/
/** 开始初始化 */
const startInit = () => {
  industryMoneyQuery()
}
onMounted(() => {
  startInit()
})
// #endregion ******* 初始化相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="quzhou-problem">
    <div class="echarts-sample">
      <n-space>
        <div class="the-mini-container"></div>
        <div class="the-mini-container">
          <MixChartOne :chartData="xjTest"></MixChartOne>
        </div>
      </n-space>
    </div>
  </div>
</template>
<style lang="less" scoped>
:deep(.n-data-table-th__title) {
  .n-ellipsis--line-clamp {
    display: -webkit-box;
  }
  // .n-ellipsis--line-clamp {
  //   -webkit-line-clamp: inherit !important;
  // }
}
.echarts-sample {
  .the-mini-container {
    width: 400px;
    height: 300px;
  }
}
</style>
