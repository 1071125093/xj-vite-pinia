<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const props = defineProps<{
  modelValue: string
}>()
const emits = defineEmits<{
  'update:modelValue': [string]
}>()

const calcModelValue = computed({
  get() {
    console.log('get触发');
    
    return props.modelValue
  },
  set(newV) {
    console.log('set触发');
    emits('update:modelValue', newV)
  }
})
const innerClick = () => {
  calcModelValue.value = ''
}
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div class="asdasd">
    <span>我是里面的{{ modelValue }}</span>
    <n-button @click="innerClick">点我清空里面</n-button>
  </div>
</template>
<style lang="less" scoped>
.asdasd {
}
</style>
