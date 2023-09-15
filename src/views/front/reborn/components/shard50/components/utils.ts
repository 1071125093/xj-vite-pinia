/**
 * @Author: XiaoJun
 * @Date: 2023-09-12 16:08:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-14 15:31:35
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard50/components/utils.ts
 */
/**
 * @description: 按照枚举排序
 * @param {T[]} arr 需处理的数组
 * @param {keyof T} key 根据XX字段排序
 * @param {any} theEnum 枚举
 * @return {T[]} 返回处理后的数组
 */
export function sortByEnum<T extends keyof U, U>(arr: U[], key: T, theEnum: any) {
  return arr.sort((pre, suf) => theEnum[pre[key]] - theEnum[suf[key]])
}
/**
 * @description: 判断数组是否包含某个相同对象 或 数组是否包含含有某个key值的对象
 * 参数judge和参数value有一定限制
 * 各类限制偏向提示，而不是限制，因为强力限制需要用重载（不会）
 * @param {R} arr 源数组
 * @param {K|R} judge 需要被判断的内容，可以是key 可以是对象
 * @param {R[K]} value 如果judge是键，此处需填参数
 *                     如果judge是对象，此处不能填参数
 * @return {boolean} 返回是否包含，不返回对象
 */
export function includeTheObject<R extends object, K extends keyof R, Judge extends K | R>(
  arr: R[],
  judge: Judge,
  value?: Judge extends K ? R[Judge] : never
) {
  if (typeof judge === 'string') {
    return arr.some((si) => si[judge] === value)
  } else if (typeof judge === 'object') {
    return arr.some((si) => si === judge)
  } else {
    return false
  }
}
