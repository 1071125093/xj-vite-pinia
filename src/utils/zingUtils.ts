/* eslint-disable */
import {ref,computed,onScopeDispose,VNode,render,} from 'vue'


export interface UseAutoResizeType {
    (el: HTMLElement & expandAttrType, resize: resizeFunc): closeFunc|undefined
  }

  /**
   * @description: 扩展属性
   * @return {*}
   */
  export type expandAttrType = {
    z_AutoResize?: boolean
    resizeObserver?: ResizeObserver | null
  }

  /**
   * @description: 回调函数，回调函数第二个参数可获取到关闭函数
   * @return {*}
   */
  export type resizeFunc = {
    (el: HTMLElement & expandAttrType, callback:closeFunc): void
  }
  /**
   * @description: 关闭监听 函数 关闭函数也有执行完的回调函数
   * @return {*}
   */
  export type closeFunc = {
    (callback: (el: HTMLElement & expandAttrType) => void): void
  }

  /**
   *
   * @description:  监听dom对象宽高 变化 执行指定函数
   * @user  // NOTE ZingUI开发者 | ZingUI使用者
   * @param {HTMLElement} el 第一个参数是需要监听的dom
   * @param {Function} resize 第二个是dom宽高变化后 执行的函数
   * @return {*}
   *
   */
  export const useAutoResize: UseAutoResizeType = (el, resize) => {
    if (!el) return
    // 这里是判断 如果有设置过 就不再多次监听
    if (el['z_AutoResize']) return
    // ie不支持
    const resizeObserver = new ResizeObserver((entries) => {
      resize.call(undefined, el, close)
    })
    resizeObserver.observe(el)
    // 添加标识和关闭监听的入口
    el['z_AutoResize'] = true
    el['resizeObserver'] = resizeObserver

    const close: closeFunc = (callBack) => {
      el['resizeObserver']?.unobserve?.(el)
      el['resizeObserver'] = null
      callBack(el)
    }

    return close
  }


/**
 * @description: 倒计时
 * @param {*} minTime 最小时间秒数
 * @param {*} maxTime 最大开始计时的秒数
 * @return {*} {
                  time: Ref<number>;    当前秒数
                  isEnd: ComputedRef<boolean>; 是否倒计时结束
                  run: () => void; 从头开始执行倒计时
              }
 */
export function useTimeDown(minTime = 0, maxTime = 60) {
  const time = ref(minTime)
  const isEnd = computed(() => time.value === minTime)
  let timer: null | number = null
  function run() {
    if (!isEnd.value) return
    time.value = maxTime
    timer = setInterval(() => {
      if (--time.value <= minTime) {
        time.value = minTime
        clearInterval(timer as number)
        timer = null
      }
    }, 1000)
  }
  onScopeDispose(() => {
    timer !== null && clearInterval(timer)
    timer = null
    time.value = minTime
  })
  return { time, isEnd, run }
}

export function sortByKey(arr:any, property:string | Array<any>, order = true) {
  const backupArr = JSON.parse(JSON.stringify(arr))
  const compareArr = (a:any, b:any) => {
   if(typeof property === 'string') {
      const x = typeof a[property] === 'number'? a[property] : a[property].charCodeAt(0)
      const y = typeof b[property] === 'number'? b[property] : b[property].charCodeAt(0)
      return order ? x - y : y - x
    }
    else{
      for (let index = 0; index < property.length; index++) {
        const x = typeof a[property[index]] === 'number'? a[property[index]] : a[property[index]].charCodeAt(0)
        const y = typeof b[property[index]] === 'number'? b[property[index]] : b[property[index]].charCodeAt(0)
        if (x === y) {
          continue;
        } else {
          return order ? x - y : y - x
        }
      }
    }
  }
  return backupArr.sort(compareArr)
}

type TypeRul = 'string' | 'array' | 'enumerable' | 'number' | 'boolean' | 'null' | 'object';

export function getDataType(value: any, typeVal?: TypeRul):any {
    // 获取数据类型
    if(typeof typeVal != 'object'){
        // 返回常规类型
        return typeof typeVal
    }else{
        // 返回引用类型以及特殊类型
        if(typeVal){
            // 不为null
            if(Array.isArray(typeVal)){
                return 'array'
            }
            return 'object'
        }
        return 'null'
    }
}
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
export function arrayConverTree(data: any[], idKey: string | number, pidKey: string | number) {
  const nodes: { [key: string]: any } = {}
  let root = null

  // 创建节点映射
  // Explicitly define the type of the nodes object
  data.forEach((item) => {
    nodes[item[idKey]] = item
    item.children = null // Initialize as null
  })

  // 构建树结构
  data.forEach((item: { [x: string]: any }) => {
    const parentId = item[pidKey]
    if (parentId === null) {
      root = item // 根节点
    } else {
      if (nodes[parentId]) {
        if (nodes[parentId].children === null) {
          nodes[parentId].children = [] // 如果子节点为 null，则初始化为数组
        }
        nodes[parentId].children.push(item) // 将当前节点添加到父节点的子节点列表中
      }
    }
  })

  return root
}


/** 
 * @description: 通过vue组件，生成一个具体的HTML
 * 1.推荐配合vue的h()函数使用
 * 2.目前h()函数对props的提示暂不支持defineProps的泛型写法
 * 3.用法详见官网样例
 * @param {VNode} vnode 
 */
export function getHtmlByVNode(
  vnode: VNode | VNode[],
  config = {
    filterEmptyText: true
  }
) {
  let theHTML = ''
  if (Array.isArray(vnode)) {
    const divElement = document.createElement('div')
    vnode.forEach((fi) => {
      render(fi, divElement)
      // 是否过滤空值
      if (config?.filterEmptyText && !divElement.innerText) return
      theHTML += divElement.innerHTML
    })
  } else {
    const divElement = document.createElement('div')
    render(vnode, divElement)
    // 是否过滤空值
    if (config?.filterEmptyText && !divElement.innerText) return
    theHTML += divElement.innerHTML
  }
  return theHTML
}
