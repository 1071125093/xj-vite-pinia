/*
 * @Author: XiaoJun
 * @Date: 2022-08-25 17:34:37
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-08 19:25:26
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/index.ts
 */
/*
 * @Author: XiaoJun
 * @Date: 2022-07-02 21:20:29
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-11 23:08:06
 * @Description: pinia
 * @FilePath: /xj-vite-pinia/src/store/index.ts
 */
import { createPinia } from 'pinia'
import type { App } from 'vue'
import usePiniaOne from './piniaOne'
import usePiniaTwo from './piniaTwo'
import usePiniaSystem from './piniaSystem'

export let piniaOne: ReturnType<typeof usePiniaOne>
export let piniaTwo: ReturnType<typeof usePiniaTwo>
export let piniaSystem: ReturnType<typeof usePiniaSystem>

// export { default as usePiniaOne } from './piniaOne'
// export { default as usePiniaTwo } from './piniaTwo'
// export { default as usePiniaSystem } from './piniaSystem'

export const pinia = createPinia()

export const piniaInstall = (app: App) => {
  app.use(pinia)
  piniaOne = usePiniaOne()
  piniaTwo = usePiniaTwo()
  piniaSystem = usePiniaSystem()
}

//#endregion *** getStore尝试 end   **********/
