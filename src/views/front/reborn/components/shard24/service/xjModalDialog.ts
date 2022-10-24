/*
 * @Author: XiaoJun
 * @Date: 2022-10-19 09:55:29
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-19 11:24:29
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard24/service/xjModalDialog.ts
 */
// import { createApp } from '@vue/composition-api';
import { createVNode, render } from 'vue'
import Vue from 'vue'
import xjTestDialog from '../components/xjTestDialog.vue'
let mountNode: HTMLElement

export const useModalDialog = () => {
  const startInit = () => {
    const app = createVNode(xjTestDialog, {
      address: '我要裂开了',
    })
    mountNode = document.createElement('div')
    mountNode.className = 'xj_test'
    render(app, mountNode)
    document.body.appendChild(mountNode)
    //render函数的作用就是将Notice组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
  }
  const remove = () => {
    mountNode.remove()
  }
  return {
    remove,
    startInit,
  }
}
