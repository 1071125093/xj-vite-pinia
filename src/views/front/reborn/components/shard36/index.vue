<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-02-28 22:38:39
 * @Description: 组件功能
 https://blog.csdn.net/m0_52409770/article/details/123049461
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard36/index.vue
-->
<script lang="ts" setup>
// #region ********** keyof 索引查询 start **************/
// 对应任何类型T,keyof T的结果为该类型上所有公有属性key的联合
interface Eg1 {
  name: string
  age: number
}
// T1的类型实则是name | age
type T1 = keyof Eg1

interface Eg2 {
  color: string
  age: string
}
// string | number
type V3 = Eg1[keyof Eg1]

// 交叉类型取的多个类型的并集，但是如果相同key但是类型不同，则该key为never。
type TEG = (Eg1 & Eg2)['age']

/** 会报错 */
// type V3 = Eg1[keyof Eg2]

// #endregion ******* keyof 索引查询 ~end~ **************/

// #region ********** infer start **************/
// 表示在extends条件语句中待推断得类型变量
type Union<T> = T extends Array<infer U> ? U : never

type Item = {
  name: string
  age: number
}
type List = {
  name: string
  age: number
}[]

type ItemGuess = Union<Item>
// type ItemGuess = Union<List>
// 解析如果T能赋值给(param: infer P) => any 类型，就返回P，否则就返回T
type ParamType<T> = T extends (param: infer P) => any ? P : T
interface IDog {
  name: string
  age: number
}

type Func = (dog: IDog) => void

type Param = ParamType<Func> // IDog
type TypeString = ParamType<string> // string
// #endregion ******* infer ~end~ **************/

// #region ********** extends关键词特性（重点) start **************/
interface Extends1 {
  name: string
}
/** 可行 */
// type Extends1 = {
//   name: string
// }

interface Extends2 {
  sex: number
}

interface T3 extends Extends1, Extends2 {
  age: number
}
// type test = T3['age']
/** 格式 T extends U ? RT1:RT2 */
// 有点类似三元表达式 T === U?RT1:RT2
type A1 = 'x' extends 'x' ? 1 : 2

/**
 * @example
 * type A2 = 2
 */
type A2 = 'x' | 'y' extends 'x' ? 1 : 2

/**
 * @example
 * type A3 = 1 | 2
 */
type P<T> = T extends 'x' ? 1 : 2
type A3 = P<'x' | 'y'>
// 提问：为什么A2和A3的值不一样？
// Anser 若extends前面的类型是泛型，且泛型传入的是联合类型时,过程是分发，结果是联合类型

// 阻止extends关键词对于联合类型的分发特性
// 可以通过简单的元组类型包裹一下
type P2<T> = [T] extends ['x'] ? 1 : 2
/**
 * type A4 = 2;
 */
type A4 = P2<'x' | 'y'>

// #endregion ******* extends关键词特性（重点) ~end~ **************/

// #region ********** 内置TS工具类 start **************/
interface Student {
  name: string
  age: number
  school: string
}
/** MyPartial */
type MyStudent = XJ.MyPartial<Student>
type MyStudentOptional = XJ.MyPartialOptional<Student, 'age' | 'name'>

type MyTestExclude = XJ.MyExclude<'name' | 'age' | 'hobby' | 'lover', keyof Student>

// #endregion ******* 内置TS工具类 ~end~ **************/
</script>
<template>
  <div class="shard">空</div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
