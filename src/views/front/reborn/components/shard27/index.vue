<!--
 * @Author: XiaoJun
 * @Date: 2022-08-24 17:22:24
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-04-10 17:12:26
 * @Description: vue-draggable
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard27/index.vue
-->
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import draggable from 'vuedraggable'
let asd: any = {
  name: 123,
}
/*
draggable 对CSS样式没有什么要求万物皆可拖拽
:list="state.list"         //需要绑定的数组
ghost-class="ghost"        //被替换元素的样式
chosen-class="chosenClass" //选中元素的样式
animation="300"            //动画效果
@start="onStart"           //拖拽开始的事件
@end="onEnd"               //拖拽结束的事件
*/
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  list: [
    { name: 'www.itxst.com', id: 0 },
    { name: 'www.baidu.com', id: 1 },
    { name: 'www.google.com', id: 2 },
  ],
})

//拖拽开始的事件
const onStart = () => {
  console.log('开始拖拽')
}

//拖拽结束的事件
const onEnd = () => {
  console.log('结束拖拽')
}

//#region ****** el-table区域 start **********/
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
  },
])
//#endregion *** el-table区域 end   **********/
</script>
<template>
  <div class="itxst">
    <div>
      <!-- <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table> -->
      {{ tableData }}
      <draggable
        :list="tableData"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        item-key="id"
        @start="onStart"
        @end="onEnd"
      >
        <template #item="{ element }">
          <div class="item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
      <!-- <draggable
        :list="state.list"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
        @start="onStart"
        @end="onEnd"
        itemKey="id"
      >
        <template #item="{ element }">
          <div class="item">
            {{ element.name }}
          </div>
        </template>
      </draggable> -->
    </div>
  </div>
</template>
<style lang="less" scoped>
.itxst {
  width: 600px;
  display: flex;
}
.itxst > div:nth-of-type(1) {
  flex: 1;
}
.itxst > div:nth-of-type(2) {
  width: 270px;
  padding-left: 20px;
}
.item {
  border: solid 1px #eee;
  padding: 6px 10px;
  text-align: left;
}

.item:hover {
  cursor: move;
}
.item + .item {
  margin-top: 10px;
}
.ghost {
  border: solid 1px rgb(19, 41, 239);
}
.chosenClass {
  background-color: #f1f1f1;
}
</style>
