<!--
 * @Author: XiaoJun
 * @Date: 2023-02-15 13:42:17
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-08 19:18:02
 * @Description: 弹窗
 * @FilePath: /xj-vite-pinia/src/components/baseDialog/index.vue
-->

<script lang="ts" setup>
// #region ********** 引入 start **************/

import { useFsDialog } from '@/service/fsDialog'
import { useThemeVars } from 'naive-ui'
import { useTheme } from 'naive-ui/es/_mixins'

// #endregion ******* 引入 ~end~ **************/

// #region ********** define区域 start **************/
const { visible, confirmDialog, cancelDialog } = useFsDialog()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    showAction?: boolean
    title?: string
    onConfirm?: () => void
    onBeforeCancel?: () => void
  }>(),
  {
    // width: '800px',
    height: '500px',
    showAction: false,
    title: '弹窗'
    // onConfirm: function (fn: any) {
    //   console.log(123)
    // },
    // onBeforeCancel: function (fn: any) {
    //   console.log(123)
    // }
  }
)

// const props = defineProps({
//   width: {
//     type: String,
//     default: '920px'
//   },
//   height: {
//     type: String,
//     default: '680px'
//   },
//   showAction: {
//     type: Boolean,
//     default: true
//   },
//   easyMode: {
//     // 在找到defineEmits的解决方法之前，先临时处理一下啊
//     type: Boolean,
//     default: true
//   },
//   onConfirm: {
//     type: Function,
//     default: () => {
//       confirmDialog()
//     }
//   }
// })

// const emit = defineEmits<{
//   (event: 'confirm', data: any): void
//   (event: 'beforeCancel', data: any): void
// }>()
// #endregion ******* define区域 ~end~ **************/

// #region ********** 公用模块 start **************/
const attrs = useAttrs()
// #endregion ******* 公用模块 ~end~ **************/

// #region ********** 处理弹窗交互 start **************/
/** 处理confirm逻辑 */
const handleConfirm = () => {
  if (props.onConfirm) {
    props.onConfirm()
  } else {
    confirmDialog()
  }
}
/** 处理cancel逻辑 */
const handleCancel = async () => {
  if (props.onBeforeCancel) {
    props.onBeforeCancel()
  } else {
    cancelDialog()
  }
  // emit('beforeCancel', cancelDialog)
}

/** 确认按钮的loading */
const confirmLoading = ref(false)
const theTheme = useThemeVars()
// #endregion ******* 处理弹窗交互 ~end~ **************/
</script>
<template>
  <!-- <fsConfigProvider> -->
  <n-modal
    v-bind="attrs"
    v-model:show="visible"
    preset="dialog"
    class="fs-dialog"
    to="body"
    style="width: 1200px; height: 700px"
    :closable="false"
    :show-icon="false"
    @close="handleCancel"
  >
    <template #header>
      <div class="base-dialog-title">
        <slot name="header">
          <div class="modal-content-title">
            <n-ellipsis>{{ title }}</n-ellipsis>
          </div>
          <div class="modal-content-close" @click="handleCancel">×</div>
        </slot>
      </div>
    </template>
    <template #default>
      <div
        class="base-dialog-main"
        :style="{
          height: height
        }"
      >
        <slot name="default"></slot>
      </div>
      <!-- <slot name="default"></slot> -->
    </template>
    <template v-if="showAction" #action>
      <n-space>
        <slot name="action" v-bind="{ confirmDialog, cancelDialog, confirmLoading }">
          <n-button @click="handleCancel">取消</n-button>
          <n-button type="primary" :loading="confirmLoading" @click="handleConfirm">确认</n-button>
        </slot>
      </n-space>
    </template>
  </n-modal>
  <!-- </fsConfigProvider> -->
</template>
<style lang="less">
.fs-dialog-test {
  position: absolute;
  display: inline-block;
  border: solid 16px transparent; /*隐藏边框颜色 控制三角形的长边边长*/
  content: '';
  top: 8px;
}
.n-modal-mask {
  background-color: rgba(0, 0, 0, 0.4);
}

.fs-dialog {
  display: flex;
  flex-direction: column;
  background: linear-gradient(360deg, #004470 0%, #003061 100%);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  // background: url('@/assets/images/home/数字经济发展趋势.png') no-repeat;
  // background-size: 100% 100%;
  // background-clip: padding-box;
  .n-dialog__title {
    justify-content: center;
  }
  .base-dialog-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    // width: 80%;
    max-width: 80%;
  }
  .n-modal-mask {
    // background-color: rgba(0, 0, 0, 0.4);
  }
  // .n-base-icon {
  //   color: #95bae3;
  //   // font-size: 24px;
  // }

  .n-dialog__content {
    padding: 0 24px;
    overflow-y: auto;
  }
  .modal-content-title {
    // max-width: 70%;
    // width: 80%;
    width: 100%;
    background: #005aff;
    padding: 8px 20px;
    display: inline-block;
    position: relative;
    color: #fff;
    font-size: 22px;
    border-radius: 2px;
    &::before {
      .fs-dialog-test;
      border-left-color: #4da3ff;
      left: -30px;
    }
    &::after {
      .fs-dialog-test;
      border-right-color: #4da3ff;
      right: -30px;
    }
  }
  .modal-content-close {
    width: 40px;
    height: 40px;
    // background-image: url('@/assets/images/home/bg.png');
    // background-size: 100% 100%;
    cursor: pointer;
    position: absolute;
    // bottom: -54px;
    top: 54px;
    right: 52px;
    // margin: 0 auto;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #fff;
    border-radius: 50%;
    padding-bottom: 2px;
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
.base-dialog-main {
  // height: v-bind(asdHeight);
}
</style>
