/*
 * @Author: XiaoJun
 * @Date: 2022-07-08 09:30:43
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 10:24:45
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/directives/dateFormat/dateFormat.ts
 */
import { Directive, DirectiveBinding, ref } from 'vue'
import dayjs from 'dayjs'
const getNum = () => {
  return Math.round(Math.random() * 30)
}
const getFormatedDate = (el: HTMLElement, binding: DirectiveBinding) => {
  const theDate = new Date(el.innerHTML.trim())
  if (!theDate) return
  el.innerHTML = dayjs(theDate).format(`YYYY-MM-DD 12:12:12`)
}
const dateFormat: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // console.log(el, binding)
    return getFormatedDate(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    console.log(el)
    return getFormatedDate(el, binding)
  },
  unmounted() {},
}
export default dateFormat
