<!--
 * @Author: XiaoJun
 * @Date: 2022-09-28 11:56:23
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-01-18 14:10:14
 * @Description: myUploader ~ element-ui版本
 后续如有导入等需求，请及时callme
 * @FilePath: /xj-vite-pinia/src/components/myUploader/myUploader.vue
-->

<script setup>
//#region ********** 库&组件等引入 start **************/
import { ref, getCurrentInstance, computed, watch, reactive, nextTick } from 'vue'
import { useHttp } from '@/service/httpService'
import { ElMessage } from 'element-plus'
import { piniaSystem } from '@/store'
//#endregion ******* 库&组件等引入 ~end~ **************/

//#region ********** 通用部分 start **************/
const { post } = useHttp()
const emit = defineEmits(['update:fileIds', 'upload', 'update:loading'])
const props = defineProps({
  acceptStr: {
    //文件格式限制
    type: String,
    default: 'jpg,jpeg,png,pdf',
  },
  maxFileNum: {
    // 文件数量限制
    type: Number,
    default: 10,
  },
  maxFileSize: {
    // 文件大小限制
    type: Number,
    default: 10,
  },
  btnType: {
    // 按钮Btn种类 目前支持 big mini
    type: String, //
    default: 'mini',
  },
  showTips: {
    // 是否展示tips 目前只影响 mini型
    type: Boolean,
    default: true,
  },
  fileIds: {
    // 附件ids
    type: [String, Number],
    default: '',
  },
  disabled: {
    // 禁用模式 （禁用上传，删除）
    // 效果等于canUpload,canDelete为false
    type: Boolean,
    default: false,
  },
  canUpload: {
    // 可上传
    type: Boolean,
    default: true,
  },
  canDelete: {
    // 可删除
    type: Boolean,
    default: true,
  },
  canPreview: {
    // 可预览
    type: Boolean,
    default: true,
  },
  canDownload: {
    // 可下载
    type: Boolean,
    default: true,
  },
  action: {
    // 接口action
    type: String,
    default: () => {
      return `${import.meta.env.VITE_NODE_URL}/fsExtra/uploadFile`
    },
  },
  title: {
    // 按钮展示文字 目前只影响mini型
    type: String,
    default: '点击上传',
  },
  preIconClass: {
    type: String,
    default: 'el-icon-upload',
  },
  canPaste: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const calcLoading = computed({
  get() {
    return props.loading
  },
  set(newV) {
    emit('update:loading', newV)
  },
})
//#endregion ******* 通用部分 ~end~ **************/

//#region ********** 附件格式&正则相关 start **************/
/** 文件extension正则*/
const fileExtReg = /\.(\w+)$/

/**匹配出附件的extension（文件格式）
 * @param {*} fileName
 * @return {*}
 */
const getExtension = (fileName) => {
  console.log(fileName)
  return fileName?.match(fileExtReg)[1]
}

/** 用户upload组件的accept计算属性*/
const calcAcceptStr = computed(() => {
  return props.acceptStr
    .split(',')
    .map((item) => `.${item}`)
    .join()
})
//#endregion ******* 附件格式&正则相关 ~end~ **************/

//#region ********** El-Image组件相关 start **************/
/** El-Image实例*/
const imageDom = ref(null)

/** El-Image-preview当前index*/
const currentImageIndex = ref(0)

/** El-Image-preview可预览的附件类型*/
const acceptPreviewImg = ['jpg', 'jpeg', 'jpe', 'png', 'gif', 'tif', 'bmp']

/** El-Image可预览的附件列表*/
const calcPictures = computed(() => {
  try {
    return innerFiles.value
      .filter((o) => acceptPreviewImg.includes(getExtension(o.fileName)))
      .map((item) => item.url)
  } catch (e) {
    console.log(e)
    return []
  }
})

/** 弹窗总控制 */
const dialog = reactive({
  visible: false,
  loading: false,
})

/** 可预览的pdf文件 */
const acceptPreviewPdf = ['pdf']

// pdf预览相关
const previewPdfOption = reactive({
  pages: null,
  src: null,
  loading: null,
})

/** pdf预览操作 */
const previewPDF = async (url) => {
  const loadingTask = pdf.createLoadingTask(url)
  const { numPages } = await loadingTask.promise
  previewPdfOption.pages = numPages
  previewPdfOption.src = url
}

/** 可预览的其他类型文件 */
const acceptPreviewOthers = ['doc', 'docx', 'xls', 'xlxs']

/** 其他文件预览配置 */
const othersFileOption = reactive({
  src: null,
})

/** iframeDom实例 */
const iframeDom = ref()

/** 可以预览的文件类型 */
const acceptPreviewAll = computed(() => {
  return [...acceptPreviewImg, ...acceptPreviewPdf, ...acceptPreviewOthers]
})

/**附件预览，目前仅支持图片
 * @return {*}
 */
const previewFile = async (file) => {
  const fileExt = getExtension(file.fileName)
  dialog.loading = true
  if (acceptPreviewPdf.includes(fileExt)) {
    dialog.visible = true
    // pdf预览操作
    await previewPDF(file.url)
    dialog.loading = false
  } else if (acceptPreviewImg.includes(fileExt)) {
    // 图片预览
    currentImageIndex.value = innerFiles.value
      .filter((o) => acceptPreviewImg.includes(getExtension(o.fileName)))
      .findIndex((item) => item.fileId === file.fileId)
    imageDom.value.showViewer = true
    dialog.loading = false
  } else {
    // 其他情况
    dialog.visible = true
    othersFileOption.src = file.url
    // othersFileOption.src = window.encodeURIComponent(encode(file.url));
    nextTick(() => {
      iframeDom.value.onload = function () {
        dialog.loading = false
      }
      iframeDom.value.onerror = function () {
        dialog.loading = false
      }
    })
  }
}

/** 可预览的其他文件类型 */

//#endregion ******* El-Image组件相关 ~end~ **************/

//#region ********** 测试区域 start **************/
//#endregion ******* 测试区域 ~end~ **************/

const uploadRef = ref(null)
// 内部课上传数组
const innerFiles = ref([])
// const { downloadFile, get } = useHttp();
const stopWatch = watch(
  () => props.fileIds,
  async (fileIds) => {
    if (!fileIds) {
      return
    }
    const { data } = await post(`/usercenter/project/getFile/${fileIds}`)
    innerFiles.value = data.map((item) => {
      item.displayName = formatName(item.fileName, item.fileSize)
      item.url = item.fileUrl
      item.fileId = item.id
      return item
    })
    stopWatch()
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  () => innerFiles.value,
  (fileList) => {
    emit('update:fileIds', fileList.map((item) => item.fileId).join())
    // 优化返回，获取fileIds值用于校验必填
    emit('upload', { fileIds: fileList.map((item) => item.fileId).join() })
  }
)
/**上传前
 * @param {*} file
 * @return {*}
 */
const beforeUpload = async (file) => {
  return new Promise((resolve, reject) => {
    const extension = getExtension(file.name)
    const acceptArr = props.acceptStr.split(',')
    if (!acceptArr.includes(extension)) {
      ElMessage({
        type: 'error',
        message: `上传失败，仅支持${props.acceptStr}格式`,
      })
      reject()
    }
    // 文件大小限制 100MB
    if (file.size / 1024 / 1024 > props.maxFileSize) {
      ElMessage({
        type: 'warning',
        message: `文件大小不能超过${props.maxFileSize}MB!`,
      })
      reject()
    }
    if (!file.size) {
      ElMessage({
        type: 'error',
        message: '文件大小不能为空',
      })
      // uploadRef.value.clearFiles();
      reject()
    }
    const list = file.name.split('.')
    let fileName = ''
    const tail = '.' + list.pop()
    fileName = file.name.slice(0, file.name.length - tail.length)
    // 文件名称长度限制
    if (fileName > 30) {
      ElMessage({
        type: 'warning',
        message: `文件名称长度需限制在30及以内，请修改文件名称后再上传！`,
      })
      reject()
    }
    calcLoading.value = true
    resolve()
  })
}
/**上传成功时
 * @param {*} size
 * @param {*} unit
 * @return {*}
 */
const onSuccess = (resp, file, fileList) => {
  calcLoading.value = false
  const { code, data, message } = resp
  // 文件上传功能区
  ElMessage({
    type: code === 0 ? 'success' : 'error',
    message: code === 0 ? '文件上传成功' : message,
  })
  if (code !== 0) {
    return
  }
  file.displayName = formatName(file.name, file.size)
  file.fileId = resp.data.ids
  innerFiles.value = fileList.map((item) => {
    // 新数据拥有response属性 里面含有附件相关信息 将其直接赋值到文件根目录上
    const uploadRes = item.response?.data?.fileList[0]
    if (uploadRes) {
      Object.assign(item, uploadRes)
    }
    return item
  })
}
/** 文件删除时 */
const onRemove = (file, fileList) => {
  innerFiles.value = fileList
}

/** 文件溢出时 */
const onExceed = (files, fileList) => {
  ElMessage.warning(`最多上传 ${props.maxFileNum} 个文件！`)
}

// 格式化大小
const formatSize = (size) => {
  const fileSizeList = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const baseUnit = 1024
  const thePower = Math.floor(Math.log(size) / Math.log(baseUnit))
  return `${(size / baseUnit ** thePower).toFixed(2)}${fileSizeList[thePower]}`
}
// 格式化名称
const formatName = (name, size) => {
  return `${name}(${formatSize(size)})`
}
const downloadLoader = ref(null)
/**
 * @description: 下载附件
 * @param {*}
 * @return {*}
 */
const download = async (item) => {
  // 先简单处理一下 懒得弄了
  window.open(item.url)
}
const deleteAppendix = ({ fileId }) => {
  const returnArr = innerFiles.value.filter((item) => item.fileId !== fileId)
  innerFiles.value = returnArr
  emit('remove')
}
/**根据props的传参 和file类型 进行相应的操作功能筛选
 * @param {*} computed
 * @return {*}
 */
const calcOperationList = computed(() => {
  return (file) => {
    const fileExt = getExtension(file.fileName)
    const judgePreviewFile = acceptPreviewAll.value.includes(fileExt)
    const OPERATION_LIST = [
      {
        iconfont: 'el-icon-delete',
        method: deleteAppendix,
        visible: props.canDelete && !props.disabled && !file.readonly,
      },
      {
        iconfont: 'el-icon-zoom-in',
        method: previewFile,
        visible: props.canPreview && judgePreviewFile,
      },
      {
        iconfont: 'el-icon-download',
        method: download,
        visible: props.canDownload,
      },
    ].filter((o) => o.visible)
    return OPERATION_LIST
  }
})

// const { value: listTwo } = innerFiles;
// const asd = [...listOne, ...listTwo];

const myPaste = async (e) => {
  // 其实应该通过e.clipboardData.items[0].kind 进行判断 若为text 则return 若为file则继续
  const file = e.clipboardData.items[0]?.getAsFile()
  // 如果超出文件限制
  if (innerFiles.value.length >= props.maxFileNum) {
    return onExceed([file], innerFiles.value)
  }
  if (!file) {
    return
  }
  uploadRef.value.handleStart(file)
  uploadRef.value.submit()
}
const token = localStorage.getItem('TALENT_token') || ''
</script>
<template>
  <div class="my_uploader">
    <!-- my_uploader -->
    <div v-if="canUpload && !disabled" class="top_container">
      <el-upload
        ref="uploadRef"
        class="upload"
        :show-file-list="false"
        :action="action"
        :data="{
          type: 'a',
        }"
        :headers="{
          'X-Access-Token': token,
          Authorization: piniaSystem.token,
        }"
        multiple
        :file-list="innerFiles"
        :limit="maxFileNum"
        :on-success="onSuccess"
        :on-remove="onRemove"
        :on-exceed="onExceed"
        :before-upload="beforeUpload"
        :accept="calcAcceptStr"
        drag
      >
        <slot name="uploadBtn">
          <div v-if="btnType === 'big'" class="big_btn_wrap">
            <div class="big_btn">
              <i class="iconfont icon-jiahao"></i>
              <span class="btn_text">附件</span>
            </div>
            <div v-if="canPaste" class="right_content" @click.stop>
              <!-- <el-input
                class="paste_input"
                :placeholder="`支持上传${maxFileNum}个附件，每个不超过${maxFileSize}M\n点击按钮或黏贴、拖拽至此上传`"
                type="textarea"
                :rows="2"
                resize="none"
                @paste.native="myPaste($event)"
              ></el-input> -->
            </div>
          </div>
          <div v-else-if="btnType === 'mini'" class="small_btn_wrap">
            <el-button type="primary" class="small_btn">
              <i class="iconfont" :class="preIconClass"></i>
              {{ title }}
            </el-button>
            <div v-if="canPaste" @click.stop>
              <!-- <el-input
                class="paste_input"
                placeholder="黏贴、拖拽或点击上传附件"
                @paste.native="myPaste($event)"
                @click.stop
              ></el-input> -->
            </div>

            <p v-if="showTips" class="tips" @click.stop>
              支持上传{{ maxFileNum }}个附件，每个不超过{{ maxFileSize }}M
            </p>
          </div>
        </slot>
        <template #tip></template>
      </el-upload>
    </div>
    <slot name="list">
      <ul
        v-if="innerFiles.length"
        class="appendix_list"
        :class="{
          has_margin_top: canUpload && !disabled,
        }"
      >
        <li v-for="item in innerFiles" :key="item.fileId" class="appendix_item">
          <div class="name shard" :title="item.fileName">
            <span>{{ item.displayName }}</span>
          </div>
          <!-- <div class="size">{{ formatSize(item.size) }}</div> -->
          <ul class="operation_list shard">
            <li
              v-for="subItem in calcOperationList(item)"
              :key="subItem.iconfont"
              class="operation_button"
              @click="subItem.method(item)"
            >
              <i class="iconfont" :class="subItem.iconfont"></i>
            </li>
          </ul>
        </li>
      </ul>
    </slot>
    <el-image
      v-show="false"
      ref="imageDom"
      style="width: 100px; height: 100px"
      :src="calcPictures[currentImageIndex]"
      :preview-src-list="calcPictures"
    ></el-image>
  </div>
</template>
<style lang="less" scoped>
@uploaderTheme: #2799df;
.my_uploader {
  display: inline-flex;
  flex-flow: column wrap;
  // flex: 1;
  // width: 100%;
  .paste_input {
    width: 200px;
    margin-right: 10px;
  }
  :deep(.el-dialog) {
    width: 700px;
    .el-dialog__headerbtn {
      z-index: 99;
    }
    .el-dialog__body {
      height: 600px;
      overflow-y: auto;
    }
  }
  iframe {
    width: 100%;
    height: calc(100% - 30px);
  }
  :deep(.el-input) {
    height: 30px;
    line-height: 30px;

    .el-input__inner {
      line-height: inherit;
      height: 100%;
    }

    .el-input__icon {
      line-height: inherit;
    }
  }
  :deep(.top_container) {
    display: flex;
    .upload {
      width: inherit;
      display: flex;
      flex: 1;
      .el-upload {
        flex-shrink: 0;
        .el-upload-dragger {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: initial;
        }
      }
    }
    .big_btn {
      width: 50px;
      height: 50px;
      background: #f6fbff;
      border: 1px dashed rgba(40, 132, 223, 0.63);
      text-align: center;
      // line-height: 45px;
      line-height: initial;
      color: #3084df;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;
      .iconfont {
        font-size: 24px;
      }
    }
    .small_btn {
      // width: 90px;
      width: initial;
      padding: 0 6px;
      margin-right: 10px;
      min-height: initial;
      height: inherit;
      line-height: inherit;
      display: flex;
      justify-content: center;
    }
    .big_btn_wrap {
      display: flex;
      align-items: center;
      .right_content {
        margin-left: 10px;
        text-align: left;
        .paste_input {
          height: 50px;
          // line-height: 50px;
          width: 280px;
          textarea {
            min-height: 50px !important;
            padding-top: 0;
            padding-bottom: 0;
            line-height: 24px;
            border: 1px solid rgba(40, 132, 223, 0.23);
            background: #f6fbff;
          }
        }
        .title {
          text-align: left;
        }
        .tips {
          color: #9a9a9a;
          flex-shrink: 0;
        }
      }
    }
    .small_btn_wrap {
      display: flex;
      height: 30px;
      line-height: 30px;
      align-items: center;
      .small_btn {
        height: inherit;
        line-height: inherit;
        min-height: initial;
        margin: initial;
        margin-right: 10px;
      }
      .tips {
        color: #9a9a9a;
        flex-shrink: 0;
        margin-bottom: initial;
      }
      .iconfont {
        font-size: 12px;
        line-height: inherit;
        margin: initial;
      }
    }
  }

  .appendix_list {
    font-size: 14px;
    &.has_margin_top {
      margin-top: 10px;
    }
    .appendix_item {
      display: flex;
      align-items: center;
      &:not(:last-of-type) {
        margin-bottom: 6px;
      }
      .el-checkbox {
        position: relative;
        // top: -4px;
        .el-checkbox__label {
          display: none;
        }
      }
      .shard {
        display: flex;
        align-items: center;
        &.name {
          width: 400px;
          i {
            margin-right: 5px;
            margin-left: 5px;
          }
          span {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .iconfont {
            font-size: 18px;
            &.icon-jpg {
              color: #30d1ca;
            }
            &.icon-word1 {
              color: #5f94e8;
            }
            &.icon-excel {
              color: #107c41;
            }
            &.icon-tongyongtubiao {
              color: #4e8eff;
            }
          }
        }
        &.operation_list {
          margin-left: 20px;
          display: flex;
          align-items: center;
          .operation_button {
            width: 22px;
            height: 22px;
            line-height: 22px;
            border-radius: 50%;
            text-align: center;
            background: #eff3f9;
            &:not(:last-of-type) {
              margin-right: 10px;
            }
            i {
              color: @uploaderTheme;
              cursor: pointer;
              user-select: none;
            }
            &:hover {
              background: @uploaderTheme;
              i {
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
}
</style>
