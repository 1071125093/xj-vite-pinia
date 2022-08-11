<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 14:00:00
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-08-11 17:34:32
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard7/index.vue
-->
<script lang="ts" setup>
import { ref, WatchOptions, watch, nextTick } from 'vue'
import { reactive } from 'vue'
import {
  useMouse,
  useClipboard,
  useFullscreen,
  useDark,
  useDraggable,
  useWindowScroll,
  useTitle,
  onClickOutside,
  useStorage,
  useIntervalFn,
} from '@vueuse/core'
// import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { vElementHover } from '@vueuse/components'
/********** 鼠标位置 start **********/
const mouse = reactive(useMouse())
const getPos = () => {
  console.log(mouse.x, mouse.y)
}
/********** 鼠标位置 end   **********/
/********** 全屏 start **********/
const { isFullscreen, toggle } = useFullscreen()
const myToggle = () => {
  console.log(isFullscreen.value)
  toggle()
}
/********** 全屏 end   **********/
/********** 复制 start **********/

const source = ref('点我复制文字')
const { text, copy, copied, isSupported } = useClipboard({ source })

/********** 复制 end   **********/
/********** 黑暗模式 start **********/
// const isDark = useDark({
//   selector: "body", //class渲染的标签
//   valueDark: "dark", //暗黑class名字
//   valueLight: "light", //高亮class名字
// });
// const toggleDark = useToggle(isDark);
/********** 黑暗模式 end   **********/
/********** 设置title start **********/
const title = useTitle('default title')
const logTitle = () => {
  title.value = '前端修改标题测试'
} // print current title
// change current title
/********** 设置title end   **********/
// "x" and "y" will be auto unwrapped, no `.value` needed
//#region ****** draggable start **********/
const el = ref<HTMLElement | null>(null)

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
const { x: sx, x: sy } = useWindowScroll()
//#endregion *** draggable end   **********/

//#region ****** onClickOutside  start **********/
// const container = ref(null)
// onClickOutside(container, () => alert('Good. Better to click outside.'))
//#endregion *** onClickOutside  end   **********/

//#region ****** useFocusTrap start **********/
// 函数式
const container = ref(null)
const { hasFocus, activate, deactivate } = useFocusTrap(container, { immediate: false })
// 组件式
// const show = ref(true)

//#endregion *** useFocusTrap end   **********/

//#region ****** vElementHover  start **********/
const isHovered = ref(false)
const onHover = (state: boolean) => {
  isHovered.value = state
}
//#endregion *** vElementHover  end   **********/

//#region ****** watchOnce start **********/
function watchOnce<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options?: WatchOptions<Immediate>
): void {
  // 精髓部分 vue-watch的返回值可以结束该监听 基础不牢固的后果
  const stop = watch(
    source,
    (...args) => {
      nextTick(() => {
        stop()
      })
      return cb(...args)
    },
    options
  )
}
const watchOnceSource = ref(0)
watchOnce(watchOnceSource, (value: any) => {
  console.log('变化了', value)
})
const clickedFn = () => {
  watchOnceSource.value++
}
//#endregion *** watchOnce end   **********/

//#region ****** useIntervalFn start **********/

const greetings = [
  'Hello',
  'Hi',
  'Yo!',
  'Hey',
  'Hola',
  'こんにちは',
  'Bonjour',
  'Salut!',
  '你好',
  'Привет',
]
const word = ref('Hello')
const interval = ref(1000)
const { pause, resume, isActive } = useIntervalFn(() => {
  word.value = greetings[Math.floor(Math.random() * greetings.length)]
}, interval)
//#endregion *** useIntervalFn end   **********/

//#region ****** useImage start **********/
// 暂无测试 可以用 但没必要
//#endregion *** useImage end   **********/
</script>
<template>
  <div class="default_class">
    <el-button type="primary" size="small" @click="logTitle">点我修改标题</el-button>
    <el-button type="primary" size="small" @click="getPos">点我获取位置</el-button>
    <el-button type="primary" size="small" @click="myToggle">点我全屏</el-button>
    <el-button type="primary" size="small" @click="copy()">{{ source }}</el-button>
    <div class="draggable" ref="el" :style="style" style="position: fixed">
      Drag me! I am at {{ x }}, {{ y }}
    </div>
    <!-- <div>
      <p>Hey there, here's some text.</p>
      <div class="container" ref="container">
        <p>Please don't click in here.</p>
      </div>
    </div> -->
    <el-button type="primary" size="small" @click="myToggle">点我全屏</el-button>
    <!-- <el-button type="primary" size="small" @click="toggleDark"
      >点我黑黑黑</el-button
    > -->
    <div>
      <button tab-index="5">目前是否开启focus-trap:{{ hasFocus }}</button>
      <button tab-index="5" @click="activate()">开启</button>
      <div class="container" ref="container">
        <button tab-index="5">Inside the trap</button>
        <button tab-index="5">Can't break out</button>
        <button tab-index="5">Stuck here forever</button>
        <button tab-index="5" @click="deactivate()">关闭</button>
      </div>
    </div>
    <!-- <div class="modal" @click="show = true">开启 当前状态{{ show }}</div>
    <UseFocusTrap v-if="show">
      <div class="modal" @click="show = false">关闭{{ show }}</div>
      <button tab-index="5">Inside the trap</button>
      <button tab-index="5">Can't break out</button>
      <button tab-index="5">Stuck here forever</button>
    </UseFocusTrap> -->

    <button v-element-hover="onHover">
      {{ isHovered ? 'Thank you!' : 'Hover me' }}
    </button>
    <div>{{ watchOnceSource }}</div>
    <button @click="clickedFn">点击按钮测试watchOnce</button>

    <p>{{ word }}</p>
    <p>
      interval:
      <input v-model="interval" type="number" placeholder="interval" />
    </p>
    <button v-if="isActive" class="orange" @click="pause">Pause</button>
    <button v-if="!isActive" @click="resume">Resume</button>
  </div>
</template>
<style lang="less" scoped>
.draggable {
  cursor: grab;
}
button {
  margin: 8px 0;
  padding: 12px 16px;
  background: slategrey;
  color: white;
  font-weight: bold;
  font-size: 18px;
  border: none;
  border-radius: 4px;
}

button:focus {
  outline: skyblue solid 6px;
}

.container {
  display: flex;
  flex-direction: column;
  border: 2px solid gray;
  border-radius: 6px;
  margin: 16px 0;
  padding: 4px 8px;
}
</style>
