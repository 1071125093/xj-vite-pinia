<!--
 * @Author: llh
 * @Date: 2021-09-17 14:08:54
 * @LastEditors: XiaoJun
 * @Description: 文件描述
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard21/components/D3Line.vue
-->
<template>
  <div class="D3Line">
    <svg ref="svgDom" :id="`svgDom_${domId}`">
      <defs>
        <mask id="Mask"></mask>
        <radialGradient id="grad" cx="1" cy="1" r="2">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="50%" stop-color="#7BFAFF" stop-opacity=".8" />
          <stop offset="100%" stop-color="#7BFAFF" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="Mask-grad" cx="1" cy="1" r="2">
          <stop offset="0%" stop-color="#fff" stop-opacity="1" />
          <stop offset="100%" stop-color="#fff" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
</template>
<script>
import { defineComponent, nextTick, onMounted, onUnmounted, ref, toRefs } from '@vue/runtime-core'
import * as d3 from 'd3'
import { time } from 'echarts'
const D3Line = defineComponent({
  props: {
    color: {
      type: String,
      default: '#06ABF3',
    },
    x1: {
      type: [Number, String],
      default: 0,
    },
    y1: {
      type: [Number, String],
      default: 0,
    },
    x2: {
      type: [Number, String],
    },
    y2: {
      type: [Number, String],
    },
    highlights: {
      type: Boolean,
      default: false,
    },
    lineDuration: {
      type: [Number, String],
      default: 2000,
    },
    // 随机出现闪点
    randomFlash: {
      type: Boolean,
      default: true,
    },
    // 闪点持续时间
    flashDuration: {
      type: [Number, String],
      default: 1e3,
    },
    path: {
      type: Array,
    },
    lineWidth: {
      type: [Number, String],
      default: 1,
    },
    flashLineWidth: {
      type: [Number, String],
      default: 1,
    },
  },
  setup(props) {
    let svgDom = ref('')
    const domId = ref(Math.floor(Math.random() * 1e3))
    let width, height, svg, $path, l, circle
    const { x1, y1 } = toRefs(props)
    let timer = null
    const intervalTime = ref(2e3) // 亮点动画时间2秒
    // let width = 600,
    //   height = 300;

    /**
     * [initBaseLine 初始化基础线路]
     *
     * @return  {[type]}  [return description]
     */
    const initBaseLine = () => {
      width = svgDom.value.parentElement.offsetWidth // 使用父元素的宽
      height = svgDom.value.parentElement.offsetHeight // 使用父元素的高
      svg = d3.select(svgDom.value).attr('width', width).attr('height', height)
      let dx = 0,
        // x1 = 55.5,
        // y1 = 0,
        x2 = props.x2 ? props.x2 : width / 2,
        y2 = props.y2 ? props.y2 : height
      // let dy = Math.round(Math.abs(((y2 - y1) / (x2 - x1)) * dx));
      // //向右上弯曲
      // let cpx = Math.round((x1 + x2) / 2 + dx);
      // let cpy = Math.round((x1 + x2) / 2 - dy);

      let path = d3.path()
      path.moveTo(x1.value, y1.value)
      path.lineTo(x2, y2)
      svg
        .append('path')
        .attr('class', `baseLine_${domId.value}`)
        // .attr('d', `M${x1},${y1} Q${dx},${dy} ${x2},${y2}`)
        .attr('d', path.toString())
        .style('fill', 'none')
        .style('stroke', 'transparent')
        .style('stroke-width', '1')

      $path = d3.select(`.baseLine_${domId.value}`)
      l = $path.node().getTotalLength()
      // let mask = d3.select('#Mask');
      if (props.highlights) {
        circle = svg
          .append('circle')
          .attr('class', `circleBase_${domId.value}`)
          .attr('cx', x1.value)
          .attr('cy', y1.value)
          .attr('r', 3.5)
          .attr('fill', 'url(#grad)')
      }
    }

    /**
     * [drawLineCircle 绘画第一次进入的线条和圆圈]
     *
     * @return  {[type]}  [return description]
     */
    const drawLineCircle = () => {
      return new Promise((resolve) => {
        svg
          .append('path')
          // .attr('stroke', 'url(#linear)') // 渐变颜色
          .attr('stroke', props.color)
          .style('stroke-dasharray', '2,2') // 添加虚线
          .attr('stroke-width', props.lineWidth)
          .attr('fill', 'none')
          .transition()
          .duration(props.lineDuration)
          .ease(d3.easeLinear)
          .attrTween('d', function (z) {
            let coord = $path
              .attr('d')
              .replace(/(M)/g, '')
              .match(/((\d|\.)+)/g)
            let x1 = coord[0]
            let y1 = coord[1] // 起点
            let animation = `M${x1},${y1}`
            return function (t) {
              let p = $path.node().getPointAtLength(t * l) // 新的终点
              if (props.highlights) circle.attr('cx', p.x).attr('cy', p.y)
              animation = animation + ` L${p.x},${p.y}`
              return animation
            }
          })
          .on('end', function () {
            // 动画结束回调
            // animate();
            // startAnimate();
            resolve()
          })
      })
      // .remove();
    }

    /**
     * [animate 亮点动画]
     *
     * @return  {[type]}  [return description]
     */
    const animate = () => {
      let mask = d3.select('#Mask')
      let circleMask = mask
        .append('circle')
        .attr('class', `circleMask_${domId.value}`)
        .attr('cx', x1.value)
        .attr('cy', y1.value)
        .attr('r', 10)
        .attr('fill', 'url(#Mask-grad)')
      svg
        .append('path')
        // .attr('stroke', 'url(#b1xGradient)')
        .attr('stroke', '#fff')
        .attr('stroke-width', props.flashLineWidth)
        .attr('fill', 'none')
        .attr('stroke-linecap', 'round')
        .attr('mask', 'url(#Mask)')
        .transition()
        .duration(props.flashDuration)
        .ease(d3.easeLinear)
        // .ease(d3.easeCircle)
        .attrTween('d', function () {
          let coord = $path
            .attr('d')
            .replace(/(M)/g, '')
            .match(/((\d|\.)+)/g)
          let x1 = +coord[0]
          let y1 = +coord[1] // 起点
          let animation = `M${x1},${y1}`
          return function (t) {
            let p = $path.node().getPointAtLength(t * l) // 新的终点
            circleMask.attr('cx', p.x).attr('cy', p.y)
            animation = animation + ` L${p.x},${p.y}`
            if (props.path) return animation
            // 折线动画
            else return `M${x1}, ${y1} ${p.x}, ${p.y}` // 直线动画
          }
        })
        .remove()
    }

    /**
     * [startAnimate 开始闪点动画]
     *
     * @return  {[type]}  [return description]
     */
    const startAnimate = () => {
      timer && clearInterval(timer)
      if (props.randomFlash) {
        timer = setInterval(animate, 2e3)
      } else {
        timer = setInterval(animate, intervalTime.value)
      }
    }

    let timeoutTimer = null
    /**
     * [visibilitychange 监听浏览器选项卡是否处于激活状态]
     *
     * @return  {[type]}  [return description]
     */
    const visibilitychange = () => {
      if (!document.hidden) {
        timeoutTimer && clearTimeout(timeoutTimer)
        timeoutTimer = setTimeout(startAnimate, 500)
        // console.log("开启定时器");
        return
      }
      timeoutTimer && clearTimeout(timeoutTimer)
      timer && clearInterval(timer)
      // console.log("清除定时器");
    }

    onMounted(async () => {
      initBaseLine()
      await drawLineCircle()
      startAnimate()
      window.addEventListener('visibilitychange', visibilitychange)
    })

    onUnmounted(() => {
      window.removeEventListener('visibilitychange', visibilitychange)
    })
    return {
      svgDom,
      domId,
    }
  },
})
export default D3Line
</script>
<style lang="less" scoped>
.D3Line {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
