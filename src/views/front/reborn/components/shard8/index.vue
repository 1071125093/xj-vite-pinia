<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-30 00:42:54
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-07-01 13:12:34
 * @Description: 组件功能
 * @FilePath: \my-vite\src\views\front\reborn\components\shard8\index.vue
-->
<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useInitChart, ECOption, EchartsOption } from "@/utils/useInitEchart";
import { RegisteredSeriesOption } from "echarts";
const chartData = ref();
type A = {
  name: string;
  age: number;
  judge: boolean;
};
type Values<T> = T[keyof T];
type all = Values<A>;
const queryData = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        {
          value: 1048,
          name: "Search Engine",
          itemStyle: {
            borderColor: "red",
          },
        },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ];
      resolve(data);
    }, 500);
  });
  chartData.value = res;
};
const moreOption = reactive<ECOption>({});
onMounted(() => {
  queryData();
});
const option = computed<ECOption>(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "40",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1048,
            name: "Search Engine",
            itemStyle: {
              borderColor: "red",
            },
          },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
});
const { chartRef } = useInitChart(option);
</script>
<template>
  <div class="shard">
    <button class="asd" @click="queryData">前端测试</button>
    <div class="test_dom" ref="chartRef"></div>
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
