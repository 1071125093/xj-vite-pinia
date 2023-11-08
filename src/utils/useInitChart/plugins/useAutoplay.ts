import { ComputedRef, Ref } from 'vue'

export const useAutoplay = (myChart: any, option: ComputedRef<any> | Ref<any>) => {
  // #region ********** 自动轮播 start **************/
  let currentIndex: number
  let autoplayInterval: any
  let lastIndex: number
  // const interval = getRandomCount(3, 5, 2) * 1000
  const interval = 3000
  const initAutoPlay = () => {

    // 一筐重置
    myChart.off('mouseover')
    myChart.off('mouseout')
    stopAutoPlay()

    currentIndex = 0
    lastIndex = 0

    startAutoPlay()
    myChart.on('mouseover', (param: any) => {
      if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
      }
      stopLast()
      if (!isNaN(param.dataIndex)) {
        //获取用户悬停的dataIndex，进行高亮
        currentIndex = param.dataIndex
        lastIndex = param.dataIndex
      }
      startCurrent()
    })
    myChart.on('mouseout', () => {
      //重新开始轮播代码
      // stopLast()
      startAutoPlay()
    })
  }
  const startAutoPlay = () => {
    stopLast()
    startCurrent()
    
    autoplayInterval = setInterval(function () {
      const dataLen = (option as any).value.series[0].data.length
      if (!dataLen) return
      if (!myChart) return
      stopLast()
      do {
        currentIndex = (currentIndex + 1) % dataLen
      } while (!Number((option as any).value.series[0].data?.[currentIndex].value))

      // currentIndex = (currentIndex + 1) % dataLen
      lastIndex = currentIndex

      startCurrent()
      // 显示 tooltip
      // myChart.dispatchAction({
      //   type: 'showTip',
      //   seriesIndex: 0,
      //   dataIndex: currentIndex
      // })
    }, interval)
  }
  // 停止前一项效果
  const stopLast = () => {
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: lastIndex
    })
  }
  // 开启当前项
  const startCurrent = async () => {
    // 好家伙，这里nextTick一下就行了，不知道为什么
    await nextTick()
    
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    myChart.dispatchAction({ type: 'legendScroll', scrollDataIndex: currentIndex })
  }
  const stopAutoPlay = () => {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
  onUnmounted(() => {
    stopAutoPlay()
  })

  return {
    initAutoPlay,
    stopAutoPlay
  }
  // #endregion ******* 自动轮播 ~end~ **************/
}
