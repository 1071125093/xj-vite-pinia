import { NButton } from 'naive-ui'
import { App } from 'vue'
import { createVNode, render, h, VNodeTypes } from 'vue'
import fsConfigProvider from '@/components/fsConfigProvider/index.vue'
/*
 * @Author: XiaoJun
 * @Date: 2023-01-30 14:20:30
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-03-06 16:07:15
 * @Description: 火石-Naive-ui弹窗组件-函数式调用
 * @FilePath: /industrial-radar/src/service/fsDialog/index.ts
 */
/** 睡眠 */
export const fsSleep = (sleeptime = 1, unit = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('完成sleep')
    }, sleeptime * unit)
  })
}
/**
 * @param {any} theComponent 被导入的组件
 * 1.可以以import的函数形式引入
 * 2.可以使用被import后的组件
 * @return {*}
 */
export const loadComponent = (theComponent: any) => {
  return new Promise<VNodeTypes>((resolve) => {
    if (typeof theComponent === 'function') {
      // 如注释1描述
      theComponent().then((resp: any) => {
        resolve(resp.default)
      })
    } else {
      // 如注释2描述
      return resolve(theComponent)
    }
  })
}
let mountNode: HTMLElement

// #region ********** dialog全局变量存储 start **************/
/** 单个弹窗Item实例 */
interface DialogItem {
  resolve: any
  reject: any
  mountNode: HTMLElement
}

const dialogMap: Map<any, DialogItem> = new Map()
// #endregion ******* dialog全局变量存储 ~end~ **************/

// #region ********** 我的天哪 start **************/
let myApp: App

export const installDialog = {
  install(app: App) {
    myApp = app
  }
}
// #endregion ******* 我的天哪 ~end~ **************/

/** 开启弹窗 */
export const showDialog = (theComponent: any, prop: any = {}) => {
  return new Promise((resolve, reject) => {
    loadComponent(theComponent).then((theComponent) => {
      /** 生成弹窗的VNode */
      // const dialogApp = createVNode(theComponent, {
      //   // ...myApp,
      //   ...prop
      // })
      const dialogApp = h(theComponent, {
        ...prop
      })
      // const dialogApp = h(theNoob, {}, [
      //   h(theComponent, {
      //     ...prop
      //   })
      // ])
      // dialogApp.appContext = myApp._context
      // myApp._context.app._instance!.provides = myApp._instance!.provides

      mountNode = document.createElement('div')
      mountNode.className = `fs_dialog_container${Math.random()}`
      /** 渲染render到临时mountNode上 */
      // render(dialogApp, document.body)
      render(dialogApp, mountNode)
      /** 挂载到body上 */
      const theTarget = document.querySelector('#xjTestId')
      theTarget.appendChild(mountNode)
      // document.body.appendChild(mountNode)
      nextTick(() => {
        dialogApp.appContext = myApp._context
      })

      console.log(myApp, dialogApp)

      /** 把所有的dialog信息以uid为主键存储到map中 */
      const uid = dialogApp.component?.uid
      dialogMap.set(uid, {
        resolve,
        reject,
        mountNode
      })
    })
  }).catch((err) => {
    const moreMessage = err ? JSON.stringify(err) : ''
    throw new Error(`弹窗已取消，后续执行中止${moreMessage}`)
  })
}

/** 弹窗开启后需要的公共方法 */
export const useFsDialog = () => {
  /** 弹窗visible控制 */
  const visible = ref(false)
  setTimeout(() => {
    visible.value = true
  })
  // const visible = ref(true)
  let dialogItem: DialogItem
  const { proxy }: any = getCurrentInstance()
  /** 取消弹窗 */
  const cancelDialog = async (data: any = null) => {
    giftCurrentItem()
    dialogItem.reject(data)
    preClose()
  }
  /** 弹窗的确认操作 */
  const confirmDialog = async (data: any = null) => {
    giftCurrentItem()
    dialogItem.resolve(data)
    preClose()
  }
  /** 弹窗关闭的前置操作--用户确认和取消 */
  const preClose = async () => {
    /** 删除并隐藏 */
    dialogMap.delete(proxy._.uid)
    visible.value = false
    await fsSleep()
    dialogItem.mountNode.remove()
  }
  /** 找到当前dialogItem */
  const giftCurrentItem = () => {
    /** 这里一定能获取到，耶稣也救不了他，我说的 */
    const theId = proxy._.parent?.uid || proxy._.uid

    dialogItem = dialogMap.get(theId) as DialogItem
  }
  return {
    visible,
    cancelDialog,
    confirmDialog
  }
}
