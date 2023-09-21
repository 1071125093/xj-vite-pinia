/**
 * @description: 实际使用别用我，用项目自带的axios
 * 这里默认已经mounted
 */
export const getFetch = (): any => {
  // 创建一个ref来存储脚本是否已经加载
  // 这个很快，懒得用了，反正项目里已经有axios的
  return new Promise((resolve, reject) => {
    const scriptLoaded = ref(false)
    const theAxios = ref()
    // 在组件挂载后加载脚本

    // 创建一个新的script标签
    const script = document.createElement('script')

    // 设置script标签的src属性为要动态引入的JavaScript文件的URL
    script.src = 'https://unpkg.com/axios/dist/axios.min.js'

    // 将script标签添加到页面的head部分
    document.head.appendChild(script)

    // 当脚本加载完成后执行回调函数
    script.onload = () => {
      // 设置scriptLoaded为true，表示脚本已加载
      scriptLoaded.value = true
      theAxios.value = window.axios
      resolve(theAxios.value)
    }
    // 当脚本加载失败时执行回调函数
    script.onerror = (err) => {
      console.error('脚本加载失败')
      reject(err)
    }
  })
}
