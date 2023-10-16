/* eslint-disable */
import {useAttrs,computed,} from 'vue'




/**
 * @description:使用attr开启v-model支持
 * @param {string} key 双向绑定的key 
 * @return {*}
 */
export function useVModel(key: string) {
  if (!key) return
  const attrs = useAttrs()
  const vModel = computed({
    get() {
      return attrs[key]
    },
    set(value) {
      ;(attrs[`onUpdate:${key}`] as (...arg: any) => any)(value)
    }
  })

  const obj: any = {}
  obj[key] = vModel
  obj['Modifiers'] = attrs[`${key}Modifiers`]
  return obj
}
