<template>
  <div>
    <div>{{ bobo.age }}</div>
    <div>{{ age }}</div>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      bobo: {
        age: 13,
      },
      age: 14,
    }
  },
  mounted() {
    this.age = 16
  },
  methods: {},
}
</script>
<style lang="less" scoped></style>
