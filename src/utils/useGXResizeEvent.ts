import { CSSProperties } from 'vue'

/**
 * @description:
 * @param {*} config.element 被缩放的根元素，一般默认#app
 * @return {*} 不返回啥，但是注入
 * global_width_scale
 * global_height_scale
 * calcAMapScale
 * resize
 * @return {*} 
 */

export const useGXResizeEvent = (
  config = {
    element: '#app'
  }
) => {
  const global_width_scale = ref(1)
  const global_height_scale = ref(1)
  // 当前版本不支持slaceStop的抛出，目前各个驾驶舱都是单独的项目
  const scaleStop = ref(false)

  const _GXResizeEvent = () => {
    if (scaleStop.value) {
      return
    }
    const nDefault_width = 1920
    const nDefault_height = 1080
    const nClient_width = document.documentElement.clientWidth
    const nClient_height = document.documentElement.clientHeight
    const nAuot_width = nClient_width / nDefault_width
    const nAuot_height = nClient_height / nDefault_height
    global_width_scale.value = nAuot_width
    global_height_scale.value = nAuot_height
    const jNodeBody = document.querySelector(config.element) as HTMLElement
    jNodeBody.style.transform = `scale(${nAuot_width},${nAuot_height})`
    jNodeBody.style.transformOrigin = '0 0'
  }
  const calcAMapScale = computed<CSSProperties>(() => {
    return {
      transform: `scale(${1 / global_width_scale.value}, ${1 / global_height_scale.value})`
    }
  })

  provide('global_width_scale', global_width_scale)
  provide('global_height_scale', global_height_scale)
  provide('calcAMapScale', calcAMapScale)
  provide('resize', _GXResizeEvent) // provide("名字",值)

  onMounted(() => {
    window.onresize = () => {
      _GXResizeEvent()
    }
    window.addEventListener('resize', _GXResizeEvent, false)
    _GXResizeEvent()
  })
}
