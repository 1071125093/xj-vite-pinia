/*
 * @Author: XiaoJun
 * @Date: 2022-07-03 14:11:48
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-31 10:46:14
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/piniaOne/index.ts
 */
import { defineStore } from "pinia";
import { reactive, toRefs, computed } from "vue";
interface State {
  count: number;
  age: number;
}
export default defineStore("piniaOne", () => {
  const state = reactive<State>({
    age: 10086,
    count: 5,
  });
  const calcCount = computed(() => {
    return state.count + 6;
  });
  const increaseCount = (num: number) => {
    if (typeof num !== "number") return;
    state.count += num;
  };
  return {
    ...toRefs(state),
    calcCount,
    increaseCount,
  };
})
