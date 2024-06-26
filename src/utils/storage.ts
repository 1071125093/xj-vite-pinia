/**
 * @description: 存储数据
 * @param {string} key
 * @param {object} value
 * @return {*}
 */
export const setItem = (key: string, value: object | string | number) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  if (typeof value === 'number') {
    value = value.toString()
  }
  localStorage.setItem(key, value)
}

/**
 * @description: 获取数据
 * @param {string} key
 * @return {*}
 */
export const getItem = (key: string) => {
  const data: string | null = localStorage.getItem(key)
  if (data !== null && isJSON(data)) {
    return JSON.parse(data)
  } else {
    return data
  }
}

/**
 * @description: 删除指定数据
 * @param {string} key
 * @return {*}
 */
export const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

/**
 * @description: 清空缓存
 * @param {*}
 * @return {*}
 */
export const removeAllItem = () => {
  localStorage.clear()
}

/**
 * @description: 判断是否为json
 * @param {string} str
 * @return {*}
 */
function isJSON(str: string): boolean {
  try {
    const obj = JSON.parse(str)
    return !!(typeof obj == 'object' && obj)
  } catch (e) {
    return false
  }
}
