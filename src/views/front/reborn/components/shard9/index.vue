<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-30 21:07:33
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-04 14:05:44
 * @Description: 组件功能
 * @FilePath: /my-vite/src/views/front/reborn/components/shard9/index.vue
-->
<script lang="ts" setup>
type Person = {
  name: string;
  school: string;
  age: number;
  happy: boolean;
};
type Person1 = {
  name1: string;
  school1: string;
  age1: number;
  happy1: boolean;
};
const person: Person = {
  name: "前端测试",
  school: "幼儿园",
  age: 10086,
  happy: true,
};
const person1: Person1 = {
  name1: "前端测试",
  school1: "幼儿园",
  age1: 10086,
  happy1: true,
};
type Values<T> = T[keyof T];
const myChange = <Type>(
  obj: Type,
  key: keyof Type,
  value: Type[typeof key]
) => {
  obj[key] = value;
};
// 此处仍存在问题
myChange<Person>(person, "happy", 123);

//#region ****** 函数重载&联合类型 start **********/
type Union = "a" | "b" | "c";
type UppercaseA<Item extends Union> = {
  [Key in Union]: Key extends "a" ? Uppercase<Item> : Item;
};
type A = UppercaseA<Union>;
type UppercaseAPlus<Item extends Union> = Item extends "a"
  ? Uppercase<Item>
  : Item;
type APlus = UppercaseAPlus<Union>;
type ChangeSeven<T> = T extends (infer P)[] ? P : T;
type ChangeSevenMore<T> = T extends [infer P, ...infer _] ? P : T;
type resultSevent = ChangeSeven<number>;
type resultSeventArr = ChangeSeven<number[]>;
type resultSeventMoreArr = ChangeSevenMore<[string, number, string]>;
// 获取函数参数类型集合
type GetFunParams<T extends Function> = T extends (...args: infer R) => any
  ? R
  : never;
type MyFun = (name: string, age: number, happy: boolean) => void;
type MyFunParams = GetFunParams<MyFun>;
// 获取函数返回值类型集合
type GetFunReturn<T extends Function> = T extends (...args: any) => infer R
  ? R
  : never;
type MyFun1 = (name: string, age: number, happy: boolean) => number;
type MyFunRetun = GetFunReturn<MyFun1>;
// 获取数组元素类型
type ArrayElementType<T> = T extends (infer E)[] ? E : T;
type item3 = ArrayElementType<[number, string]>;
// 函数相关
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number
// 联合转交叉
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;
//#endregion *** 函数重载&联合类型 end   **********/
</script>
<template>
  <div class="shard"></div>
</template>
<style lang="less" scoped>
.shard {
}
</style>
