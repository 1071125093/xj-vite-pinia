<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 20:16:12
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-08 13:48:53
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard15/testComponent/index.vue
-->
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const state = reactive({})
    return {
      ...toRefs(state),
    }
  },
})
</script>
<template>
  <div class="default_class">填充内容</div>
</template>
<style lang="less" scoped>
.default_class {
}
</style>
