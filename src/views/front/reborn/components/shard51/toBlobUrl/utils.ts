/**
 * 此处为mock型接口
 *  获取文件流，这部分根据项目实际情况进行改动
 */
import { getFetch } from './fetch'
async function getFileResposne() {
  const theAxios = await getFetch()
  // 构建POST请求的数据
  const postData = {
    industryInfoLevelThree: '[]',
    parkInfoParkName: '[]',
    keyword: '91310120069385017L',
    page: 1,
    pageSize: 1000
  }
  // 发起 Axios POST 请求获取后端返回的数据流
  const response = await theAxios.post('https://mtyh-company-api.aihuoshi.net/lget/company/info/mt/company/download', postData, {
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
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.setAttribute('download', `${name}`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
