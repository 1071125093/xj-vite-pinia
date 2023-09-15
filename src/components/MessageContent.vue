<!--
 * @Author: suzb@hsmap.com
 * @Date: 2022-04-11 13:14:32
 * @LastEditTime: 2022-04-11 15:34:45
 * Copyright (c) 2022 by nick/火石创造, All Rights Reserved. 
-->
<script setup lang="ts">
import { useMessage, MessageReactive, MessageOptions } from 'naive-ui'
import AsyncQueue from '@/utils/asyncQueue'
import { TMessageType } from '@/types/message'

/**
 * @description: window.$message(TMessageType, 显示内容, MessageOptions)
 * @param {*}
 * @return {*}
 */

// 挂载在 window 在ts中直接使用
const message = useMessage()
let msgReactive: MessageReactive | null = null
const removeMessage = () => {
  if (msgReactive) {
    msgReactive.destroy()
    msgReactive = null
  }
}
let timer: number | null = null
const notifyQueue = new AsyncQueue()
window.$message = (type: TMessageType = 'info', content: string, options: MessageOptions = {}) => {
  const duration = options.duration || 3000
  notifyQueue
    .push(
      () => {
        if (msgReactive) {
          msgReactive.type = type
          msgReactive.content = content
        } else {
          options.duration = 0
          msgReactive = message[type](content, options)
        }
      },
      duration,
      true
    )
    .finally(() => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        removeMessage()
        timer = null
      }, duration)
      return msgReactive
    })
}
</script>
<template>
  <slot></slot>
</template>
