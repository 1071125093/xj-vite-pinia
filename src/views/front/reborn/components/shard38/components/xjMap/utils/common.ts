import { defineEmits, render } from 'vue'
type Zard = Parameters<typeof h>

export const getHtmlByComponent = (...rest: Zard) => {
  const theHtml = h(...rest)
  const divElement = document.createElement('div')
  // render(theHtml, document.body)
  render(theHtml, divElement)
  return theHtml
}
export const getHtmlByVNode = (vnode: VNode) => {
  const divElement = document.createElement('div')
  render(vnode, divElement)
  return divElement.outerHTML
}

