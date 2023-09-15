<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-11 13:18:17
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard46/index.vue
-->
<script lang="ts" setup>
import { Repl } from '@vue/repl'
// import CodeMirror from '@vue/repl/codemirror-editor'
// import CodeMirror from '@vue/repl/codemirror-editor'
import Monaco from '@vue/repl/monaco-editor'
import '@vue/repl/style.css'
</script>
<template>
  <div class="shard">
    空
    <Repl  :editor="Monaco" />
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>