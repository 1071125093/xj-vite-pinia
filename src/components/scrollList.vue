<!--
 * @Author: XiaoJun
 * @Date: 2022-10-26 16:45:54
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-10-26 16:58:08
 * @Description: 组件功能
 * @FilePath: /fd-chuangguanjia-gov/src/views/demo/components/scrollList.vue
-->
<template>
  <div class="out-content" :style="{ height: styleHeigth + 'px' }">
    <div class="inner-scroll" :style="innerScroll" @mouseenter="onEnter" @mouseleave="onLeave">
      <div class="roll" :style="{ marginTop: marginTop + 'px' }">
        <ul class="list">
          <li v-for="item in list" :key="item" class="item">
            我我我测试我我我测试我我我测试我我我测试我我我测试我我我测试我我我测试
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return [1, 2, 3, 4, 5, 6, 7, 8]
    },
  },
  styleHeigth: {
    type: Number,
    default: 230,
  },
  marginTopNum: {
    type: Number,
    default: -200,
  },
})
const timer = ref(0)
const currentList = ref([])
const marginTop = ref(0)
const reduceCount = ref(0)

// 清空定时器
const clear = () => {
  cancelAnimationFrame(timer.value)
  timer.value = 0
}

// 鼠标事件
const onEnter = () => {
  auto.value = true
  clear()
}
const onLeave = () => {
  auto.value = false
  if (currentList.value.length >= 3) {
    timer.value = requestAnimationFrame(rolling)
  }
}

// 滚动事件
function rolling() {
  reduceCount.value += 1 / 3
  if (reduceCount.value == 1) {
    marginTop.value -= reduceCount.value
    reduceCount.value = 0
  }
  requestAnimationFrame(rolling)
  if (marginTop.value < props.marginTopNum) {
    const copyData = currentList.value
    const first = copyData.shift()
    copyData.push(first)
    currentList.value = copyData
    marginTop.value = 0
  }
}

// 定时调用
function scroll() {
  timer.value = requestAnimationFrame(rolling)
}

const auto = ref(false)
const innerScroll = computed(() => {
  return {
    overflow: auto.value ? 'auto' : 'hidden',
    // transform: 'translate3d(0px, 0px, 0px)'
  }
})

// 获取到数据后开始滚动
watch(
  () => props.list,
  (val) => {
    if (val.length >= 3) {
      const { list } = toRefs(props)
      currentList.value = list.value
      scroll()
    }
  }
)
onMounted(() => {
  scroll()
})
onBeforeUnmount(() => {
  clear()
})
</script>
<style lang="less" scoped>
.out-content {
  // transform: scale3d(10, 10, 1);
  .inner-scroll {
    height: 100%;
    overflow: hidden;
  }
}
.list {
  font-size: 12px;
  .item {
    width: 300px;
  }
}
</style>
