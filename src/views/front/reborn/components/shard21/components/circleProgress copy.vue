<!--
 * @Author: XiaoJun
 * @Date: 2022-07-12 16:00:44
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-28 20:31:04
 * @Description: 环形进度条
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard21/components/circleProgress copy.vue
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'
import { copy } from '@/service/commonService'
const outCircleDom = ref(null)
let svg: any, dashedLine: any, trackLineLength: number
let trackLine: any
let lightCircle: any
const getSvg = () => {
  let svg = d3.select(outCircleDom.value)
  trackLine = svg.append('path')
  dashedLine = svg.append('path')
  lightCircle = svg.append('circle')
}
const drawTrackLine = () => {
  let path = d3.path()
  path.moveTo(100, 100)
  path.lineTo(150, 100)
  path.lineTo(150, 150)
  path.lineTo(200, 150)
  path.lineTo(200, 200)
  trackLine.attr('stroke', 'transparent').attr('fill', 'transparent').attr('d', path.toString())
  trackLineLength = trackLine.node().getTotalLength()
}
const regLocationM = /.*?(?=L)/g
const drawDashedLine = () => {
  dashedLine
    .attr('stroke', '#87ceeb')
    .attr('stroke-dasharray', '4,4')
    .attr('fill', 'none')
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attrTween('d', function () {
      let animation = this.trackLine.attr('d').match(regLocationM)[0]
      return function (t: number) {
        let p = this.trackLine.node().getPointAtLength(t * trackLineLength) // 新的终点
        animation = animation + ` L${p.x},${p.y}`
        return animation
      }
    })
}
const drawLightCircle = () => {
  // lightCircle.attr('')
}
const init = () => {
  getSvg()
  drawTrackLine()
  drawDashedLine()
  drawLightCircle()
}
onMounted(() => {
  init()
})
</script>
<template>
  <div class="circle_progress">
    <svg class="module" ref="outCircleDom">
      <!-- <circle class="inner_circle" cx="350" cy="350" r="300"></circle> -->
      <!-- <circle ref="outCircleDom" class="outer_circle" cx="350" cy="350" r="300"></circle> -->
      <!-- transform="rotate(-90,350,350)" -->
      <!-- <text class="inner_text" x="350" y="350">33%</text> -->
    </svg>
  </div>
</template>
<style lang="less" scoped>
.circle_progress {
  width: 700px;
  height: 700px;
}
.module {
  width: 100%;
  height: 100%;
}
.inner_circle {
  fill: none;
  stroke-width: 40px;
  stroke: gray;
  stroke-linecap: round;
}
.outer_circle {
  fill: none;
  stroke-width: 40px;
  stroke: #87ceeb;
  stroke-linecap: round;
  // transform: rotate(-180deg, 350px, 350px);
  stroke-dasharray: 0 10000;
}
.inner_text {
  font-size: 200px;
  fill: #87ceeb;
  text-anchor: middle;
  dominant-baseline: middle;
}
</style>
