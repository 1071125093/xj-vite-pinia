<script lang="ts" setup>
import { computed } from 'vue'
import { includeTheObject, sortByEnum } from './utils'
enum School {
  '小学',
  '初中',
  '大学'
}
enum Award {
  '一等奖',
  '二等奖',
  '三等奖'
}
interface ListItem {
  school: string
  age: string
  name: string
  award: string
}
const arr: ListItem[] = [
  {
    school: '初中',
    name: '热血的初中生',
    age: '7岁',
    award: '三等奖'
  },
  {
    school: '小学',
    name: '作孽的小学生',
    age: '1岁',
    award: '二等奖'
  },
  {
    school: '大学',
    name: '打游戏的大学生',
    age: '好几岁',
    award: '一等奖'
  }
]
/** 按照学历排序 */
const calcListSchool = computed(() => {
  return sortByEnum(arr, 'school', School)
})
/** 按照奖牌排序 */
const calcListAward = computed(() => {
  return sortByEnum(arr, 'award', Award)
})

// #region ********** includeTheObject start **************/
const theList = [
  {
    school: '初中',
    name: '热血的初中生',
    age: '7岁',
    award: '三等奖',
    happy: true
  },
  {
    school: '小学',
    name: '作孽的小学生',
    age: '1岁',
    award: '二等奖',
    happy: true
  },
  {
    school: '大学',
    name: '打游戏的大学生',
    age: '好几岁',
    award: '一等奖',
    happy: true
  },
  {
    school: '社畜',
    name: '小杰',
    age: '10086',
    award: '一等奖',
    happy: false
  }
]
const theItem = theList[0]
console.log(includeTheObject(theList, 'happy', true))
console.log(includeTheObject(theList, theItem))
console.log(includeTheObject(theList, 'award', '二等奖'))
console.log(includeTheObject(theList, 'award', '10086等奖'))
const theOptions = [
  {
    label: '数组中是否有happy字段值为true的数据',
    judge: includeTheObject(theList, 'happy', true)
  },
  {
    label: '数组中是否有theItem,只认指针，不认全字段是否相等',
    judge: includeTheObject(theList, theItem)
  },
  {
    label: '数组中是否有award字段值为二等奖的数据',
    judge: includeTheObject(theList, 'award', '二等奖')
  },
  {
    label: '数组中是否有award字段值为10086等奖的数据',
    judge: includeTheObject(theList, 'award', '10086等奖')
  }
]

// #endregion ******* includeTheObject ~end~ **************/
</script>
<template>
  <div>
    <div>按照学历排序</div>
    <ul class="list">
      <li v-for="item in calcListSchool" :key="item.name">
        <span>名字：{{ item.name }}；</span>
        <span>学历：{{ item.school }}</span>
        <span></span>
      </li>
    </ul>
    <div>按照奖项排序</div>
    <ul class="list">
      <li v-for="item in calcListAward" :key="item.name">
        <span>名字：{{ item.name }}；</span>
        <span>奖项：{{ item.award }}</span>
        <span></span>
      </li>
    </ul>

    <div v-for="item in theOptions" :key="item.label">{{ item.label }}：{{ item.judge }}</div>
  </div>
</template>
