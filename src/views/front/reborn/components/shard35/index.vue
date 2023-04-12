<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-12-09 17:31:10
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard35/index.vue
-->
<script lang="ts" setup>
// import usePiniaOne from '@/store/piniaOne'
import { piniaOne } from '@/store'
import useApiFox from './hooks/useApiFox'
import * as API from '@/api/fsExtra'
const { useLogin } = useApiFox()

// #region ********** 登录逻辑 start **************/

const handleLogin = () => {
  useLogin()
}
// #endregion ******* 登录逻辑 ~end~ **************/

// #region ********** handleArticleCate start **************/
/** 文章类型列表 */
const articleCateList = ref<FsExtra.ArticleCateItem[]>([])

const handleArticleCate = async () => {
  const { data } = await API.getArticleCateList()
  articleCateList.value = data
}
// #endregion ******* handleArticleCate ~end~ **************/

onMounted(() => {})
</script>
<template>
  <div class="shard">
    <el-button type="primary" @click="handleLogin">登录</el-button>
    <el-button type="primary" @click="handleArticleCate">请求文章类型</el-button>
    <el-button type="primary" @click="handleLogin">登录</el-button>
    <div class="shard_container">
      <blockTitle title="文章类型列表"></blockTitle>
      <ul class="article_cate_list">
        <li v-for="item in articleCateList" :key="item.cateId" class="item">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
