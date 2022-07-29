<!--
 * @Author: XiaoJun
 * @Date: 2022-07-12 16:00:44
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-28 21:36:17
 * @Description: 环形进度条
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard21/components/circleProgress.vue
-->
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'
import { copy } from '@/service/commonService'
const outCircleDom = ref(null)
let svg: any, dashedLine: any, trackLineLength: number
let trackLine: any
const getSvg = () => {
  let svg = d3.select(outCircleDom.value)
  trackLine = svg.append('path')
}
const drawTrackLine = () => {
  let path = d3.path()
  const p0 = { x: 100, y: 20 }
  const p1 = { x: 150, y: 20 }
  const p2 = { x: 150, y: 70 }
  const p3 = { x: 150, y: 120 }
  const p4 = { x: 100, y: 120 }
  path.moveTo(p0.x, p0.y)
  path.arcTo(p1.x, p1.y, p2.x, p2.y, 50)
  path.arcTo(p3.x, p3.y, p4.x, p4.y, 50)
  // path.moveTo(100, 100)
  // path.lineTo(150, 100)
  // path.lineTo(150, 150)
  // path.lineTo(200, 150)
  // path.lineTo(200, 200)
  trackLine
    .attr('stroke', 'url(#grad1)')
    .attr('stroke-width', '8px')
    .attr('fill','transparent')
    // .attr('fill', 'url(#grad1)')
    .attr('stroke-dasharray', '8,8')
    .attr('d', path.toString())
  trackLineLength = trackLine.node().getTotalLength()
}
const init = () => {
  getSvg()
  drawTrackLine()
}
onMounted(() => {
  init()
})
</script>
<template>
  <div class="circle_progress">
    <svg class="module" ref="outCircleDom">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="1" y2="0%">
          <stop offset="0%" style="stop-color: rgb(255, 255, 0)"></stop>

          <stop offset="100%" style="stop-color: rgb(255, 0, 0)"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>
<style lang="less" scoped>
.circle_progress {
  width: 700px;
  height: 700px;
  stroke: linear;
}
.module {
  width: 100%;
  height: 100%;
}
</style>
