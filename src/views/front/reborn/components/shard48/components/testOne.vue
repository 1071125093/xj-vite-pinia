<script lang="ts" setup>
import { EllipsisProps, FormInst, InputProps, SelectProps, useThemeVars } from 'naive-ui'
import { MaybeRef } from 'vue'

// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** 通用部分 start **************/
const props = defineProps<{
  name?: string
  age?: number
}>()
const theName = useVModel(props, 'name')
// #endregion ******* 通用部分 ~end~ **************/

// #region ********** 测试区域 start **************/
const tryMe = () => {
  theName.value += '我点'
}
const theTheme = useThemeVars()
// #endregion ******* 测试区域 ~end~ **************/

// #region ********** form start **************/
const generalOptions = ref(
  ['groode', 'veli good', 'emazing', 'lidiculous'].map((v) => ({
    label: v,
    value: v
  }))
)

type TheMap = {
  A: SelectProps
  B: InputProps
  C: EllipsisProps
}

type TheColumn = {
  [T in keyof TheMap]: {
    type: T
    data: TheMap[T]
  }
}[keyof TheMap]
const fuckU: U.XjTestTypeAsd<TheMap, 'fuckU'>[] = [
  {
    type: 'A',
    fuckU: {}
  },
  {
    type: 'B',
    fuckU: {
      allowInput: true
    }
  },
  {
    type: 'C',
    fuckU: {}
  }
]
const formRef = ref<FormInst | null>(null)

const dynamicForm = reactive({
  name: '',
  selectValue: undefined,
  hobbies: [{ hobby: '' }]
})

const removeItem = (index: number) => {
  dynamicForm.hobbies.splice(index, 1)
}

const { proxy } = getCurrentInstance()
const addItem = () => {
  dynamicForm.selectValue = 'groode'
  dynamicForm.name = 'groode'
  // dynamicForm.hobbies.push({ hobby: '' })
}

const handleValidateClick = () => {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      console.log('验证通过')
    } else {
      console.log(errors)
    }
  })
}
// #endregion ******* form ~end~ **************/
</script>
<template>
  <div class="test-one">
    <n-form ref="formRef" :model="dynamicForm" :style="{ maxWidth: '640px' }">
      <n-form-item
        label="姓名"
        path="name"
        :rule="{
          required: true,
          message: '请输入姓名',
          trigger: ['change', 'blur']
        }"
      >
        <n-input v-model:value="dynamicForm.name" clearable />
      </n-form-item>

      <n-form-item
        v-for="(item, index) in dynamicForm.hobbies"
        :key="index"
        :label="`爱好${index + 1}`"
        :path="`hobbies[${index}].hobby`"
        :rule="{
          required: true,
          message: `请输入爱好${index + 1}`,
          trigger: ['change', 'blur']
        }"
      >
        <n-input v-model:value="item.hobby" clearable />
        <n-button style="margin-left: 12px" @click="removeItem(index)">删除</n-button>
      </n-form-item>
      <n-form-item
        label="Select"
        :key="dynamicForm.selectValue"
        path="selectValue"
        :rule="{
          required: true,
          message: '请输入姓名',
          trigger: ['change', 'blur']
        }"
      >
        <n-select clearable v-model:value="dynamicForm.selectValue" placeholder="Select" :options="generalOptions" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button attr-type="button" @click="handleValidateClick">验证</n-button>
          <n-button attr-type="button" @click="addItem">增加</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <span class="the-label">啥情况</span>
    <span class="the-noob">我裂开i啊我去</span>
    <n-el class="the-noob" tag="div">我是个 span 标签</n-el>
    <!-- <n-el class="the-noob" tag="div">我是个 span 标签</n-el> -->
    <n-button @click="tryMe">你动我试试</n-button>
    <n-space>
      啊
      <n-divider />
      啊
    </n-space>
    <!-- <n-alert title="可以没有边框" type="info" :bordered="false">Gee it's good to be back home</n-alert> -->
    <n-input v-model:value="theName"></n-input>
  </div>
</template>
<style lang="less" scoped>
.test-one {
  .the-label {
    color: v-bind('theTheme.primaryColor');
  }
  .the-noob {
    color: var(--primary-color);
  }
}
</style>
