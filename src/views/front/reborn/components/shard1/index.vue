<!--
 * @Author: HuangXiaojun
 * @Date: 2022-06-22 00:14:27
 * @LastEditors: HuangXiaojun
 * @LastEditTime: 2022-06-22 01:02:46
 * @Description: 工厂模式
 * @FilePath: \my-vite\src\views\front\reborn\components\shard1\index.vue
-->
<script lang="ts" setup>
import { ref } from "vue";
class Introduce {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  init() {
    console.log("init");
  }
  fun() {
    console.log("fun");
  }
}
class Product extends Introduce {
  date: string;
  constructor(name: string, date: string) {
    super(name);
    this.date = date;
  }
}
class ProductOne extends Product {
  constructor(name: string, date: string) {
    super(name, date);
  }
}
class ProductTwo extends Product {
  constructor(name: string, date: string) {
    super(name, date);
  }
}
class Factory {
  create(type: number, name: string, date: string) {
    switch (type) {
      case 1:
        return new ProductOne(name, date);
      case 2:
        return new ProductTwo(name, date);
      default:
        return new Product(name, date);
    }
  }
}

// use
let factory = new Factory();
let p1 = factory.create(1, "p1", "2022-2-2");
let p2 = factory.create(2, "p1", "2022-2-2");
p1.init();
p2.fun();
</script>
<template>
  <div class="shard_one">工厂模式</div>
</template>
<style lang="less" scoped>
.shard_one {
}
</style>
