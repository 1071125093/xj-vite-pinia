<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-21 18:17:36
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard37/index.vue
-->
<script lang="ts" setup>
import { useHttp } from '@/service/httpService'
import { ref } from 'vue'
const myFileIds = ref('')

const { post } = useHttp()

const downloadFileTest = () => {
  post('/fsExtra/downloadFile')
}
</script>
<template>
  <div class="shard">
    <blockTitle title="文件上传"></blockTitle>
    <myUploader :fileIds="myFileIds"></myUploader>
    <el-button type="primary" @click="downloadFileTest">点我下载试试</el-button>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
