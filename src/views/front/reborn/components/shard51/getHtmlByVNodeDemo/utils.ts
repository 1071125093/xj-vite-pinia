import { render } from 'vue'
/** 
 * @description: 通过vue组件，生成一个具体的HTML
 * 1.推荐配合vue的h()函数使用
 * 2.目前h()函数对props的提示暂不支持defineProps的泛型写法
 * 3.用法详见官网样例
 * @param {VNode} vnode 
 */
export function getHtmlByVNode(vnode: VNode) {
  const divElement = document.createElement('div')
  render(vnode, divElement)
  return divElement.innerHTML
}
