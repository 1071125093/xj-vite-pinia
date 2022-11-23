<!--
 * @Author: XiaoJun
 * @Date: 2022-10-28 09:35:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-14 17:02:53
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard32/components/test.vue
-->
<script setup>
// #region ********** 库&组件等引入 start **************/
import { inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const router = useRouter()

// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
const asd = inject('asd')
onMounted(() => {
  asd.value = 123123123
})
const xjTest = () => {
  router.push({
    query: {
      paramsStr: `{name:123}`,
    },
  })
}
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="default_class">
    {{ asd }}我是asd
    <el-button type="primary" @click="xjTest">点我 </el-button>
  </div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
