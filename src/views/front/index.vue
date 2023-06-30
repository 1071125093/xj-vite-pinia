<!--
 * @Author: HuangXiaojun
 * @Date: 2022-04-28 17:56:56
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-07 19:53:06
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/index.vue
-->
<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  components: {},
  props: {},
  setup() {
    interface testGener {
      name: string
      age: string | number
    }
    const state = reactive({})
    type Asd = {
      name: string
      age: number
    }
    type asd = keyof Asd
    return {
      ...toRefs(state)
    }
  }
})
</script>
<template>
  <div class="default_class">
    <!-- <router-link :to="{ name: 'reborn' }">java设计模式</router-link> -->
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped></style>
