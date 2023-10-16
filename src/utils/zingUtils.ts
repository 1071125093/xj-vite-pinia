/* eslint-disable */
import axios from 'axios'
import {useAttrs,computed,ref,reactive,VNode,mergeProps,render,watch,nextTick,typeWatchCallback,WatchOptions,WatchSource,Slot,isVNode,} from 'vue'

/**
 * @description: 对象转换成url参数
 * @user // NOTE ZingUI开发者 | ZingUI使用者
 * @param {Object} obj 对象
 * @param {string} prefix 前置参数
 * @return {*}
 */
export function objectToQuery(obj: Object, prefix?: string) {
  if (typeof obj !== 'object') return ''
  const attrs = Object.keys(obj)
  return attrs.reduce((query, attr, index) => {
    // 判断是否是第一层第一个循环
    if (index === 0 && !prefix) query += '?'
    if (typeof obj[attr] === 'object') {
      const subPrefix = prefix ? `${prefix}[${attr}]` : attr
      query += objectToQuery(obj[attr], subPrefix)
    } else {
      if (prefix) {
        query += `${prefix}[${attr}]=${obj[attr]}`
      } else {
        query += `${attr}=${obj[attr]}`
      }
    }
    // 判断是否是第一层最后一个循环
    if (index !== attrs.length - 1) query += '&'
    return query
  }, '')
}

export function getQueryParameters(): { [key: string]: string } {
  const search = window.location.search.substring(1);
  const params = {};
  if (search) {
    const paramPairs = search.split('&');
    paramPairs.forEach((paramPair) => {
      const [key, value] = paramPair.split('='); 
      params[key] = decodeURIComponent(value); 
    });
  }
  return params;
}
/**
 * @description 异步队列
 * @param fun 执行的方法可以是异步
 * @param duration 间隔时间
 * @param immediately 是否立即执行
 * @return {*}
 */
export class AsyncQueue {
  public constructor(private queue: any[] = [], private running: boolean = false) {}

  public push(fun: any, duration: number, immediately = false) {
    return new Promise((resolve, reject) => {
      // 将传入的Funtion包装一层，添加队列中
      if (this.queue.length === 0 && immediately) {
        this.queue.push(async () => {
          this.running = true
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个完成后，去除队列中的第一个任务，shift取出队列第一个?.()如果是function则执行
          this.queue.shift()?.()
        })
      } else {
        this.queue.push(async () => {
          this.running = true
          await this.sleep(duration)
          try {
            const res = await fun()
            resolve(res)
          } catch (e) {
            reject(e)
          }
          this.running = false
          // 上一个完成后，去除队列中的第一个任务
          this.queue.shift()?.()
        })
      }
      // 当前是否有任务在执行，没有则取出队列中第一个任务执行
      if (!this.running) {
        this.queue.shift()?.()
      }
    })
  }

  private sleep(t: number): Promise<any> {
    return new Promise((r) => setTimeout(r, t))
  }
}


/**
 * @description: 16进制颜色转rgba
 * @param {string} str
 * @return {*}
 */
export function colorConvert(str: string, num = 1) {
    var sColor = str.toLowerCase()
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#'
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      //处理六位的颜色值
      var sColorChange = []
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return `RGBA(${sColorChange.join(',')},${num})`
    }
    return sColor
  }

/**
 * @description: 时间格式转化
 * @param {string} beforeDate
 * @param {string} format
 * @return {*}
 */
export function formatDate(beforeDate: string|any, format: string): string {
     function padleFtZero(str: string) {
        return ('00' + str).substring(str.length)
     }
    const date = new Date(beforeDate)
    const weekArr = ['日', '一', '二', '三', '四', '五', '六']
    if (/(y+)/.test(format)) {
      const year = date.getFullYear()
      format = format.replace(/(y+)/, (matchStr) => {
        return `${year}`.substring(4 - matchStr.length)
      })
    }
    const timeTypeMap: TimeTypeValueMap = {
      'Y+':date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'Q+': Math.ceil((date.getMonth() + 1) / 3)
    }

    for (let k in timeTypeMap) {
      if (new RegExp(`(${k})`).test(format)) {
        let str =
          k === 'Q+' ? weekArr[timeTypeMap[k as TimeType]] : `${timeTypeMap[k as TimeType]}`
        format = format.replace(new RegExp(`(${k})`), (matchStr) => {
          if(str.length===4)return str;
          return matchStr.length === 1 ? str : padleFtZero(str)
        })
      }
    }
    return format
  }
 
  type TimeType = 'Y+'|'M+' | 'd+' | 'H+' | 'm+' | 's+' | 'Q+'

  type TimeTypeValueMap = {
    [key in TimeType]: number
  }


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

export function createSharedComposable(composable) {
  let subscribers = 0
  let state, scope

  const dispose = () => {
    if (scope && --subscribers <= 0) {
      scope.stop()
      state = scope = null
    }
  }

  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope.run(() => composable(...args))
    }
    onScopeDispose(dispose)
    return state
  }
}
export function debounce(fn: any, time = 50) {
  let timer: number | null = null
  return function (this: any, ...args: any) {
    clearTimeout(timer as number)
    timer = window.setTimeout(() => {
      fn.apply(this, args)
    }, time)
  }
}
export function throttled(fn, delay = 500) {
    let oldtime = Date.now()
    return function (...args) {
        let newtime = Date.now()
        if (newtime - oldtime >= delay) {
            fn.apply(null, args)
            oldtime = Date.now()
        }
    }
}
// 职责链模式安装
export function dutyChainInstall() {
  Function.prototype.dutyChain = function (fn) {
    const self = this
    return function (this: any, ...args) {
      const ret = self.apply(this, args)
      if (ret === 'nextSuccessor') {
        return fn.apply(this, args)
      }
      return ret
    }
  }
}
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function handler(e) {
    x.value = e.x
    y.value = e.y
  }

  window.addEventListener('mousemove', handler)

  onScopeDispose(() => {
    window.removeEventListener('mousemove', handler)
  })

  return { x, y }
}
 // 封装哈希表构造函数 使用链地址法
 export  function HashTable() {
      // 属性
      //   存储数组
      this.storage = []
      //   已存总量
      this.count = 0
      //   哈希表数组总长度  应该为质数
      this.limit = 7
      //   loadFactor 装载因子  等于哈希表加入的内容量/数字长度
      //   大于0.75 性能会有明显下降 需要扩容，小于0.25 需要减小容量，为节省内存
      // 方法
      HashTable.prototype.hashFunc = function (str, size) {
        // 1 定义hashCode
        let hashCode = 0
        // 2 霍纳算法，计算hashCode的值
        for (let i = 0; i < str.length; i++) {
          let strCode = str.charCodeAt(i) //将字符 转换为uniCode编码
          hashCode = 37 * hashCode + strCode // 哈希 函数里面常用37这个质数作为常数
        }
        // 3 取余操作
        let index = hashCode % size
        return index
      }
      // 插入&修改  因为不允许重复的key 所以插入和修改是一个方法
      HashTable.prototype.put = function (key, value) {
        // 1 根据key生成对应index
        let index = this.hashFunc(key, this.limit)
        // 2 根据index取出对应的bucket
        let bucket = this.storage[index]
        // 3 判断是否为null
        if (bucket == null) {
          bucket = []
          this.storage[index] = bucket
        }
        // 4 判断是否是修改数据
        for (let i = 0; i < bucket.length; i++) {
          // 通常 数据的保存应该用元组
          let tuple = bucket[i]
          if (tuple[0] == key) {
            tuple[1] = value
            // 如果修改了， 直接退出函数
            return
          }
        }
        // 5 添加
        bucket.push([key, value])
        this.count++
        //  6 判断是否需要扩容
        if (this.count > this.limit * 0.75) {
          let newSize = this.limit * 2
          newSize = this.getPrime(newSize)
          this.resize(newSize)
        }
      }
      // 查询
      HashTable.prototype.get = function (key) {
        // 1 根据key获取对应的index
        let index = this.hashFunc(key, this.limit)
        // 2 根据index获取bucket
        let bucket = this.storage[index]
        // 3 判断是否为null
        if (bucket === null) {
          return null
        }
        // 4 有bucket，进行线性查找
        for (let i = 0; i < bucket.length; i++) {
          const tuple = bucket[i]
          // 找到 就直接返回信息 退出函数
          if (tuple[0] == key) {
            return tuple[1]
          }
        }
        // 没有
        return null
      }
      // 删除
      HashTable.prototype.remove = function (key) {
        // 1 根据key获取对应的index
        let index = this.hashFunc(key, this.limit)
        // 2 根据index获取bucket
        let bucket = this.storage[index]
        // 3 判断是否为null
        if (bucket === null) {
          return null
        }
        // 4 有bucket，进行线性查找
        for (let i = 0; i < bucket.length; i++) {
          const tuple = bucket[i]
          // 找到 就删除 并返回删除的内容 退出函数
          if (tuple[0] == key) {
            bucket.splice(i, 1)
            this.count--
            // 如果储存量太小 就减少容量
            if (this.limit > 7 && this.count < this.limit * 0.25) {
              let newSize = Math.floor(this.limit / 2)
              newSize = this.getPrime(newSize)
              this.resize(newSize)
            }
            return tuple[1]
          }
        }

        // 没有
        return null
      }
      // 是否为空
      HashTable.prototype.isEmpty = function () {
        return this.count == 0
      }
      // 获取储存的内容数量
      HashTable.prototype.size = function () {
        return this.count
      }
      // 扩容/缩容
      HashTable.prototype.resize = function (newLimit) {
        // 1 保存旧的数组内容
        let oldStorage = this.storage
        // 重置所有属性
        this.storage = []
        this.count = 0
        this.limit = newLimit
        // 遍历旧数据中所有bucket
        for (let i = 0; i < oldStorage.length; i++) {
          let bucket = oldStorage[i]
          if (bucket == null) {
            continue
          }
          // 遍历bucket 重新插入  因为limit变了，index位置是跟limit有关的
          for (let j = 0; j < bucket.length; j++) {
            let tuple = bucket[j]
            this.put([tuple[0], tuple[1]])
          }
        }
      }
      HashTable.prototype.isPrime = function (num) {
        let temp = parseInt(Math.sqrt(num))
        for (let i = 2; i <= temp; i++) {
          if (num % i == 0) {
            return false
          }
        }
        return true
      }
      HashTable.prototype.getPrime = function (num) {
        while(!this.isPrime(num)){
          num++
        }
        return num
      }
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
export function useTimeDown(minTime = 0,maxTime=60) {
  const time = ref(minTime)
  const isEnd = computed(()=>time.value===minTime)
  let timer:null|number = null
  function run(){
    if(!isEnd.value) return ;
    time.value = maxTime
    timer = setInterval(()=>{
      if( --time.value<=minTime){
        time.value = minTime
        clearInterval(timer as number)
        timer=null
      }
    },1000)
  }
  onScopeDispose(()=>{
    timer!==null&&clearInterval(timer)
    timer=null
    time.value = minTime
  })
  return {time,isEnd,run}
}
export function md5(str: string) {
  const rotateLeft = (n, s) => (n << s) | (n >>> (32 - s));

  const safeAdd = (x, y) => {
    const lsw = (x & 0xffff) + (y & 0xffff);
    const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };

  const convertToWordArray = (str) => {
    const wordArray:number[] = [];
    for (let i = 0; i < str.length * 8; i += 8) {
      wordArray[i >> 5] |= (str.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return wordArray;
  };

  const wordToHex = (value) => {
    let hex = "";
    const mask = 0xff;
    for (let i = 0; i < 4; i++) {
      hex += ((value >> (i * 8)) & mask).toString(16).padStart(2, "0");
    }
    return hex;
  };

  const md5core = (message) => {
    const blocks = convertToWordArray(message);
    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    for (let i = 0; i < blocks.length; i += 16) {
      let aa = a;
      const bb = b;
      const cc = c;
      const dd = d;

      a = safeAdd(a, (b & c) | (~b & d));
      d = safeAdd(d, (a & b) | (~a & c));
      c = safeAdd(c, (d & a) | (~d & b));
      b = safeAdd(b, (c & d) | (~c & a));

      for (let j = 0; j < 16; j++) {
        const index = i + j;
        const x = blocks[index] || 0;
        let y = 0;

        if (j < 8) {
          y = rotateLeft(x, (j % 4) * 8);
        } else {
          y = rotateLeft(x, (j % 4) * 8 + 7);
        }

        y = safeAdd(y, aa);
        y = safeAdd(y, x);
        y = safeAdd(y, j < 8 ? b ^ c ^ d : (b & c) | (~b & d));

        aa = d;
        d = c;
        c = b;
        b = y;
      }

      a = safeAdd(a, aa);
      b = safeAdd(b, bb);
      c = safeAdd(c, cc);
      d = safeAdd(d, dd);
    }

    return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
  };

  return md5core(str);
}




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

export type optionType = {
    childrenKey?: string;
    stopKey?: any;
  };
  
 
  /**
   * @description: 递归执行
   * @param {any} data 需要递归的数据
   * @param {function} method 递归时对每个数据点执行的函数，参数1：正在执行的数据 参数2：深度 参数3：同级节点中的index下标（数组）
   * @param {optionType} option 配置     childrenKey: 子级节点的key，默认children ;   stopKey: 停止标识，若method返回了这个值，则提前中止递归;
   * @return {*}
   */
  export function recursion(
    data: any[] | { [key: string | number]: any },
    method: (data:any,depth:number,index?:number) => any,
    option: optionType = {
      childrenKey: undefined,
      stopKey:undefined
    }
  ) {

    if(!option.childrenKey){option.childrenKey='children'}

    return recursionMethod(data,1);
  
    function recursionMethod(data: any,depth:number) {
      // 如果是数组 则进行一次循环 来进行递归
      if (data instanceof Array) {
          data.forEach((iterator,index)=>{
              const stopFlag = method(iterator,depth,index);
              if (option.stopKey !== undefined && stopFlag === option.stopKey) {
                return;
              }
              if (
                iterator[option.childrenKey as string] !== null &&
                iterator[option.childrenKey as string] !== undefined
              ) {
                recursionMethod(iterator[option.childrenKey as string],depth+1);
              }
          })
      
      } else {
        // 如果是是对象，则直接执行，并查看是否有子元素
        const stopFlag = method(data,depth);
        if (option.stopKey !== undefined && stopFlag === option.stopKey) {
          return;
        }
        if (
          data[option.childrenKey as string] !== null &&
          data[option.childrenKey as string] !== undefined
        ) {
          recursionMethod(data[option.childrenKey as string],depth+1);
        }
      }
    }
  }
export function loadRemoteScript(url: string,arrt:'defer'|'async'='defer',callback?:(...any:any)=>any) {
  const scriptTag = document.createElement('script')
  scriptTag.src = url
  scriptTag[arrt] = true // 使用 defer 属性延迟加载脚本
  if(callback){
    scriptTag.onload = callback;
  }
  scriptTag.onerror = function () {
    console.error('远程脚本加载失败！')
  }
  document.head.appendChild(scriptTag)
}

export const getDayGap: any = (startime: string, endtime: string) => {
  startime = startime.replace(new RegExp("-", "gm"), "/");//转换-变为/
  endtime = endtime.replace(new RegExp("-", "gm"), "/");
  const minTime = new Date(startime).getTime() > new Date(endtime).getTime() ? endtime : startime
  const maxTime = new Date(startime).getTime() > new Date(endtime).getTime() ? startime : endtime
  const start = new Date(minTime);
  const startYear = start.getFullYear(); //开始年份
  const startMonth = start.getMonth() + 1;//开始月份
  const end = new Date(maxTime);
  const endYear = end.getFullYear(); //结束年份
  const endMonth = end.getMonth() + 1;//结束月份
  //  年
  const mideleYear = new Date(minTime)
  mideleYear.setFullYear(endYear)
  let years = Math.abs(mideleYear.getFullYear() - start.getFullYear());
  if (mideleYear.getTime() > end.getTime()) {
    years--
  }
  // 月
  const mideleMonthDay = new Date(minTime)
  mideleMonthDay.setFullYear(endYear)
  mideleMonthDay.setMonth(endMonth - 1)
  console.log(mideleMonthDay.toLocaleDateString())
  let months = (endYear * 12 + endMonth) - (startYear * 12 + startMonth) - years * 12
  if (mideleMonthDay.getTime() > end.getTime()) {
    months--
  }

  // 日
  let day = (Math.floor((end.getTime() - start.getTime()) / 24 / 60 / 60 / 1000))
  if (end.getTime() > mideleMonthDay.getTime()) {
    day = (Math.floor((end.getTime() - mideleMonthDay.getTime()) / 24 / 60 / 60 / 1000)) - day
  } else {
    const prevMonthDay = new Date(mideleMonthDay)
    prevMonthDay.setMonth(endMonth - 2)
    day = (Math.floor((end.getTime() - prevMonthDay.getTime()) / 24 / 60 / 60 / 1000))
  }
  const chaTime = end.getTime() - start.getTime()
  const chaDay = Math.floor(chaTime / 24 / 60 / 60 / 1000)
  const hour = Math.floor(chaTime / 60 / 60 / 1000) - chaDay * 24
  const min = Math.floor(chaTime / 60 / 1000) - chaDay * 24 * 60 - hour * 60
  const sec = Math.floor(chaTime / 1000) - chaDay * 24 * 60 * 60 - hour * 60 * 60 - min * 60
  const chastr = years + '-' + months + '-' + day + ' ' + hour + ':' + min + ':' + sec + '';
  console.log('相差时间：' + chastr);
  return chastr
}

export type getYearListOptions = {
  // 指定年份
  year?: number | string
  // 是否 取 未来年份
  isFuture?: boolean
  // 是否正序
  isAsc?: boolean
  // 返回的年份值是否为数字
  isNumber?: boolean
  // 是否简单类型
  isSingle?: boolean
  // 当返回的年份Item为对象格式时 label-key字段
  labelKey?: string
  // 当返回的年份Item为对象格式时 value-key字段
  valueKey?: string
}
/**
 * @description: 当前年/指定年，往前/往后 取 n年 列表 可以配置 返回 简单结构/对象结构(满足筛选组件筛选项结构)的数组
 * @return {*}
 */
export function getYearList(
  num = 5,
  { year, isFuture = false, isAsc = true, isNumber = true, isSingle = true, labelKey = 'label', valueKey = 'value' } = {} as getYearListOptions
) {
  const currentYear = year ? new Date(`${year}`).getFullYear() : new Date().getFullYear()
  const originYearList:any[] = []

  for (let i = 0; i < num; i++) {
    const value = isFuture ? currentYear + i : currentYear - i
    const transformedValue = isNumber ? value : `${value}`
    const pushItem = !isSingle
      ? {
          [labelKey]: `${value}`,
          [valueKey]: transformedValue
        }
      : transformedValue
    originYearList.push(pushItem)
  }
  if ((isFuture && !isAsc) || (!isFuture && isAsc)) {
    originYearList.reverse()
  }
  return originYearList
}

export function sortByKey(arr:any,property:string, aOrder:boolean = false) {
  const backupArr = JSON.parse(JSON.stringify(arr))
  const compareArr = (a:any, b:any) => {
    var x = (a[property].toString().substr(0, 1)).charCodeAt()
    var y = (b[property].toString().substr(0, 1)).charCodeAt()
    return aOrder ? x - y : y -x
  }
  return backupArr.sort(compareArr)
}
export function deepClone(obj:any) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
export const chineseChar2englishChar = (str,type)=>{
    if(type==='english'){
        return chaineseToEnglish(str)
    }
    if(type==='chinese'){
        return englishToChainese(str) 
    }

    function chaineseToEnglish(chineseChar){
        // 将单引号‘’都转换成'，将双引号“”都转换成"
        var str = chineseChar.replace(/\’|\‘/g,"'").replace(/\“|\”/g,"\"");
        // 将中括号【】转换成[]，将大括号｛｝转换成{}
        str = str.replace(/\【/g,"[").replace(/\】/g,"]").replace(/\｛/g,"{").replace(/\｝/g,"}");
        // 将逗号，转换成,，将：转换成:，将。转换成.
        str = str.replace(/，/g,",").replace(/：/g,":").replace(/。/g,".");
        return str;
    }
    function englishToChainese(html) {
        const symbolMap = {
        ':': '：',
        ';': '；',
        '(': '（',
        ')': '）',
        ',': '，',
        '.': '。',
        '!': '！',
        '?': '？',
        };
        const replaceFn = (match) => {
            let result = '';
            for (const char of match) {
                result += symbolMap[char] || char;
            }
            return result;
        };
        const result = html.replace(/(?<=^|>)([^><]+?)(?=<|$)(?!&\S+;)/g, replaceFn);
        return result;
    }
}


/**
 * @description: 地址栏获取参数，返回对象（兼容hash模式）
 * @return {*}
 */
export function getQueryParams() {
  const originUrlParamsStr = decodeURIComponent(window.location.search || window.location.hash)
  // match 返回数组，0下标为匹配的结果
  const matchResultArr = originUrlParamsStr.match(/(?<=\?).*/) ?? []
  const [matchResult] = matchResultArr
  const params = {}
  if (matchResult) {
    const keyValuePairList = matchResult.split('&')
    keyValuePairList.forEach((paramPair) => {
      const [key, value] = paramPair.split('=')
      params[key] = value
    })
  }
  return params
}
export interface RatioNumOptions {
  valueKey?: string
  ratioKey?: string
  fixedDigit?: number
  isPrecent?: boolean
  hasSymbol?: boolean
  mode?: 'max' | 'total'
}
/**
 * @description:
 * @param {T[]} originData 参与计算百分比的 源数据数组
 * @param {string} valueKey 参与计算值的 key值映射
 * @param {string} ratioKey 计算生成的比率值 key值映射
 * @param {number} fixedDigit 取小数点后n位
 * @param {boolean} isPrecent  是否转换成百分比  *100
 * @param {boolean} hasSymbol  是否带%，与isPrecent共同作用
 * @param {'max'|'total'} mode 模式切换： max是数组最大值作为 基数参与取比率，total是取数组和最为基数 参与取比率
 * @return {*}
 */
export function getRatioNum<T = any>(
  originData: T[],
  { valueKey = 'value', ratioKey = 'precent', fixedDigit = 2, isPrecent = false, hasSymbol = false, mode = 'max' } = {} as RatioNumOptions
) {
  if (!originData || originData.length === 0) return originData
  let divisor = 0
  const valueArray = originData.map((ele) => ele[valueKey]).filter((ele) => typeof ele !== 'undefined')
  if (mode === 'max') {
    divisor = Math.max.apply(null, valueArray)
  } else if (mode === 'total') {
    divisor = valueArray.reduce((total, ele) => {
      return (total += ele)
    }, 0)
  }
  if (divisor === 0) return originData
  return originData.map((ele) => {
    let value = ele[valueKey] !== 'undefined' ? ele[valueKey] / divisor : 0
    if (isPrecent) {
      value *= 100
    }
    const fixedValue = Number(value.toFixed(fixedDigit))

    return {
      ...ele,
      [ratioKey]: hasSymbol ? `${fixedValue}%` : fixedValue
    }
  })
}
export function getElapseDate(dateTime:string, days:number) {
  const dateTemp = dateTime.split("-");
  const nDate:any = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); 
  const millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
  const rDate = new Date(millSeconds);
  let year = rDate.getFullYear();
  let month:number | string = rDate.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let date:number | string = rDate.getDate();
  if (date < 10) date = "0" + date;
  return (year + "-" + month + "-" + date);
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

 export const validateFunc = (num:string|number):boolean=>{
      const regexs = [
        /^1[3456789]\d{9}$/, //手机号验证
        /^0\d{2,3}-\d{7,8}$/, // 固话验证
        /^\d{17}(\d|X)$/, //身份证验证
        /^(\d{1,3}\.){3}\d{1,3}$/,  // ip地址验证
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, //邮箱验证
        /^\d{4,6}$/  // 验证码验证
      ];
      return regexs.some(item=>{
        return item.test(String(num))
      })
  }
export const validatePassword = (str:string):boolean=>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*?\(\)])[A-Za-z0-9!@#$%^&*?\(\)]/;
    return regex.test(str);
}
export const toCamelCase = (value: string) => {
  if(value.includes('_')) {
    return value.replace(/\_(\w)/g, (_, letter) => letter.toUpperCase())
  } else {
    return value.replace(/([A-Z])/g, '_$1').toLowerCase()
  }
}
export function delNullKey(obj: Object) {
  if(typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      const objVal = obj[key as keyof typeof obj]
      if(typeof objVal !== 'boolean' && objVal !== 0 && !objVal) {
        delete obj[key as keyof typeof obj]
      }
    })
  }
}
export function getNowDate(format: string='YYYY-MM-DD hh:mm:ss')  {
  let tv = new Date()
  const tf = function(i: number){return (i < 10 ? '0' : '') + i};
  const getTime:any = (a: string) => {
    switch(a){
      case 'YYYY':
        return tf(tv.getFullYear());

      case 'MM':
        return tf(tv.getMonth() + 1);

      case 'mm':
        return tf(tv.getMinutes());

      case 'DD':
        return tf(tv.getDate());

      case 'hh':
        return tf(tv.getHours());

      case 'ss':
        return tf(tv.getSeconds());
  
      }
  }
  return format.replace(/YYYY|MM|DD|hh|mm|ss/g, (a) => getTime(a)) 
}
interface optionsType {
  [key: string]: (...arg: any) => any
}

/**
 * @description: 对query中的参数 执行指定功能函数

 * @param {optionsType} methondOptions 配置对象  {
                                                [key: string]: (...arg: any) => any
                                                }
 * @param {any} query query对象 若不填写 则使用(window.location.search和URLSearchParams自动判断
 * @return {*}
 */
export function queryMethods(methondOptions: optionsType, query?: any,) {
  if (!(methondOptions instanceof Object) || !methondOptions) return console.error('queryMethods 得到的参数不正确')
  if (!query || !(query instanceof Object)) {
    // TS语言本身还有没完成的bug 所有这里加入 as any
    query = Object.fromEntries((new URLSearchParams(window.location.search) as any).entries())
  }
  return Object.keys(methondOptions).map((key: string) => {
    return methondOptions[key](query[key])
  })
}


export function useWatchStorage(stroagekey: 'localStorage' | 'sessionStorage' = 'localStorage') {
  // 建立一个响应式对象
  const stroage = ref({})
  // 修改后的函数
  const methods = {
    length: computed(() => Object.keys(stroage.value).length),
    key(index: number) {
      if (typeof index !== 'number') return
      return computed(() => Object.keys(stroage.value)[index])
    },
    getItem(key: string) {
      return computed(() => JSON.parse(stroage.value[key]||'null'))
    },
    setItem(key: string, value: any) {
      stroage.value[key] = JSON.stringify(value)
      window[stroagekey].setItem(key, JSON.stringify(value||'null'))
    },
    removeItem(key: string) {
      delete stroage.value[key]
      window[stroagekey].removeItem(key)
    },
    clear() {
      for (const key in stroage.value) {
        delete stroage.value[key]
      }
      window[stroagekey].clear()
    },
    init() {
      stroage.value = { ...window[stroagekey] }
      stroage.value.__proto__ = methods
    }
  }
  // 初始化
  methods.init()

  return { stroage, ...methods }
}

/**
 * @description 生成随机字符串
 * @param length   字符串长度，默认16位
 * @param useUpperCase  是否使用大写字母，默认为是
 * @param useLowerCase 是否使用小写字母，默认为是
 * @param useNumbers  是否使用数字，默认为是
 * @param useSymbols  是否使用标点符号，默认为否
 */
export const generateRandomString = (length = 16, useUpperCase = true , useLowerCase = true, useNumbers = true, useSymbols = false) => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_-+=[]{}|;:,.<>?';

  let allChars = '';

  if (useUpperCase) allChars += uppercaseChars;
  if (useLowerCase) allChars += lowercaseChars;
  if (useNumbers) allChars += numberChars;
  if (useSymbols) allChars += symbolChars;

  if (allChars.length === 0) {
    throw new Error("请至少选择一个字符集合类型");
  }

  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    randomString += allChars.charAt(randomIndex);
  }

  return randomString;
}
/**
 * 
 * @param targetElement 要监听的元素
 * @param callback 带参数的回调函数，参数为是否进入可见区域
 */
export function isElementInviewport(targetElement:any, callback:any) {
  if (!targetElement || !(targetElement instanceof Element)) {
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 目标元素进入可见区域
        callback(true);
      } else {
        // 目标元素离开可见区域
        callback(false);
      }
    });
  });
  
  // 开始监视目标元素
  observer.observe(targetElement);
}
/**
 * 
 * @param param 指令模式下不传任何参数；非指令模式下直接传入数值 or json对象
 *  {
 *      from: 100,   // 动画起始值
        duration: 5000,  // 动画执行时间，单位ms
        precision: 0,  //数字精度
        showSeparator: true // 是否显示分隔符“，”
        callback(val){ // val为实时变化的值}
 *    }
 */
function animateNumber(param:any) {
    if (!param) {
        // Vue 指令模式   
        const bind = (el:any, binding:any) => {
            // 获取传递给指令的数据
            const value = binding.value.to || binding.value
            const obj = typeof binding.value == 'number' ? {to:binding.value} : binding.value
            animate({
                ...obj,
                callback(activeValue:any) {
                    el.textContent = activeValue;
                },
            });
        };
        return bind
    } else {
        // 动画模式
        animate(param);
    }
    function animate(parameter:any) {
        if(!parameter) return
        const obj = parameter
        const to = parameter.to
        const startTime = Date.now();

        // 定义贝塞尔曲线，这里使用了一个简单的缓动函数
        function easeInOutCubic(t: any) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(2 - 2 * t, 3) / 2;
        }
        function addSeparator(number:any) {
            // 使用正则表达式添加分隔符，例如千位分隔符
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        function updateValue() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const durationValue = obj.duration || 2000
            let animatedValue
            // 使用 toFixed 方法来保留指定的精度
            const precisionValue = obj.precision || 0
            if (elapsedTime < durationValue) {
                const progress = elapsedTime / durationValue;
                const easedProgress = easeInOutCubic(progress);
                const fromValue = obj.from || 0
                animatedValue = fromValue + (to - fromValue) * easedProgress;

                
                animatedValue = precisionValue == 0 ? Math.round(animatedValue) : Number(animatedValue.toFixed(precisionValue));
                // 如果传递了分隔符参数，添加分隔符  
                if (obj.showSeparator) {
                    animatedValue = addSeparator(animatedValue);
                }
                requestAnimationFrame(updateValue);
            } else {
                // 动画结束
                animatedValue = precisionValue == 0 ? Math.round(to) : Number(to.toFixed(precisionValue));
            }
            // 更新显示的数值或执行其他操作 
            obj.callback(animatedValue)
        }

        // 启动动画
        requestAnimationFrame(updateValue);
    }
}
export const formatNumber = (x:Number)=>{
    if(typeof x != 'number'){
        return false;
    }
    const str = x.toString()
    if(str.indexOf('.')>=0){
        // 判断有小数点
        const arr = str.split('.')
        return arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"."+arr[1]
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const mergeSort = (arr: Array<Object>, Func: any) => {
  const sort = (arr: Array<Object>) => {
    const len = arr.length
    if (len < 2) {
      return arr
    }
    // 取得当前数组的中间位置
    const mid = Math.floor(len / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid)
    // 递归调用，不断重复直到当前数组拆分剩1项
    return merge(sort(left), sort(right))
  }

  function merge(left: any, right: any) {
    const result:any = []
    while (left.length && right.length) {
      if (Func(left[0], right[0])) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    while (left.length) {
      result.push(left.shift())
    }

    while (right.length) {
      result.push(right.shift())
    }
    // 这样一趟下来后，两个数组就合并为一个新的排序数组
    return result
  }
  return sort(arr)
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
export function binarySearch(list, item) {
  let low = 0
  let high = list.length - 1
  let mid, guess

  while (low <= high) {
    mid = Math.floor((low + high) / 2) // 取中间的索引下标，如果是奇数则向下取整
    guess = list[mid] // 取中间的值
    if (guess == item) {
      return mid // 对了
    }
    if (guess > item) {
      high = mid - 1 // 大了
    } else {
      low = mid + 1 // 小了
    }
  }
  return '没有元素'
}
export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    // 使用 navigator.clipboard API（Chrome 66+）
    navigator.clipboard.writeText(text).then(() => {
      console.log('文本已成功复制到剪贴板');
    }).catch((err) => {
      console.error('无法复制文本到剪贴板：', err);
    });
  } else if ((window as any).clipboardData && (window as any).clipboardData.setData) {
    // 兼容旧版 IE 浏览器
    (window as any).clipboardData.setData('Text', text);
    console.log('文本已成功复制到剪贴板');
  } else {
    // 使用 document.execCommand('copy') 方法（Chrome 43+、Firefox 41+、Safari 10+、Edge 12+）
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // 使其不可见
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      console.log('文本已成功复制到剪贴板');
    } catch (err) {
      console.error('无法复制文本到剪贴板：', err);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}
/**
 * @description: 导出表格
 * @param TableData  数据
 * @param columns   需要导出的字段
 * @param FileName  导出文件名
 * @param pageName 
 */
interface columnsType {
  key: string
  title: string
}
export function exportExcel(TableData: string | any[], columns: columnsType[], FileName: string, pageName?: string) {
  if (!TableData) return
  //转化json为object
  const arrData = typeof TableData != 'object' ? JSON.parse(TableData) : TableData
  let excel = '<table>'
  //设置表头
  let row = '<tr>'
  if (columns) {
    for (const i in columns) {
      row += "<th align='center'>" + columns[i].title + '</th>'
    }
  }
  excel += row + '</tr>'
  //设置数据
  for (let i = 0; i < arrData.length; i++) {
    let row = '<tr>'
    columns.forEach(item => {
      const value = arrData[i][item.key] == null ? '' : arrData[i][item.key]
      row += "<td align='center'>" + value + '</td>'
    })
    excel += row + '</tr>'
  }
  excel += '</table>'
  const excelFile = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:x="urn:schemas-microsoft-com:office:excel"
  xmlns="http://www.w3.org/TR/REC-html40">
  <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
    <x:Name>${pageName || FileName}</x:Name>
    <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
    </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head><body>${excel}</body></html>`;
  const uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile)
  const link = document.createElement('a')
  link.href = uri
  link.style.visibility = 'hidden'
  link.download = FileName + '.xls'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
export type EventType = string | symbol;

// 事件处理程序可以采用可选的事件参数
// 并且不应返回值
export type Handler<T = unknown> = (event: T) => void;
export type WildcardHandler<T = Record<string, unknown>> = (
	type: keyof T,
	event: T[keyof T]
) => void;

// 某个类型的所有当前注册事件处理程序的数组
export type EventHandlerList<T = unknown> = Array<Handler<T>>;
export type WildCardEventHandlerList<T = Record<string, unknown>> = Array<
	WildcardHandler<T>
>;

// 事件类型及其相应事件处理程序的映射。
export type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<
	keyof Events | '*',
	EventHandlerList<Events[keyof Events]> | WildCardEventHandlerList<Events>
>;

export interface Emitter<Events extends Record<EventType, unknown>> {
	all: EventHandlerMap<Events>;

	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
	on(type: '*', handler: WildcardHandler<Events>): void;

	off<Key extends keyof Events>(
		type: Key,
		handler?: Handler<Events[Key]>
	): void;
	off(type: '*', handler: WildcardHandler<Events>): void;

	emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
	emit<Key extends keyof Events>(
		type: undefined extends Events[Key] ? Key : never
	): void;
    clear():void
}



export function zMittInstall(){
        /**
     * 生成一个事件总线
     * @name mitt
     * @returns {Mitt}
     */
    function mitt<Events extends Record<EventType, unknown>>(
        all?: EventHandlerMap<Events>
    ): Emitter<Events> {
        type GenericEventHandler =
            | Handler<Events[keyof Events]>
            | WildcardHandler<Events>;
        all = all || new Map();

        return {
            /**
             *事件名称到注册处理函数的映射。
            */
            all,

            /**
             * 为给定类型注册事件处理程序。
             * @param {string|symbol} type 要侦听的事件类型，或所有事件的“*”
             * @param {Function} handler 响应给定事件调用的函数
             * @memberOf mitt
             */
            on<Key extends keyof Events>(type: Key, handler: GenericEventHandler) {
                const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
                if (handlers) {
                    handlers.push(handler);
                } else {
                    all!.set(type, [handler] as EventHandlerList<Events[keyof Events]>);
                }
            },

            /**
             * 删除给定类型的事件处理程序。
             * 如果省略“handler”，则删除给定类型的所有处理程序。
             * @param {string|symbol} type 用于取消注册“handler”的事件类型（“*”用于删除通配符处理程序）
             * @param {Function} [handler] 要删除的处理函数
             * @memberOf mitt
             */
            off<Key extends keyof Events>(type: Key, handler?: GenericEventHandler) {
                const handlers: Array<GenericEventHandler> | undefined = all!.get(type);
                if (handlers) {
                    if (handler) {
                        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                    } else {
                        all!.set(type, []);
                    }
                }
            },

            /**
             * 调用给定类型的所有处理程序。
             * 如果存在，则在类型匹配的处理程序之后调用“*”处理程序。
             *
             * 注意：不支持手动触发“*”处理程序。
             *
             * @param {string|symbol} type 要调用的事件类型
             * @param {Any} [evt] 任何值（推荐使用对象并且功能强大），传递给每个处理程序
             * @memberOf mitt
             */
            emit<Key extends keyof Events>(type: Key, evt?: Events[Key]) {
                let handlers = all!.get(type);
                if (handlers) {
                    (handlers as EventHandlerList<Events[keyof Events]>)
                        .slice()
                        .map((handler) => {
                            handler(evt!);
                        });
                }

                handlers = all!.get('*');
                if (handlers) {
                    (handlers as WildCardEventHandlerList<Events>)
                        .slice()
                        .map((handler) => {
                            handler(type, evt!);
                        });
                }
            },
            clear(){
                all?.clear()
            }
        };
    }

    if(!window.zMitt){
        window.zMitt = mitt()
    }
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

export function buildTree(data, idKey, pidKey) {
    const nodes = {};
    let root = null;

    // 创建节点映射
    data.forEach(item => {
        nodes[item[idKey]] = item;
        item.children = null; // 初始化为 null
    });

    // 构建树结构
    data.forEach(item => {
        const parentId = item[pidKey];
        if (parentId === null) {
            root = item; // 根节点
        } else {
            if (nodes[parentId]) {
                if (nodes[parentId].children === null) {
                    nodes[parentId].children = []; // 如果子节点为 null，则初始化为数组
                }
                nodes[parentId].children.push(item); // 将当前节点添加到父节点的子节点列表中
            }
        }
    });

    return root;
}
export function treeConvertFlattenArray(tree) {
    const result:any = [];

    function flatten(node) {
        if (node) {
            result.push({ id: node.id, name: node.name });
            if (node.children) {
                node.children.forEach(child => {
                    flatten(child);
                });
            }
        }
    }

    flatten(tree);
    return result;
}


export interface HisRefType<T> {
  value: T
  _undo: () => void
  _redo: () => void
  _reset: (onlyValue?: boolean) => void
  _history: T[]
}
/**
 * @description: 历史记录Ref
 * @param {T} value 和ref的参数一样的值
 * @param {*} maxlength 最大记录长度
 * @return {*}
 */
export function historyRef<T = any>(value: T, maxlength = 10): HisRefType<T> {
  const initVal = JSON.parse(JSON.stringify(value))
  const _history: T[] = reactive([value]) as T[]
  //   当前值 所在位置
  let currentIndex = 0
  const targetRef = reactive<HisRefType<T>>({
    value,
    _undo,
    _redo,
    _reset,
    _history
  }) as HisRefType<T>

  function _undo() {
    if (currentIndex > 0) {
      currentIndex--
      targetRef.value = _history[currentIndex]
    }
  }
  function _redo() {
    if (currentIndex < _history.length - 1) {
      currentIndex++
      targetRef.value = _history[currentIndex]
    }
  }
  function _reset(onlyValue = false) {
    // 如果传递参数true，列表也会情况
    if (!onlyValue) {
      _history.splice(0)
      _history.push(initVal)
    }
    targetRef.value = initVal
  }

  return new Proxy(targetRef, {
    get(target, p, receiver) {
      return targetRef[p]
    },
    set(target, p, newValue, receiver) {
      // 如果目前不是第一个,就将当前值之后的记录全部删除
      if (currentIndex !== _history.length - 1) {
        _history.splice(currentIndex + 1)
      }
      // 如果超出了最大的历史记录含量 删除第一个
      if (_history.length === maxlength) {
        _history.shift()
        currentIndex--
      }
      _history.push(JSON.parse(JSON.stringify(newValue)))
      currentIndex++
      return Reflect.set(target, p, newValue)
    }
  }) as unknown as HisRefType<T>
}

export function startClientMatch() {
  // 适配终端
  const _GXResizeEvent = () => {
    const nDefault_width = 1920
    const nDefault_height = 1080
    const nClient_width = document.documentElement.clientWidth
    const nClient_height = document.documentElement.clientHeight
    const nAuot_width = nClient_width / nDefault_width
    const nAuot_height = nClient_height / nDefault_height
    const jNodeBody: HTMLElement = document.getElementById('app') || document.createElement('div')
    jNodeBody.style.transformOrigin = `0% 0% 0`
    jNodeBody.style.transform = `scale(${nAuot_width},${nAuot_height})`
  }

  window.onresize = () => {
    _GXResizeEvent()
  }
  window.addEventListener('resize', _GXResizeEvent, false)
  window.addEventListener('load', _GXResizeEvent, false)
  // _GXResizeEvent()
}

function traverseTree(treeData, callback) {
  // 遍历树节点
  function traverse(node) {
    // 执行回调函数并传递当前节点
    const modifiedNode = callback(node)

    // 如果回调函数返回了修改后的节点，则使用它，否则使用原节点
    const currentNode = modifiedNode || node

    // 递归遍历子节点
    if (currentNode.children && currentNode.children.length > 0) {
      currentNode.children = currentNode.children.map(traverse)
    }

    return currentNode // 返回修改后的节点
  }

  // 从根节点开始遍历
  return traverse(treeData)
}

type TypeRulTo = 'string' | 'array' | 'enumerable' | 'number' | 'boolean' | 'null' | 'object';

export function checkDataType(value: any, typeVal?: TypeRulTo):any {
    // 校验数据类型
    if(typeVal == 'null' && !value && typeof value === 'object'){
        return true
    }
    if(typeof value != 'object'){
        return typeof value === typeVal
    }else{
        switch (typeVal) {
            case 'array':
                return Array.isArray(value);
            case 'enumerable':
                return typeof value === 'object';
            case 'object':
                return typeof value === 'object';
            default:
                return false;
        }
    }
}


/**
 * @description:  事件触发热区
 * @param {object} options 如果是传递了配置对象 至少传递宽高和位置
 * @param {any} methods 事件配置对象：{onCLick(){}}
 * @return {*} 最终生成的VNODE
 */
export function hotBlock(options: { left: string; top: string; width: string; height: string } & Partial<CSSStyleDeclaration>, methods: any): VNode
/**
 * @description: 事件触发热区
 * @param {string} options 传递一个class来控制样式，不过这个div是放body里的，需要注意生效
 * @param {any} methods 事件配置对象：{onCLick(){}}
 * @return {*} 最终生成的VNODE
 */
export function hotBlock(options: string, methods: any): VNode
/**
 * @description: 事件触发热区
 * @param {HTMLElement} options 指定一个Element,覆盖到其上面，使用率极低
 * @param {any} methods 事件配置对象：{onCLick(){}}
 * @return {*} 最终生成的VNODE
 */
export function hotBlock(options: HTMLElement, methods: any): VNode
export function hotBlock(
  options: string | HTMLElement | ({ left: string; top: string; width: string; height: string } & Partial<CSSStyleDeclaration>),
  methods
): VNode {
  const baseProps = {
    style: {
      position: 'absolute',
      zIndex: 3202
    }
  }
  let targetOptions = {}
  if (options instanceof HTMLElement) {
    const rect = options.getBoundingClientRect()
    targetOptions = mergeProps(
      baseProps,
      {
        style: {
          width: rect.width,
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          right: rect.right + window.scrollX,
          height: rect.height
        }
      },
      methods
    )
  } else if (typeof options === 'string') {
    targetOptions = mergeProps(
      baseProps,
      {
        class: options
      },
      methods
    )
  } else {
    targetOptions = mergeProps(
      baseProps,
      {
        style: options
      },
      methods
    )
  }
  const vnode = h('div', targetOptions)
render(vnode, document.body)
  return vnode
}

/**
 * 此处为mock接口
 *  获取文件流，这部分根据项目实际情况进行改动
 */


async function getFileResposne() {
  // 构建POST请求的数据
  const postData = {
    industryInfoLevelThree: '[]',
    parkInfoParkName: '[]',
    keyword: '91310120069385017L',
    page: 1,
    pageSize: 1000
  }
  // 发起 Axios POST 请求获取后端返回的数据流
  const response = await axios.post('https://mtyh-company-api.aihuoshi.net/lget/company/info/mt/company/download', postData, {
    responseType: 'blob' // 指定响应类型为二进制数据流
  })
  return response
}

/**
 * 看我看我 我是唯一导出并使用的
 * @description: 定义一个异步函数，用于从后端获取数据流并生成临时链接
 * 实际项目使用中，通常与导出联动，目前写一起了，有改动需求提给何磊（他压榨我，不让我写组件）
 */
export async function getTemporaryBlob() {
  try {
    const response = await getFileResposne()
    // 文件名
    const disposition = response.headers['content-disposition'].split('=')
    const filename = disposition ? disposition[1] : '文件'
    exportExcelFile(response.data, filename)
  } catch (error) {
    console.error('获取数据流失败', error)
    return null
  }
}

/**
 * @description:
 * @param {*} data 文件流的response.data
 * @param {*} name 导出的文件名
 * @return {*} 不返回啥
 */
function exportExcelFile(data: any, name: string) {
  // 一个blob型号的url
  const url: any = window.URL.createObjectURL(new Blob([data]))
  // 耦合写一起了，理论上项目里应该不会有只需要文件blob地址的情况
  // 如果只需要文件blob 不需要导出,那就把下面的内容return注释掉就可以了
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', `${name}`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

/**
 * 
 * @param treeData 树形结构数组
 * @param idKey 指定的key值
 * @param idToFind  指定的value值
 * @param currentLevel  当前层级，从0开始
 */
export function treeChidNodeLevel(treeData:any, idKey = 'id', idToFind:any, currentLevel = 0):number {
    for (const node of treeData) {
    if (node[idKey] === idToFind) {
        return currentLevel;
    }
    if (node.children) {
        const childLevel = treeChidNodeLevel(node.children, idKey, idToFind, currentLevel + 1);
        if (childLevel !== -1) {
          return childLevel;
        }
    }
    }
    return -1;
}
/**
 * 
 * @param treeData 树形结构数组
 * @param idField 要查找的字段key
 * @param idToFind 要查找的数据value
 */
export function findParentNodeById(treeData:any, idField = 'id', idToFind:any ) {
  let parentNode = null;

  function findNodes(node:any) {
    if (node.children) {
      for (const childNode of node.children) {
        if (childNode[idField] === idToFind) {
          // 如果找到匹配节点，将其父节点设置为上一级节点
          parentNode = node;
        } else {
          findNodes(childNode);
        }
      }
    }
  }

  // 从根节点开始查找
  for (const rootNode of treeData) {
    findNodes(rootNode);
    // 如果找到匹配节点的上一级节点，不再继续查找
    if (parentNode) {
      break;
    }
  }

  return parentNode;
}
/**
 * 
 * @param treeData 树形结构数组
 * @param flatData  平铺数组
 * @param treeIdKey  树结构的唯一身份字段名称
 * @param flatGroupIdKey  平铺数组分组依赖id
 */
export function arrayBlendInTree(treeData: any, flatData: any, treeIdKey: string, flatGroupIdKey: string) {
    const flatDataMap = new Map();

    // 创建平铺数组的映射，以便根据 groupId 查找节点
    flatData.forEach(item => {
      const groupId = item[flatGroupIdKey];
      if (!flatDataMap.has(groupId)) {
          flatDataMap.set(groupId, []);
      }
      flatDataMap.get(groupId).push(item);
    });

    // 递归函数，用于插入节点
    function insertNode(node:any) {
      const id = node[treeIdKey];

      if (flatDataMap.has(id)) {
          const matchingNodes = flatDataMap.get(id);
          node.children = node.children || [];
          node.children = node.children.concat(matchingNodes);
      }

      if (node.children) {
          node.children.forEach((childNode:any) => {
          insertNode(childNode);
          });
      }
    }

    // 遍历树结构并插入节点
    treeData.forEach(rootNode => {
      insertNode(rootNode);
    });

    return treeData;
}
/**
 * 
 * @param treeData 树形结构
 * @param idField 要查找的字段
 * @param idToFind 要查找的值
 */
export function treeChildFindSiblingNode(treeData:any, idField = 'id', idToFind:any) {
  const siblingNodes = [] as any;

  function findNodes(node:any, parentNode:any) {
    if (node[idField] === idToFind) {
      // 如果找到匹配节点，将同级节点数组设置为匹配节点的父节点的 children 数组
      siblingNodes.push(...(parentNode ? parentNode.children || [] : treeData));
    }

    if (node.children) {
      for (const childNode of node.children) {
        findNodes(childNode, node);
      }
    }
  }

  // 从根节点开始查找
  for (const rootNode of treeData) {
    findNodes(rootNode, null);
  }

  return siblingNodes;
}
function sortChinese(arr: Array<object>, dataLeven: string) {
  // 参数：arr 排序的数组; dataLeven 数组内的需要比较的元素属性
  function getValue(option: any) {
    if (!dataLeven) return option
    var data = option
    dataLeven.split('.').filter(function (item) {
      data = data[item]
    })
    return data + ''
  }
  arr.sort(function (item1, item2) {
    return getValue(item1).localeCompare(getValue(item2), 'zh-CN')
  })
  return arr
}
export const chineseToNumber = (valueS:string|number)=>{
    if(!valueS && valueS != 0){
        return ''
    }
    if(String(Number(valueS))!='NaN'){
        let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
		let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
		let chnUnitChar = ["", "十", "百", "千"];
		function sectionToChinese(section) {
			let strIns = '',
				chnStrTo = '';
			let unitPos = 0;
			let zero = true;
			while (section > 0) {
				let v = section % 10;
				if (v === 0) {
					if (!zero) {
						zero = true;
						chnStrTo = chnNumChar[v] + chnStrTo;
					}
				} else {
					zero = false;
					strIns = chnNumChar[v];
					strIns += chnUnitChar[unitPos];
					chnStrTo = strIns + chnStrTo;
				}
				unitPos++;
				section = parseInt(section / 10);
			}
			return chnStrTo;
		}
		let unitPos = 0;
		let strIns = '',
			chnStrThree = '';
		let needZero = false;
		if (valueS === 0) {
			return chnNumChar[0];
		}
		while (valueS > 0) {
			let section = valueS % 10000;
			if (needZero) {
				chnStrThree = chnNumChar[0] + chnStrThree;
			}
			strIns = sectionToChinese(section);
			strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
			chnStrThree = strIns + chnStrThree;
			needZero = (section < 1000) && (section > 0);
			valueS = parseInt(valueS / 10000);
			unitPos++;
		}
		return chnStrThree;
    }else{
        let chnNumChar = {
            零: 0,
            一: 1,
            二: 2,
            两: 2,
            三: 3,
            四: 4,
            五: 5,
            六: 6,
            七: 7,
            八: 8,
            九: 9
        };
        let chnNameValue = {
            十: { value: 10, secUnit: false },
            百: { value: 100, secUnit: false },
            千: { value: 1000, secUnit: false },
            万: { value: 10000, secUnit: true },
            亿: { value: 100000000, secUnit: true }
        }
        let rtn = 0;
        let section = 0;
        let number = 0;
        let secUnit = false;
        let  str = valueS.split('');

        for (let i = 0; i < str.length; i++) {
            let num = chnNumChar[str[i]];
            if (typeof num !== 'undefined') {
                number = num;
                if (i === str.length - 1) {
                    section += number;
                }
            } else {
                let unit = chnNameValue[str[i]].value;
                secUnit = chnNameValue[str[i]].secUnit;
                if (secUnit) {
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                } else {
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    }
}



/**
 * @description: watchOnce watch只触发一次
 * @param {any} source 监听对象
 * @param {Function} cb 回调函数
 * @param {WatchOptions} options watch属性
 * @return {*}
 */
export type MapSources<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never
}
export type MapOldSources<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? (Immediate extends true ? V | undefined : V) : never
}
export function watchOnce<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  source: [...T],
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions<Immediate>
): void

export function watchOnce<T, Immediate extends Readonly<boolean> = false>(
  sources: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions<Immediate>
): void

export function watchOnce<Immediate extends Readonly<boolean> = false>(source: any, cb: any, options?: WatchOptions<Immediate>): void {
  const stop = watch(
    source,
    (...args) => {
      nextTick(() => stop())
      return cb(...args)
    },
    options
  )
}




export function throttled(fn: { apply: (arg0: null, arg1: any[]) => void; }, delay = 500): any {
  let oldtime = Date.now()
  return function (...args) {
   let newtime = Date.now()
     if (newtime - oldtime >= delay) {
       fn.apply(null, args)
       oldtime = Date.now()
     }
  }
}
/**
 * @description: watchThrottled watch节流
 * @param {any} source 监听对象
 * @param {Function} cb 回调函数
 * @param {any} delay 时长
 * @param {WatchOptions} options watch属性
 * @return {*}
 */

export type MapSourcesThrottled<T> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? V : never
}
export type MapOldSourcesThrottled<T, Immediate> = {
  [K in keyof T]: T[K] extends WatchSource<infer V> ? (Immediate extends true ? V | undefined : V) : never
}
export function watchThrottled<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  source: [...T],
  cb: WatchCallback<MapSourcesThrottled<T>, MapOldSourcesThrottled<T, Immediate>>,
	delay: any,
  options?: WatchOptions<Immediate>
): void

export function watchThrottled<T, Immediate extends Readonly<boolean> = false>(
  sources: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
	delay: any,
  options?: WatchOptions<Immediate>,
): void

export function watchThrottled<Immediate extends Readonly<boolean> = false>(source: any, cb: any, delay: number | undefined,options?: WatchOptions<Immediate>,): void {
  watch(
    source,
    throttled((...args: any) => {
      return cb(...args)
    },delay),
    options
  )
}
const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const _utf8_encode = (string: string) => {
  string = string.replace(/\r\n/g, '\n')
  let utftext = ''
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

const _utf8_decode = (utftext: string) => {
  let string = ''
  let i = 0
  let c,
    c3,
    c2 = 0
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      string += String.fromCharCode(c)
      i++
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = utftext.charCodeAt(i + 1)
      c3 = utftext.charCodeAt(i + 2)
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return string
}

const _mkUriSafe = (src: string) => {
  return src.replace(/=/g, '').replace(/[+/]/g, function (m0) {
    return m0 == '+' ? '-' : '_'
  })
}
export function encode(_str: string) {
  let output = ''
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0
  _str = _utf8_encode(_str)
  while (i < _str.length) {
    chr1 = _str.charCodeAt(i++)
    chr2 = _str.charCodeAt(i++)
    chr3 = _str.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
  }
  return output
}

export function encodeURI(_src: string) {
  return _mkUriSafe(encode(_src))
}

export function decode(base64: string) {
  let output = ''
  let chr1, chr2, chr3
  let enc1, enc2, enc3, enc4
  let i = 0
  base64 = base64.replace(/[^A-Za-z0-9+/=]/g, '')
  while (i < base64.length) {
    enc1 = _keyStr.indexOf(base64.charAt(i++))
    enc2 = _keyStr.indexOf(base64.charAt(i++))
    enc3 = _keyStr.indexOf(base64.charAt(i++))
    enc4 = _keyStr.indexOf(base64.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = _utf8_decode(output)
  return output
}



/**
 * @description: 使用vue组件来配置echarts的tooltip 通过slots传递
 * @param {Object} option:Object    echarts配置对象
 * @param {Slot|VNode} slots:Slot|VNode   $slots中的slots函数
 * @return {*}option:Object
 */
export function useTooltipSlot(option: any, slots: Slot | VNode | Element) {
  const dom = document.createElement('div')

  let vnode = slots
  if (!option.tooltip) {
    option.tooltip = {}
  }
  option.tooltip.extraCssText = `width:max-content;
    height:max-content;
    border:0;
    box-shadow:none;
    background:none;
    border-radius:0;`

  // 函数情况
  if (slots instanceof Function) {
    option.tooltip.formatter = (params: any) => {
      vnode = slots({ params })?.[0]
      render(vnode as VNode, dom)
      return dom
    }
    return
  }
  // VNode情况
  if (isVNode(slots)) {
    option.tooltip.formatter = (params: any) => {
      slots.props = mergeProps(slots.props || {}, params)
      render(vnode as VNode, dom)
      return dom
    }
    return
  }
  // 判断是否是DOM对象
  const isDOM =
    typeof HTMLElement === 'object'
      ? function (obj: any) {
          return obj instanceof HTMLElement
        }
      : function (obj: any) {
          return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string'
        }
  // DOM的情况 会向DOM元素中 加入一个属性z_props来放置params
  if (isDOM(slots)) {
    option.tooltip.formatter = (params: any) => {
      dom.appendChild(slots)
      return dom
    }
    return
  }
}

/**
 * @description: 为对象加入迭代器接口 使其可以对forof和yield产生效果，这会直接修改对象
 * @param {object} obj 指定对象
 * @return {*}
 */
export function objIterator(obj: object) {
  obj[Symbol.iterator] = function () {
    const keys = Object.keys(obj)
    let index = 0
    return {
      next: () => {
        if (index < keys.length) {
          const key = keys[index++]
          return { value: { key, value: obj[key] }, done: false }
        } else {
          return { done: true }
        }
      }
    }
  }
}

/**
 * @description: 函数柯里化
 * @param {function} fn 让函数可通过多次接收参数，且数量足够后再执行
 * @return {*}
 */
export function curry(fn: (...args: any[]) => any) {
  const argLength = fn.length
  return function judgeCurry(...arg: any[]) {
    if (arg.length >= argLength) {
      return fn(...arg)
    } else {
      return function (...arg2: any[]) {
        return judgeCurry(...arg.concat(arg2))
      }
    }
  }
}
