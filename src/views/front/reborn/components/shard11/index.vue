<!--
 * @Author: XiaoJun
 * @Date: 2022-07-02 09:07:44
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-09-05 15:06:25
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard11/index.vue
-->
<script lang="ts" setup>
import {
  ref,
  onUpdated,
  onBeforeUpdate,
  reactive,
  computed,
  defineCustomElement,
  markRaw,
  VNodeRef,
} from 'vue'
import test from './components/test.vue'
// // 子组件实例数组
//#region ****** 动态数组模块 start **********/
type GetType<T> = T extends (infer R)[] ? R : never
const cptArr = ref([
  { type: 'imgCpt', dom: null },
  { type: 'advCpt', dom: null },
])
type CptType = GetType<typeof cptArr.value>
// let itemRefs: any[] = [];
// const setItemRef = (el: Element | ComponentPublicInstance) => {
//   if (el) {
//     itemRefs.push(el);
//   }
// };
// const myTest = (index: number) => {
//   console.log(itemRefs[index]);
// };
const otherSetItemRef = <T extends CptType>(item: T) => {
  return (el: VNodeRef) => {
    // if (!item.dom) {
    //   item.dom = el
    // }
    return el
  }
}
const myTest = (item: any) => {
  console.log(item.dom)
}
// onBeforeUpdate(() => {
//   itemRefs = [];
// });
//#endregion *** 动态数组模块 end   **********/
//#region ****** v-bind模块 start **********/
const domWidth = ref('200px')
const changeDomWidth = () => {
  domWidth.value = '300px'
}
//#endregion *** v-bind模块 end   **********/
//#region ****** reactive中ref测试 start **********/
// #note:测试结果.reactive中的ref或computed会被直接打平成一个普通的静态数据，然后整体reactive响应式
const bobo = reactive({})
const getRefInReactive = () => {}
//#endregion *** reactive中ref测试 end   **********/
//#region ****** customElement测试 start **********/
// const MyVueElement = defineCustomElement({
//   // normal Vue component options here
//   props: {},
//   emits: {},
//   template: `...`,
//   // defineCustomElement only: CSS to be injected into shadow root
//   styles: [`/* inlined css */`],
// });

// // Register the custom element.
// // After registration, all `<my-vue-element>` tags
// // on the page will be upgraded.
// customElements.define("my-vue-element", MyVueElement);

// // You can also programmatically instantiate the element:
// // (can only be done after registration)
// document.body.appendChild(
//   new MyVueElement({
//     // initial props (optional)
//   })
// );
//#endregion *** customElement测试 end   **********/
</script>
<template>
  <div class="shard">
    <!-- <button @click="myTest1">第一行</button> -->
    <div v-for="item in cptArr" :key="item.type" :ref="otherSetItemRef(item)" @click="myTest(item)">
      {{ item.type }}
    </div>
    <button @click="changeDomWidth">改变dom宽度</button>
    <button @click="getRefInReactive">reactive中ref测试</button>
  </div>
</template>
<style lang="less" scoped>
.shard {
  width: v-bind(domWidth);
  background: #87ceeb;
}
</style>
