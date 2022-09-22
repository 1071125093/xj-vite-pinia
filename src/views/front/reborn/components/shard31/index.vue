<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-22 17:58:28
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard31/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

// let BASE_URL = import.meta.env.VITE_NODE_URL
// axios.defaults.baseURL = '/api'
// console.log(axios.defaults.baseURL);

enum Kai {
  男 = 123,
  女 = 456,
}
const kai = {
  '0': '男',
  '1': '女',
  '2': '人妖',
}

const xjTest = async () => {
  // const asd = await axios.delete('/api/xjTestDelete')
  const asd = await axios.delete('http://127.0.0.1:8080/05/xjTestDelete')
  // const asd = await axios.get('/api/xjTest', {
  //   params: {
  //     name: 123,
  //     age: 345,
  //   },
  // })
  // const asd = await axios({
  //   method: 'get',
  //   url: '/api/xjTest',
  //   params: {
  //     name: 123,
  //     age: 345,
  //   },
  // })
}
xjTest()
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
