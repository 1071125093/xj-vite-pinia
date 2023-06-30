<script lang="ts" setup>
// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/
withDefaults(
  defineProps<{
    modelValue?: string | number
    tabs?: any[]
  }>(),
  {
    modelValue: '全省',
    tabs: () => {
      return [
        { label: '全省', value: null },
        { label: '杭州市', value: '杭州市' },
        { label: '宁波市', value: '宁波市' },
        { label: '温州市', value: '温州市' },
        { label: '嘉兴市', value: '嘉兴市' },
        { label: '湖州市', value: '湖州市' },
        { label: '绍兴市', value: '绍兴市' },
        { label: '金华市', value: '金华市' },
        { label: '衢州市', value: '衢州市' },
        { label: '舟山市', value: '舟山市' },
        { label: '台州市', value: '台州市' },
        { label: '丽水市', value: '丽水市' }
      ]
    }
  }
)
const emits = defineEmits<{
  'update:modelValue': [string | number | null]
}>()
// #endregion ******* define区域 ~end~ **************/

// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 底部省份相关 start **************/

/** 当前选中省份 */
const activeCityValue = ref<string | null>('温州市')
/** 处理-选中-城市 */
const handleSelectCity = (val: string | null) => {
  activeCityValue.value = val
  emits('update:modelValue', val)
}
// #endregion ******* 底部省份相关 ~end~ **************/

// #region ********** 测试区域 start **************/
// #endregion ******* 测试区域 ~end~ **************/
</script>
<template>
  <div>我是里面{{ activeCityValue }}</div>
  <div class="tab-list">
    <div
      class="fs-tag pointer"
      v-for="item in tabs"
      :key="item.label"
      :class="{
        active: activeCityValue === item.value
      }"
      @click="handleSelectCity(item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
<style lang="less" scoped>
.tab-list {
  display: flex;
  align-items: center;
  .fs-tag {
    &:not(:last-of-type) {
      margin-right: 18px;
    }
    width: 125px;
    height: 40px;
    &.active {
      color: #fff;
      background: #87ceeb;
    }
  }
}
</style>
