/*
 * @Author: XiaoJun
 * @Date: 2022-12-07 19:52:05
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-21 15:35:07
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/service/httpService.ts
 */
import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios'
import qs from 'qs'
import { piniaSystem } from '@/store/index'
import { Notify } from 'vant'
const tasksQueue = new Map()
const apiRoot = '/xjApi'
// const apiRoot = '/xjApi'
const appendixRoot = '/zjSentimentAppendix' // 附件目录根路径
const previewRoot = '/preview' // 预览服务根路径
const CancelToken = axios.CancelToken

axios.interceptors.request.use(
  (config: any) => {
    // 请求头携带sessionStorage里面的token
    config.headers.Authorization = piniaSystem.token
    return config
  },
  function (err) {
    // 对请求错误做些什么
  }
)
function post(
  url: string,
  params?: unknown,
  forbidden = false,
  applicationJson = false,
  timeout = 30000
) {
  url = `${apiRoot}${url}`
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      data: params,
      timeout: timeout,
      headers: {
        'Content-Type': applicationJson ? 'application/json' : 'application/x-www-form-urlencoded',
      },
      transformRequest: [
        function (data) {
          data = applicationJson ? JSON.stringify(params) : qs.stringify(data)
          return data
        },
      ],
    }).then(
      (response) => {
        handleResponse(response, resolve, reject, forbidden)
      },
      (err) => {
        if (typeof err === 'object' && err.message.type === 'cancel') {
          console.log(`${err.message.msg},${url}请求已取消`)
        } else {
          Notify('连接失败，请检查网络.')
          // $msg({
          //   type: "toast",
          //   content: "连接失败，请检查网络",
          //   time: 1500
          // });
        }
        reject(err)
      }
    )
  })
}

function get(
  url: string,
  params: {
    [x: string]: unknown
  },
  forbidden = false
) {
  url = `${apiRoot}${url}`
  // let self = this;
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      params: requestParamsTransform(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then(
      (response) => {
        handleResponse(response, resolve, reject, forbidden)
        // handleResponse.call(self, response, resolve, reject, forbidden);
      },
      (err) => {
        if (typeof err === 'object' && err.message.type === 'cancel') {
          console.log(`${err.message.msg},${url}请求已取消`)
        } else {
          if (err.response.status === 404) {
            Notify('请检查接口地址是否正确，或者接口是否存在.')
          } else {
            Notify('连接失败，请检查网络.')
          }
          // $msg({
          //   type: "toast",
          //   content: "连接失败，请检查网络",
          //   time: 1500
          // });
        }
        reject(err)
      }
    )
  })
}

/**
 * [cancelRequest description] 组件销毁时取消请求
 * @return {[type]} [description]
 */
function cancelRequest(url: string) {
  const source = CancelToken.source()
  /**
   * [doCancel description] 执行取消
   * @return {[type]} [description]
   */
  function doCancel() {
    source.cancel({
      type: 'cancel',
      msg: '组件销毁，取消请求',
    } as any)
  }
  const tasks = tasksQueue.get(url) || []
  tasks.push(doCancel)
  tasksQueue.set(url, tasks)
  return source.token
}

/**
 * @description: 下载文件
 * @param {*} url 下载地址
 * @param {*} params 下载参数
 * @param {*} withoutToken 是否需要token
 * @param {*} title 文件标题
 * @return {*}
 */
function downloadFile(
  url: string,
  params: {
    [x: string]: unknown
  },
  type: Method = 'get',
  applicationJson = false
) {
  return new Promise<void>((resolve) => {
    url = `${apiRoot}${url}`
    const options: AxiosRequestConfig = {
      method: type,
      url: url,
      headers: {
        'Content-Type': applicationJson ? 'application/json' : 'application/x-www-form-urlencoded',
      },
      responseType: 'blob',
    }
    if (type === 'get') {
      options.params = requestParamsTransform(params)
    } else {
      options.data = params
      options.transformRequest = [
        function (data) {
          data = applicationJson ? JSON.stringify(params) : qs.stringify(data)
          return data
        },
      ]
    }
    axios(options)
      .then((response) => {
        if (!response) {
          return
        }
        const { data, headers } = response
        if (data.type && data.type == 'application/json') {
          //转换接口如果没有文件可以下载，将后端抛出的异常，转成string，将其抛出
          // if (data.code && data.code === 500) {
          const reader = new FileReader()
          let content: {
              errorMsg: string
            },
            message: string
          reader.onload = function () {
            try {
              content = JSON.parse(reader.result as string) //内容就在这里
              message = content.errorMsg
            } catch (error) {
              message = '当前任务无数据可下载'
            }
            Notify(message)
          }
          reader.readAsText(data)
          return
        }
        let filename
        try {
          filename = headers['content-disposition'].split(';')[1].split('filename=')[1]
          filename = decodeURIComponent(filename)
        } catch (error) {
          filename = headers['content-disposition'].split(';')[1].split('filename=')[1]
        }
        const linkUrl = window.URL.createObjectURL(
          new Blob([response.data])
          // new Blob([data], { type: 'application/vnd.ms-excel' })
        )
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = linkUrl
        link.setAttribute('download', filename)
        // if (!fileType) link.setAttribute('download', `${title}`);
        // else link.setAttribute('download', `${title}.${fileType}`);
        document.body.appendChild(link)
        link.click()
        resolve()
      })
      .catch((error) => {
        console.log(error)
      })
  })
}

/**
 * [requestParamsTransform 请求参数处理函数]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function requestParamsTransform(params: { [x: string]: unknown }) {
  const _params: {
    [x: string]: unknown
  } = {}
  for (const key in params) {
    const value = params[key]
    if (value !== '') {
      _params[key] = value
    }
  }
  return _params
}
/**
 * [handleResponse description]
 * @return {[type]} [description]
 */
async function handleResponse(
  response: AxiosResponse,
  resolve: any,
  reject: any,
  forbidden?: boolean
): Promise<void> {
  if (response.data.status == 'nologin') {
    window.location.replace(
      `${process.env.BASE_URL}login?beforeAddress=${window.encodeURIComponent(
        window.location.href
      )}`
    )
    reject(response.data)
  } else if (response.data.code === undefined) {
    //在返回值没有code的情况下直接resolve
    resolve(response.data)
  } else if (response.data.code != 200) {
    //错误或者警告信息
    reject(response.data)
    if (!forbidden) {
      Notify(response.data.message)
    }
  } else {
    resolve(response.data)
  }
}

/**
 * [uploadFile 自定义上传方法]
 *
 * @param   {string}  url     [url 需要前缀]
 * @param   {File}    file    [file description]
 * @param   {string}  params  [params description]
 *
 * @return  {[]}              [return description]
 */
const uploadFile = (url: string, file: File, params: { [x: string]: string }) => {
  return new Promise((resolve, reject) => {
    const form = new FormData()
    // 文件对象
    form.append('file', file)
    for (const key in params) {
      form.append(key, params[key])
    }
    axios({
      method: 'post',
      url: '/zjSentimentGuide/' + url,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: form,
      // cancelToken: cancelRequest(url),
    }).then(
      (response) => {
        handleResponse.call(self, response, resolve, reject)
      },
      (err) => {
        if (typeof err === 'object' && err.message.type === 'cancel') {
          console.log(`${err.message.msg},${url}请求已取消`)
        } else {
          Notify('连接失败，请检查网络.')
          // $msg({
          //   type: "toast",
          //   content: "连接失败，请检查网络",
          //   time: 1500
          // });
        }
        reject(err)
      }
    )
  })
}

// export { get, post, tokenValidTime };
export function useHttp(): any {
  return {
    get,
    post,
    cancelRequest,
    downloadFile,
    apiRoot,
    appendixRoot,
    previewRoot,
    uploadFile,
  }
}
