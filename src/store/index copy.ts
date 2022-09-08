/*
 * @Author: XiaoJun
 * @Date: 2022-08-31 10:00:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-08 09:34:59
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/store/index copy.ts
 */
/*
 * @Author: XiaoJun
 * @Date: 2022-08-25 17:34:37
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-31 09:57:57
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
import usePiniaOne from './piniaOne'
import usePiniaTwo from './piniaTwo'
import useSystem from './piniaSystem'
type StoreModule = 'piniaOne' | 'piniaTwo' | 'system'
// #tips:Map对象的使用比较有问题
// eg const map = new Map<string,T>() 需保证Map对象的返回值类型一致 或通过ts做出某种限制 暂时不会
export type StoreReturnType = {
  piniaOne: ReturnType<typeof usePiniaOne>
  piniaTwo: ReturnType<typeof usePiniaTwo>
  system: ReturnType<typeof useSystem>
}
// export default (): storeReturnType => {
//   return {
//     piniaOne: usePiniaOne(),
//     piniaTwo: usePiniaTwo(),
//   };
// };
//#update ****** getStore尝试 start **********/
// interface myFun {
//   (moduleName: "piniaOne"): StoreReturnType["piniaOne"];
//   (moduleName: "piniaTwo"): StoreReturnType["piniaTwo"];
// }
const asd = <T extends number | string>(name: T) => {}
export function getStore(moduleName: 'piniaOne'): StoreReturnType['piniaOne']
export function getStore(moduleName: 'piniaTwo'): StoreReturnType['piniaTwo']
export function getStore(moduleName: 'system'): StoreReturnType['system']
export function getStore(moduleName: StoreModule) {
  switch (moduleName) {
    case 'piniaTwo':
      return usePiniaTwo()
    case 'piniaOne':
      return usePiniaOne()
    case 'system':
      return useSystem()
    default:
      return null
  }
}
export const pinia = createPinia()
// export default (moduleName: StoreModule) => {
//   const moduleMap = new Map<StoreModule, StoreReturnType[StoreModule]>([
//     ["piniaOne", usePiniaOne()],
//     ["piniaTwo", usePiniaTwo()],
//   ]);
//   return moduleMap.get(moduleName);
//   // switch (moduleName) {
//   //   case "piniaTwo":
//   //     return usePiniaTwo();
//   //   case "piniaOne":
//   //     return usePiniaOne();
//   // }
// };

//#endregion *** getStore尝试 end   **********/
