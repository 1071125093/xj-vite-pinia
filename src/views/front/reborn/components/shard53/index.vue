<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-12-01 20:46:30
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard53/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { useCurrentTimer } from './noob'
const { initTime, timeData, xjTestState, xjTest } = useCurrentTimer()
const list = ref([
  {
    label: '我',
    value: 0
  }
  // {
  //   label: '我1',
  //   value: 111
  // },
  // {
  //   label: '我2',
  //   value: 222
  // },
  // {
  //   label: '我3',
  //   value: 333
  // }
])
watchEffect(() => {
  // 在这里放置监视数据变化的逻辑
  // timeData.time
  list.value[0]
  console.log('timeData or list changed')
})
const styleCalc = (item: any, index: any) => {
  console.log(item, index)
  return {
    color: 'red',
    border: '1px solid red'
  }
}

// const styleCalc = computed(() => {
//   return (item: any, index: any) => {
//     console.log(item, index)
//     return {
//       color: 'red',
//       border: '1px solid red'
//     }
//   }
// })

onUpdated(() => {
  console.log('我变了')
})

const xjTestStateMore = reactive({
  num: '我' as any
})
const xjTestMore = () => {
  // const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

  xjTestStateMore.num += 1
  // setTimeout(() => {
  //   xjTest()
  // }, 1000)
}

onMounted(() => {
  initTime()
})
</script>
<template>
  <div class="shard">
    <n-button @click="xjTestMore">点我</n-button>
    <!-- <n-button @click="xjTest">点我</n-button> -->
    <div>{{ xjTestStateMore.num }}</div>
    <!-- <div>{{ xjTestState.num }}</div> -->
    <div>
      {{ timeData.time }}
    </div>
    <div class="xj-test">
      <div class="item" v-for="(item, index) in list" :key="item.label" :style="styleCalc(item, index)">{{ item.label }}</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
