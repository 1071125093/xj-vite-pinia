<template>
  <div class="snake_container">
    <button @click="snakeStatus = snakeStatus === 'start' ? 'pause' : 'start'">
      {{ snakeStatus === 'start' ? '暂停' : '开始' }}游戏
    </button>
    <div style="height: 10px"></div>
    <div>得分: {{ score }}</div>
    <div style="height: 10px"></div>
    <div>游戏规则: 别让食物暴露在空气{{ restTime }}秒!!!</div>
    <div style="height: 10px"></div>
    <canvas id="ctx" width="900" height="600"></canvas>
  </div>
</template>
<script lang="ts" setup>
//@@description@@
// ==================================== 一、组件类 ====================================
// ==================================== 二、变量类 ====================================
// ==================================== 三、方法类 ====================================
import { ref, Ref, onMounted, computed, watch } from 'vue'
// ==================================== 四、API类  ====================================
type TX = number
type TY = number
type TWidth = number
type THeight = number
function fillRect(bgc: string, range: [TX, TY, TWidth, THeight]) {
  ctx.fillStyle = bgc
  ctx.fillRect(...range)
}
let config = {
  snake: [
    [0, 100],
    [10, 100],
    [20, 100],
    [30, 100],
    [40, 100],
  ],
  time: 15,
}
// type TDirection = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown'
enum TDirectionEnum {
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
}
type TDirection = keyof typeof TDirectionEnum
type TStatus = 'unStart' | 'start' | 'pause'
// 定义变量
let canvas: any = null
let ctx: any = null
let direction: Ref<TDirection> = ref('ArrowRight')
let score: Ref<number> = ref(0)
let speed = computed(() => {
  if (score.value <= 0) return 1
  if (score.value >= 10) return 10
  return score.value
})
let elSize: number = 10
let snakeStatus: Ref<TStatus> = ref('unStart')
let snakeList: Array<[number, number]> = []
let foodPosition: Ref<[TX, TY]> = ref<[TX, TY]>([0, 0])
let foodColor = '#ff5732'
let stopTime = () => {}
const initCtx = () => {
  if (!ctx) {
    canvas = document.getElementById('ctx')
    ctx = canvas?.getContext('2d')
  }
  fillRect('#eee', [0, 0, 900, 600])
}
const authorityMap = new Map<TDirection, [TDirection, TDirection]>([
  ['ArrowRight', ['ArrowUp', 'ArrowDown']],
  ['ArrowLeft', ['ArrowUp', 'ArrowDown']],
  ['ArrowUp', ['ArrowLeft', 'ArrowRight']],
  ['ArrowDown', ['ArrowLeft', 'ArrowRight']],
])
document.addEventListener('keydown', (e) => {
  e.preventDefault()
  const targetDir = e.code as TDirection
  if (
    ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.code) &&
    snakeStatus.value === 'start' &&
    authorityMap.get(direction.value)?.includes(targetDir)
  ) {
    direction.value = targetDir
  }
})
// 方法
// 渲染食物
function renderFood() {
  fillRect(foodColor, [...foodPosition.value, elSize, elSize])
}
// 渲染蛇
function renderSnake() {
  snakeList.forEach((item, index) => {
    fillRect(index === snakeList.length - 1 ? '#ff5732' : '#3cb056', [...item, elSize, elSize])
  })
}
// 计算食物
function foodComp() {
  foodPosition.value[0] = (((Math.random() * 891) / 10) | 0) * 10
  foodPosition.value[1] = (((Math.random() * 591) / 10) | 0) * 10
}
// 计算蛇行进
function snakeRun() {
  if (snakeStatus.value !== 'start') return
  const dir = direction.value
  const currentLocation = snakeList[snakeList.length - 1]
  const nextLocation: [number, number] = [currentLocation[0], currentLocation[1]]
  if (dir === 'ArrowRight' || dir === 'ArrowLeft') {
    nextLocation[0] = nextLocation[0] + 10 * (dir === 'ArrowRight' ? 1 : -1)
  } else {
    nextLocation[1] = nextLocation[1] + 10 * (dir === 'ArrowDown' ? 1 : -1)
  }
  if (nextLocation[0] < 0) nextLocation[0] = 890
  if (nextLocation[1] < 0) nextLocation[1] = 590
  if (nextLocation[0] > 890) nextLocation[0] = 0
  if (nextLocation[1] > 590) nextLocation[1] = 0
  snakeList.push(nextLocation)
  if (!eatFood(nextLocation)) {
    const traceLocation: any = snakeList.shift()
    fillRect('#eee', [traceLocation[0], traceLocation[1], elSize, elSize])
  }
}
// 检验吃
function eatFood(headLocation: [number, number]) {
  if (headLocation[0] === foodPosition.value[0] && headLocation[1] === foodPosition.value[1]) {
    score.value++
    restTime.value += speed.value <= 5 ? 10 - speed.value : 5
    stopTime()
    stopTime = runTime() // 加速
    foodComp()
    return true
  }
  return false
}
// 进行
function runTime() {
  const timeId = setInterval(() => {
    if (snakeStatus.value === 'start') {
      // initCtx();
      snakeRun()
      renderFood()
      renderSnake()
    }
  }, 110 - speed.value * 10)
  return () => {
    clearInterval(timeId)
  }
}
// 剩余时间
let restTime = ref(10)
let stopReduceTime = () => {}
function reduceTime() {
  const timeId = setInterval(() => {
    restTime.value--
  }, 1000)
  return () => {
    clearInterval(timeId)
  }
}
watch(
  () => restTime.value,
  (newRestTime) => {
    if (newRestTime <= 0) {
      snakeStatus.value = 'unStart'
      alert('游戏结束,你的得分是' + score.value)
      ctx.clearRect(0, 0, 900, 600)
      initCtx()
    }
  }
)
watch(
  () => snakeStatus.value,
  (newStatus) => {
    switch (newStatus) {
      case 'start':
        stopReduceTime = reduceTime()
        break
      case 'unStart':
        stopReduceTime()
        resetGame()
        break
      case 'pause':
        stopReduceTime()
        break
    }
  }
)
// 重置游戏
function resetGame() {
  snakeList = JSON.parse(JSON.stringify(config.snake))
  restTime.value = config.time
  foodComp()
  score.value = 0
  direction.value = 'ArrowRight'
  stopTime()
  stopTime = runTime()
}
onMounted(() => {
  initCtx()
  resetGame()
})
</script>
<style scoped lang="less">
.snake_container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  #ctx {
    border-radius: 4px;
    box-shadow: 0 0 3px 2px #9d9d9d;
  }
}
</style>
