<!--
 * @Author: XiaoJun
 * @Date: 2022-08-31 15:38:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-08 10:38:25
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard29/index.vue
-->
<script lang="ts" setup>
//#region ****** 库等引入 start **********/
import { onMounted, ref } from 'vue'
//#endregion *** 库等引入 end   **********/

//#region ****** 公共属性 start **********/
let width = ref(600) // 地图默认宽度
let height = ref(400) // 地图默认高度
let canvas: any = null // canvas 对象
let ctx: any = null // canvas 渲染上下文对象
let snakeList = [
  [0, 100],
  [10, 100],
] // 蛇的点位坐标
let direction = 'ArrowRight' // top | down | left | right // 当前方向
let elementWidth = 10 // 元素尺寸
let step = 10 // 速度
let store = ref(0) // 分数
let status = ref('start') // unStart | start | pause ｜ over | success(通关) // 状态
let foodCoordinate: any = [
  ((Math.random() * width.value) / 10) | 0,
  ((Math.random() * height.value) / 10) | 0,
] // 食物坐标
let process: any = null // 定时器 Id
//#endregion *** 公共属性 end   **********/

function handleInit() {
  canvas = document.getElementById('canvas')

  if (canvas?.getContext) {
    ctx = canvas?.getContext('2d')

    canvas.addEventListener('mousemove', (e) => {
      ctx.clearRect(10, height.value - 20, 120, 40)
      ctx.fillText(`当前鼠标位置：${e.offsetX}, ${e.offsetY}`, 10, height.value - 10)
    })

    document.addEventListener('keydown', (e) => {
      e.preventDefault()
      direction = e.key
    })
    process = setInterval(handleRenderSnake, 150)
    handleRenderFood()
    // window.requestAnimationFrame(handleRenderSnake)
  } else {
  }
}

// 绘制食物
function handleRenderFood() {
  ctx.clearRect(foodCoordinate[0], foodCoordinate[1], 10, 10)
  foodCoordinate = [(Math.random() * width.value) | 0, (Math.random() * height.value) | 0]
  ctx.fillStyle = '#eb2f96'
  ctx.fillRect(foodCoordinate[0], foodCoordinate[1], 10, 10)
}

function handleRenderSnake() {
  switch (direction) {
    case 'ArrowUp':
      if (snakeList.slice(-1)[0][1] <= 0) {
        status.value = 'over'
        return
      }

      snakeList.push([
        snakeList[snakeList.length - 1][0],
        snakeList[snakeList.length - 1][1] - step,
      ])
      handleUpdateVerify()
      break
    case 'ArrowDown':
      if (snakeList.slice(-1)[0][1] >= height.value - 1) {
        status.value = 'over'
        return
      }

      snakeList.push([
        snakeList[snakeList.length - 1][0],
        snakeList[snakeList.length - 1][1] + step,
      ])
      handleUpdateVerify()

      break
    case 'ArrowLeft':
      if (snakeList.slice(-1)[0][0] <= 0) {
        status.value = 'over'
        return
      }

      snakeList.push([
        snakeList[snakeList.length - 1][0] - step,
        snakeList[snakeList.length - 1][1],
      ])
      handleUpdateVerify()
      break
    case 'ArrowRight':
      if (snakeList.slice(-1)[0][0] >= width.value - 1) {
        status.value = 'over'
        return
      }
      snakeList.push([
        snakeList[snakeList.length - 1][0] + step,
        snakeList[snakeList.length - 1][1],
      ])
      handleUpdateVerify()
      break
  }

  // 更新校验
  function handleUpdateVerify() {
    if (status.value === 'pause') {
      clearInterval(process)
    }

    if (store.value >= 100) {
      status.value = 'success'
      return
    }
    for (let i of snakeList) {
      ctx.clearRect(i[0], i[1], elementWidth, elementWidth)
    }

    let currentSnake = snakeList.slice(-1)[0]
    if (
      Math.abs(currentSnake[0] - foodCoordinate[0]) < 10 &&
      Math.abs(currentSnake[1] - foodCoordinate[1]) < 10
    ) {
      store.value++
      handleRenderFood()
    } else {
      snakeList.shift()
    }
  }
}

onMounted(() => {
  handleInit()
})
</script>
<template>
  <div class="gluttonous_snake">
    <canvas id="canvas" :width="width" :height="height"></canvas>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
