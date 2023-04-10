<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-30 21:07:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 19:06:26
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard9/index.vue
-->
<script lang="ts" setup>
// // 假设我一个枚举
// enum ENUM_TYPE {
//   ALL = 'all',
//   SOME = 'some',
//   LITTLE = 'little',
// }

// // 获取枚举的 value
// type IValue = `${ENUM_TYPE}` // 'all' | 'some' | 'little'

// // 获取枚举的 key
// type IKey = keyof typeof ENUM_TYPE // 'ALL' | 'SOME' | 'LITTLE'

type Person = {
  name: string
  school: string
  age: number
  happy: boolean
}
type Person1 = {
  name1: string
  school1: string
  age1: number
  happy1: boolean
}
const person: Person = {
  name: '前端测试',
  school: '幼儿园',
  age: 10086,
  happy: true,
}
const person1: Person1 = {
  name1: '前端测试',
  school1: '幼儿园',
  age1: 10086,
  happy1: true,
}
type Values<T> = T[keyof T]
const myChange = <Type extends {}>(obj: Type, key: keyof Type, value: Type[typeof key]) => {
  obj[key] = value
}
// 此处仍存在问题
myChange<Person>(person, 'happy', 123)

//#region ****** 函数重载&联合类型 start **********/
type Union = 'a' | 'b' | 'c'
type UppercaseA<Item extends Union> = {
  [Key in Union]: Key extends 'a' ? Uppercase<Item> : Item
}
type A = UppercaseA<Union>
type UppercaseAPlus<Item extends Union> = Item extends 'a' ? Uppercase<Item> : Item
type APlus = UppercaseAPlus<Union>
type ChangeSeven<T> = T extends (infer P)[] ? P : T
type ChangeSevenMore<T> = T extends [infer P, ...infer _] ? P : T
type resultSevent = ChangeSeven<number>
type resultSeventArr = ChangeSeven<number[]>
type resultSeventMoreArr = ChangeSevenMore<[string, number, string]>
// 获取函数参数类型集合
type GetFunParams<T extends Function> = T extends (...args: infer R) => any ? R : never
type MyFun = (name: string, age: number, happy: boolean) => void
type MyFunParams = GetFunParams<MyFun>
// 获取函数返回值类型集合
type GetFunReturn<T extends Function> = T extends (...args: any) => infer R ? R : never
type MyFun1 = (name: string, age: number, happy: boolean) => number
type MyFunRetun = GetFunReturn<MyFun1>
// 获取数组元素类型
type ArrayElementType<T> = T extends (infer E)[] ? E : T
type item3 = ArrayElementType<[number, string]>
// 函数相关
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void } ? U : never
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }> // string & number
// 联合转交叉
type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (
  x: infer R
) => unknown
  ? R
  : never
//#endregion *** 函数重载&联合类型 end   **********/

//#region ****** ts协变&逆变&高级类型 start **********/
// https://juejin.cn/post/7104249991148863496
// 协变很好理解，就是将子类型的变量赋值给父类型的变量：
interface Animal {
  name: string
  age: number
}

interface Dog {
  name: string
  age: number
  bite(): void
}

let animal: Animal
const wangCai: Dog = {
  name: 'wang cai',
  age: 3,
  bite: () => {},
}
animal = wangCai
// animal = {
//   name: 'ababa',
//   age: 123,
// }
// wangCai = animal

// 逆变
interface Animal {
  name: string
  age: number
}

interface Dog {
  name: string
  age: number
  bite(): void
}

let animalFun: (animal: Animal) => void
animalFun = (animal: Animal) => {
  console.log(animal.name)
}
let dogFun: (dog: Dog) => void
dogFun = (dog: Dog) => {
  dog.bite()
}
// animalFun(animal);  // ok
// animalFun(wangCai);  // ok
// dogFun = animalFun
// animalFun = dogFun

// type AnimalFun = (animal: Animal) => void
// type DogFun = (dog: Dog) => void
// type Z = DogFun | AnimalFun
// const z: Z = (bobo:Dog) => {
//   console.log(bobo.bite)
// }
//#endregion *** ts协变&逆变&高级类型 end   **********/

//#region ****** 高级类型 start **********/
type Parameters<T extends Function> = T extends (...args: infer P) => any ? P : never

const xjTest = ['name', 1, false]
type MyJudgeType<T> = T extends Array<infer P> ? P : never
type Zard = MyJudgeType<typeof xjTest>

//#endregion *** 高级类型 end   **********/

//#region ****** xjTest start **********/
const F1 = () => 123
const F2 = () => 'woca'
type MultiFun = typeof F1 | typeof F2
type MultiType = ReturnType<MultiFun>
const xjTestFun: MultiFun = () => {
  return F1()
}
type Z = typeof F1
xjTestFun()
//#endregion *** xjTest end   **********/

//#region ****** more start **********/
// type TypeMore = {
//   name: string
//   age: number
//   judge: boolean
// }
const asd = {
  name: '好人',
  age: 23,
  judge: false,
}
type Asd = typeof asd
const getMore = <T extends keyof Asd>(key: T): Asd[T] => {
  return asd[key]
}
const name = getMore('judge')
//#endregion *** more end   **********/

// #region ********** 注释 start **************/
interface Person41 {
  name: string
  age: number
}
interface MyTest extends Person41 {}

const myTest: MyTest = {
  name: '123',
  age: 123,
}

/** 感觉没啥用 */
function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

// const user = {
//   id: '1',
//   name: 'xiaoming',
// }

// let id = 'id'

// const userId = user[id]
// const userId = getProperty(user,id)
enum EStatus {
  success = '成功',
  warning = '警告',
  error = '错误',
}
type EKeys = keyof typeof EStatus
type EValues = U.Values<typeof EStatus>
const E1 = EStatus.error

// #endregion ******* 注释 ~end~ **************/
</script>
<template>
  <div class="shard"></div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
