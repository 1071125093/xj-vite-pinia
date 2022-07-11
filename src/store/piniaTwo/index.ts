/*
 * @Author: XiaoJun
 * @Date: 2022-07-03 14:11:48
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-04 01:17:49
 * @Description: 组件功能
 * @FilePath: /my-vite/src/store/piniaTwo/index.ts
 */
import { defineStore } from "pinia";
import { reactive, toRefs, computed } from "vue";
interface State {
  count: number;
  age: number;
  happy: boolean;
  name: string;
}
export default defineStore("piniaTwo", () => {
  const state = reactive<State>({
    count: 15,
    age: 232323,
    happy: false,
    name: "hxj",
  });
  const calcCount = computed(() => {
    return state.count + 6;
  });
  const myTest = () => {
    console.log("我裂开le");
  };
  return {
    ...toRefs(state),
    calcCount,
    myTest,
  };
});
