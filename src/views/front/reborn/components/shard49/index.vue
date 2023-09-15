<template>
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :single-line="false" />
</template>

<script lang="ts" setup>
import { h, defineComponent } from 'vue'
import { NButton, NPopconfirm } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'

type Song = {
  no: number
  title: string
  length: string
}
function handlePositiveClick() {
  console.log('是的')
}
function handleNegativeClick() {
  console.log('并不')
}
const createColumns = ({ play }: { play: (row: Song) => void }): DataTableColumns<Song> => {
  return [
    {
      title: 'No',
      key: 'no',
      rowSpan(rowData, rowIndex) {
        // 从当前rowIndex开始算
        const arr = data.value?.slice(rowIndex)
        // 找到一个Index
        const theIndex = arr.findIndex((fi, fIndex) => {
          const pre = arr[fIndex]
          const next = arr[fIndex + 1]
          // 同时满足
          // 1.pre的title等于当前行title
          // 2.没有next 或 next的title不等于等于当前行title
          return pre?.title === rowData.title && (!next || next.title !== rowData.title)
        })
        // 如果找得到
        if (theIndex >= 0) {
          // 因为rowSpan要比Index多1
          return theIndex + 1
        } else {
          // 否则
          return 1
        }
      }
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Length',
      key: 'length'
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h('div', [
          h(
            NButton,
            {
              strong: true,
              tertiary: true,
              size: 'small',
              onClick: () => play(row)
            },
            { default: () => 'Play' }
          ),
          h(
            NPopconfirm,
            {
              'on-positive-click': handlePositiveClick,
              'on-negative-click': handleNegativeClick
            },
            {
              default: () => '我是确认框里面的',
              trigger() {
                return h(
                  NButton,
                  {
                    strong: true,
                    tertiary: true,
                    size: 'small'
                  },
                  { default: () => 'Play' }
                )
              }
            }
          )
        ])
      }
    }
  ]
}

const data: Song[] = ref([
  { no: 3, title: 'Wonderwall', length: '4:18' },
  { no: 4, title: 'Wonderwall', length: '4:48' },
  { no: 12, title: 'Wonderwall', length: '7:27' },
  { no: 31, title: 'Wonderwffffasdsadall', length: '4:18' },
  { no: 41, title: 'Wonderwall', length: '4:48' },
  { no: 121, title: 'Wonderwall', length: '7:27' },
  { no: 32, title: 'Wonderwffffffffall', length: '4:18' },
  { no: 42, title: 'Wonderwall', length: '4:48' },
  { no: 122, title: 'Wonderwall', length: '7:27' }
])
const columns = createColumns({
  play(row: Song) {
    message.info(`Play ${row.title}`)
  }
})

const pagination = false
</script>
