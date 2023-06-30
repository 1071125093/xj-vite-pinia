<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 14:00:00
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-08 09:55:14
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard7/index.vue
-->
<script lang="ts" setup>
import { ref, WatchOptions, watch, nextTick, computed, unref } from 'vue'
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
  useElementByPoint,
  useElementBounding,
  useEventListener,
  UseElementByPointOptions
} from '@vueuse/core'
// import { UseFocusTrap } from '@vueuse/integrations/useFocusTrap/component'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'
import { vElementHover } from '@vueuse/components'

//#region ****** 潜力股 start **********/
// useImage level-1
// useScroll level-3
// onClickOutside level-5
// onKeyStroke level-1 监听键盘事件
//#endregion *** 潜力股 end   **********/
/********** 鼠标位置 start **********/
const { x, y } = useMouse({ type: 'client' })
// const { x: mouseX, y: mouseY } = useMouse({ type: 'client' })
// const getPos = () => {
//   console.log(mouseX, mouseY)
// }
/********** 鼠标位置 end   **********/
/********** 全屏 start **********/
const { isFullscreen, toggle } = useFullscreen()
const myToggle = () => {
  console.log(isFullscreen.value)
  toggle()
}
/********** 全屏 end   **********/
/********** 复制 start **********/

const source123 = ref('点我复制文字')
const { text, copy, copied, isSupported } = useClipboard()
const xjTest = () => {
  copy(source123.value)
}
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
// const { x, y, style } = useDraggable(el, {
//   initialValue: { x: 40, y: 40 },
// })
// const { x: sx, x: sy } = useWindowScroll()
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
function watchOnce<Immediate extends Readonly<boolean> = false>(source: any, cb: any, options?: WatchOptions<Immediate>): void {
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
// 123123213
const clickedFn = () => {
  console.log('w rnm')
  watchOnceSource.value++
}
//#endregion *** watchOnce end   **********/

//#region ****** useIntervalFn start **********/

const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(1000)
const { pause, resume, isActive } = useIntervalFn(() => {
  word.value = greetings[Math.floor(Math.random() * greetings.length)]
}, interval)
//#endregion *** useIntervalFn end   **********/

//#region ****** useElementByPoint start **********/
// const { element } = useElementByPoint({ x, y })
// const bounding = reactive(useElementBounding(element))
// bounding
// useEventListener('scroll', bounding.update, true)
// const boxStyles = computed(() => {
//   if (element.value) {
//     return {
//       display: 'block',
//       width: `${bounding.width}px`,
//       height: `${bounding.height}px`,
//       left: `${bounding.left}px`,
//       top: `${bounding.top}px`,
//       backgroundColor: '#3eaf7c44',
//       transition: 'all 0.05s linear',
//     } as Record<string, string | number>
//   }
//   return {
//     display: 'none',
//   }
// })
// const pointStyles = computed<Record<string, string | number>>(() => ({
//   transform: `translate(calc(${x.value}px - 50%), calc(${y.value}px - 50%))`,
// }))
//#endregion *** useElementByPoint end   **********/
</script>
<template>
  <div class="default_class">
    <el-button type="primary" size="small" @click="logTitle">点我修改标题</el-button>
    <!-- <el-button type="primary" size="small" @click="getPos">点我获取位置</el-button> -->
    <el-button type="primary" size="small" @click="myToggle">点我全屏</el-button>
    <el-button type="primary" size="small">{{ source123 }}</el-button>
    <el-button type="primary" size="small" @click="xjTest">复制指定文字</el-button>
    <!-- <div class="draggable" ref="el" :style="style" style="position: fixed">
      Drag me! I am at {{ x }}, {{ y }}
    </div> -->
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
      <div ref="container" class="container">
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
    <button type="button" @click="clickedFn">点击按钮测试watchOnce</button>
    <p>{{ word }}</p>
    <p>
      interval:
      <input v-model="interval" type="number" placeholder="interval" />
    </p>
    <button v-if="isActive" class="orange" @click="pause">Pause</button>
    <button v-if="!isActive" @click="resume">Resume</button>

    <!-- <div :style="boxStyles" class="box_style" /> -->
    <!-- <div :style="pointStyles" class="point_style" /> -->
    <div class="flex items-center">
      <span class="mr-4">X</span>
      <input v-model="x" type="number" />
    </div>
    <div class="flex items-center">
      <span class="mr-4">Y</span>
      <input v-model="y" type="number" />
    </div>
  </div>
</template>
<style lang="less" scoped>
.draggable {
  cursor: grab;
}
.box_style {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  border: 1px solid #87ceeb;
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
.point_style {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #87ceeb;
  z-index: 999;
}
</style>
