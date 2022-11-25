/*
 * @Author: XiaoJun
 * @Date: 2022-11-23 15:32:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-11-23 15:44:02
 * @Description: 单元测试
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard33/test/xj.test.js
 */

// counter.test.js
import { useCounter } from '../utils/xj'

test('useCounter测试开始', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
// import { render } from '@testing-library/vue'
// import MyComponent from './MyComponent.vue'

// test('it should work', () => {
//   const { getByText } = render(MyComponent, {
//     props: {
//       /* ... */
//     },
//   })

//   // 断言输出
//   getByText('...')
// })
