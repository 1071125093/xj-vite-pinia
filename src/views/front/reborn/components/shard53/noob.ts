interface timeT {
  time: string
  date: string
}
export const useCurrentTimer = () => {
  const timeData = reactive<timeT>({
    time: '',
    date: ''
  })
  const initTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    timeData.date = `${year}-${month}-${day}`
    const hours = date.getHours()
    const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
    // timeData.time = `${hours}:${min}:${second}`
    timeData.time = `${second}`
    setTimeout(() => {
      initTime()
    }, 1000)
  }
  // onMounted(() => {
  //   initTime()
  // })

  const xjTestState = reactive({
    num: '我' as any
  })
  const xjTest = () => {
    const date = new Date()
    // const second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()

    xjTestState.num += 1
    // setTimeout(() => {
    //   xjTest()
    // }, 1000)
  }

  return {
    timeData,
    xjTestState,
    xjTest,
    initTime
  }
}
