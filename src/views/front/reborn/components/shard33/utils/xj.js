/*
 * @Author: XiaoJun
 * @Date: 2022-11-23 15:33:16
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-23 15:33:17
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard33/utils/xj.js
 */
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment,
  }
}
