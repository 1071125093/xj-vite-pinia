<template>
  <div>
    <!-- 此处显示组件内容 -->
    <div class="btn" @click="tryMeSeeSee">你动我试试</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Axios } from 'axios'
// 创建一个ref来存储脚本是否已经加载
const scriptLoaded = ref(false)
const theAxios = ref<Axios>()
// 在组件挂载后加载脚本
onMounted(() => {
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
  }

  // 当脚本加载失败时执行回调函数
  script.onerror = () => {
    console.error('脚本加载失败')
  }
})
const tryMeSeeSee = async() => {
  const res = await getTemporaryLink(123)
  console.log(res)
}

// 定义一个异步函数，用于从后端获取数据流并生成临时链接
async function getTemporaryLink(id: number): Promise<string | null> {
  try {
    // 构建POST请求的数据
    const postData = {
      industryInfoLevelThree: '[]',
      parkInfoParkName: '[]',
      keyword: '91310120069385017L',
      page: 1,
      pageSize: 1000
    }

    // 发起 Axios POST 请求获取后端返回的数据流
    const response = await theAxios.value!.post('https://mtyh-company-api.aihuoshi.net/lget/company/info/mt/company/download', postData, {
      responseType: 'blob' // 指定响应类型为二进制数据流
    })

    // 创建一个 Blob 对象来保存数据
    const blob = new Blob([response.data], { type: response.headers['content-type'] })
    // 文件名
    let disposition = response.headers['content-disposition'].split('=')
    let filename = disposition ? disposition[1] : '文件'

    exportExcelFile(response.data, filename)
  } catch (error) {
    console.error('获取数据流失败', error)
    return null
  }
}

// 导出
function exportExcelFile(data: any, name: string) {
  let url: any = window.URL.createObjectURL(new Blob([data]))
  let a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', `${name}`)
  document.body.appendChild(a)
  a.click()
  url = window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
  window.URL.revokeObjectURL(new Blob([data]))
}
</script>
