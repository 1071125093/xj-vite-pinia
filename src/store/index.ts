/*
 * @Author: XiaoJun
 * @Date: 2022-07-02 21:20:29
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 19:51:24
 * @Description: pinia
 * @FilePath: /xj-vite-pinia/src/store/index.ts
 */
import { defineStore, StoreDefinition, Store } from 'pinia'
import { ref, toRefs } from 'vue'
import usePiniaOne from './piniaOne'
import usePiniaTwo from './piniaTwo'
type StoreModule = 'piniaOne' | 'piniaTwo'
// #tips:Map对象的使用比较有问题
// eg const map = new Map<string,T>() 需保证Map对象的返回值类型一致 或通过ts做出某种限制 暂时不会
export type StoreReturnType = {
  piniaOne: ReturnType<typeof usePiniaOne>
  piniaTwo: ReturnType<typeof usePiniaTwo>
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
export function getStore(moduleName: 'piniaOne'): StoreReturnType['piniaOne']
export function getStore(moduleName: 'piniaTwo'): StoreReturnType['piniaTwo']
export function getStore(moduleName: StoreModule) {
  switch (moduleName) {
    case 'piniaTwo':
      return usePiniaTwo()
    case 'piniaOne':
      return usePiniaOne()
    default:
      return null
  }
}
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
