/*
 * @Author: XiaoJun
 * @Date: 2022-08-25 17:34:37
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-31 11:53:30
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
// import usePiniaOne from './piniaOne'
// import usePiniaTwo from './piniaTwo'
// import usePiniaSystem from './piniaSystem'
export { default as usePiniaOne } from './piniaOne'
export { default as usePiniaTwo } from './piniaTwo'
export { default as usePiniaSystem } from './piniaSystem'
export const pinia = createPinia()

//#endregion *** getStore尝试 end   **********/
