export const useGXResizeEvent = () => {
  const global_width_scale = ref(1)
  const global_height_scale = ref(1)

  const _GXResizeEvent = () => {
    const scaleStop = false
    if (scaleStop) {
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
    const jNodeBody = document.getElementById('app') as HTMLElement
    jNodeBody.style.transform = `scale(${nAuot_width},${nAuot_height})`
    // const mapEle = document.getElementsByClassName('map')
    const mapContainerEle = document.getElementsByClassName('mapContainer')
    if (mapContainerEle && mapContainerEle.length > 0) {
      for (let i = 0; i < mapContainerEle.length; i++) {
        mapContainerEle[i].style.transform = `scale(${(1 / nAuot_width).toFixed(2)},${(1 / nAuot_height).toFixed(2)})`
      }
    }
  }
  provide('global_width_scale', global_width_scale)
  provide('global_height_scale', global_height_scale)
  provide('resize', _GXResizeEvent) // provide("名字",值)

  onMounted(() => {
    window.onresize = () => {
      _GXResizeEvent()
    }
    window.addEventListener('resize', _GXResizeEvent, false)
    _GXResizeEvent()
  })
}
