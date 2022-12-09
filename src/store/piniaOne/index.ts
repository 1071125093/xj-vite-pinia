/*
 * @Author: XiaoJun
 * @Date: 2022-07-03 14:11:48
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-08 19:21:13
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/piniaOne/index.ts
 */
import { defineStore } from 'pinia'
import { reactive, toRefs, computed } from 'vue'
interface State {
  count: number
  age: number
  whatHappen: string
}
export default defineStore('piniaOne', () => {
  const state = reactive<State>({
    age: 10086,
    count: 5,
    whatHappen: '发生了什么',
  })
  const calcCount = computed(() => {
    return state.count + 6
  })
  const increaseCount = (num: number) => {
    if (typeof num !== 'number') {
      return
    }
    state.count += num
  }
  return {
    ...toRefs(state),
    calcCount,
    increaseCount,
  }
})
