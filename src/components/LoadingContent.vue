<!--
 * @Author: suzb@hsmap.com
 * @Date: 2022-04-11 15:38:28
 * @LastEditTime: 2022-04-11 20:04:16
 * Copyright (c) 2022 by nick/火石创造, All Rights Reserved. 
-->
<script setup lang="ts">
import { useLoadingBar } from 'naive-ui'
//挂载在 window 在ts中直接使用
window.$loading = useLoadingBar()
</script>
<template>
  <slot></slot>
</template>
