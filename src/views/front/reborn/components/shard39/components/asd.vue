<!--
 * @Author: XiaoJun
 * @Date: 2023-01-31 17:35:52
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-01-31 17:39:37
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard39/components/asd.vue
-->
<template>
  <div>
    我来试试传值问题：{{ testValue }}
    <div @click="addMe">点我加1</div>
  </div>
</template>
<script>
export default {
  props: {
    testValue: {
      type: Number,
    },
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    addMe() {
      console.log(this.testValue)
      this.$emit('update:testValue', this.testValue + 1)
    },
  },
}
</script>
<style lang="less" scoped></style>
