<template>
  <div style="display: flex">
    <div id="rencailiebiao" :theme="theme" class="rencai-liebiao-wrapper">
      <div class="rencai-liebiao-left-wrapper">
        <div class="rencai-total-exhibition">
          <img
            :src="`https://isp-prod.oss-cn-hangzhou.aliyuncs.com/ss-project/zing/baseline/rencai-overview-${theme}.png`"
            alt=""
            class="rencai-total-icon"
          />
          <div class="rencai-total-content">
            <p class="rencai-total-label">人才总数</p>
            <div class="rencai-total-value-unit">
              <div class="rencai-total-value">
                <n-ellipsis :tooltip="{ width: 'trigger' }">
                  {{ displayThousand(10000) }}
                </n-ellipsis>
              </div>
              <span class="rencai-total-unit">位</span>
            </div>
          </div>
        </div>
        <div class="rencai-title-table-data">
          <div class="rencai-title-table-heade-items">
            <span class="rencai-title-text">人才称号</span>
            <span style="width: 60px">数量</span>
          </div>
          <div class="rencai-title-table-list">
            <div
              v-for="item in rencaiTitleList"
              :key="item.id"
              :class="[
                'rencai-title-table-item',
                { 'rencai-title-table-item-active': activeTalentTitle === item.title }
              ]"
              @click="chooseTalent(item)"
            >
              <div class="rencai-title-text">
                <n-ellipsis :tooltip="{ width: 'trigger' }">{{ item.title }}</n-ellipsis>
              </div>
              <span style="width: 60px">{{ item.value }}位</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rencai-liebiao-right-wrapper">
        <div class="rencai-filter-content">
          <div class="keyword-input-box">
            <span class="keyword-label">关键词：</span>
            <n-input placeholder="请输入关键词" style="width: 254px" clearable>
              <template #suffix>
                <n-icon>
                  <SearchOutline />
                </n-icon>
              </template>
            </n-input>
          </div>
          <z-tiled-filters
            :widgets-options="widgetsOptions"
            :result-show="false"
            @search="handleSearch"
          ></z-tiled-filters>
        </div>
        <div class="rencai-list-data-groups">
          <div class="rencai-card-items">
            <div v-for="item in rencarList" :key="item.id" class="rencai-card-item">
              <img
                :src="
                  item.avatar
                    ? item.avatar
                    : 'https://isp-prod.oss-cn-hangzhou.aliyuncs.com/ss-project/zing/baseline/rencai-avatar-default.png'
                "
                alt=""
                class="rencai-avatar"
              />
              <p class="rencai-name">{{ item.name }}</p>
              <div class="rencai-sex-nation-content">
                <span class="rencai-sex">{{ item.sex }}</span>
                <span class="rencai-nation">
                  <n-ellipsis :tooltip="{ width: 'trigger' }">
                    {{ item.nation }}
                  </n-ellipsis>
                </span>
              </div>
              <p class="rencai-company">{{ item.companyName }}</p>
              <div class="rencai-title-gather">
                <n-ellipsis>
                  {{
                    item.title && Array.isArray(item.title)
                      ? item.title.join('、')
                      : item.title
                  }}
                </n-ellipsis>
              </div>
              <div class="rencai-label-gather">
                <n-ellipsis :tooltip="{ to: '.rencai-label-gather' }">
                  <span
                    v-for="(ele, index) in item.label"
                    :key="index"
                    class="rencai-label-item"
                  >
                    {{ ele }}
                  </span>
                  <template #tooltip>
                    <div class="rencai-label-items">
                      <span
                        v-for="(ele, index) in item.label"
                        :key="index"
                        class="rencai-label-item"
                      >
                        {{ ele }}
                      </span>
                    </div>
                  </template>
                </n-ellipsis>
              </div>
            </div>
          </div>
          <z-pager
            class="pager-wrapper"
            :page="pageNum"
            :page-size="pageSizeNum"
            :total="totalNum"
            :page-sizes="pageSizes"
            @update-page="handleUpdatePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NEllipsis } from 'naive-ui'
import { SearchOutline } from '@vicons/ionicons5'
import { ZTiledFilters, ZPager } from '@firestone/zing-ui'

type Props = {
  theme: string
  id?: string | number
}
interface RencaiTitleItem {
  id: string
  title: string
  value: number
}

interface RencaiItem {
  name: string
  sex: string
  nation: string
  companyName: string
  title: string | string[]
  label: string[]
  id: string
  avatar?: string
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  id: ''
})

const route = useRoute()
const theme = route.query.theme || props.theme
const id = route.query.id || props.id

const rencaiTitleList = ref<RencaiTitleItem[]>([])
const rencarList = ref<RencaiItem[]>([])
const widgetsOptions = ref<Array<any>>([
  {
    title: '分类',
    key: 'area',
    multiple: true,
    pack: true,
    data: [
      { name: '生命健康', value: 1 },
      { name: '人工智能', value: 2 },
      { name: '产业1', value: 3 },
      { name: '产业2', value: 4 },
      { name: '产业3', value: 5 },
      { name: '产业4', value: 6 },
      { name: '产业5', value: 7 },
      { name: '产业6', value: 8 },
      { name: '产业7', value: 9 },
      { name: '产业8', value: 10 },
      { name: '产业9', value: 11 },
      { name: '产业10', value: 12 },
      { name: '产业11', value: 13 },
      { name: '产业12', value: 14 },
      { name: '产业13', value: 15 },
      { name: '产业14', value: 16 }
    ]
  },
  {
    title: '产业分类',
    key: 'area2',
    multiple: true,
    data: [
      { name: '生命健康', value: 1 },
      { name: '人工智能', value: 2 },
      { name: '产业1', value: 3 },
      { name: '产业2', value: 4 },
      { name: '产业3', value: 5 },
      { name: '产业4', value: 6 },
      { name: '产业5', value: 7 }
    ]
  },
  {
    title: '政策级别',
    key: 'plocy',
    multiple: true,

    data: [
      { name: '国家级', value: 1 },
      { name: '省级', value: 2 },
      { name: '市级', value: 3 },
      { name: '区县级', value: 4 }
    ]
  },
  {
    title: '辣条',
    key: 'foods',
    multiple: true,
    data: [
      { name: '火爆鸡精', value: 1 },
      { name: '卫龙', value: 2 },
      { name: '大师兄', value: 3 },
      { name: '唐僧肉', value: 4 }
    ]
  }
])

const talentTypeList = [
  '国家最高科学技术奖',
  '两院院士',
  '国家高层次人才计划',
  '国家创新人才推进计划',
  '国家级领军人才工程入选',
  '享受国务院特殊津贴'
]

const pageSizes = [5, 10, 15, 20]

const pageNum = ref(1)
const pageSizeNum = ref(5)
const totalNum = ref(120)

const activeTalentTitle = ref('')
const displayThousand = (num: number | string) => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const handleUpdatePage = (page: number) => {
  pageNum.value = page
}

const handleSearch = (result: { [key: string]: any }) => {
  console.log(result)
}

const chooseTalent = (item: RencaiTitleItem) => {
  if (activeTalentTitle.value === item.title) {
    activeTalentTitle.value = ''
  } else {
    activeTalentTitle.value = item.title
  }
  getList()
}

const getList = () => {
  rencarList.value = new Array(12).fill(1).map(() => ({
    name: '张李四',
    sex: '男',
    nation: '中国',
    companyName: '杭州费尔斯通科技有限公司',
    title: [
      activeTalentTitle.value
        ? activeTalentTitle.value
        : talentTypeList[Math.floor(Math.random() * talentTypeList.length)]
    ],
    label: ['产业标签1', '产业标签2', '产业标签3', '产业标签4', '产业标签5', '产业标签6'],
    id: `${new Date().getTime()}`
  }))
}

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
const arr = [
  {
    school: '初中',
    name: '热血的初中生',
    age: '7岁',
    award:'三等奖'
  },
  {
    school: '小学',
    name: '作孽的小学生',
    age: '1岁',
    award:'二等奖'
  },
  {
    school: '大学',
    name: '打游戏的大学生',
    age: '好几岁',
    award:'一等奖'
  }
]
debugger
console.log(window.zingUtils.sortByEnum(arr, 'school', School))
console.log(window.zingUtils.sortByEnum(arr, 'award', Award))


onMounted(() => {
  console.log(id)

  rencaiTitleList.value = talentTypeList.map((title) => ({
    title,
    id: `${new Date().getTime()}`,
    value: Math.floor(Math.random() * 10000) + 1000
  }))

  getList()
})
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
  text-align: left;
}
@font-face {
  font-family: DIN-Medium;
  src: url('https://isp-prod.oss-cn-hangzhou.aliyuncs.com/ss-project/zing/baseline/DIN Medium.ttf');
}

#rencailiebiao[theme='light'] {
  --bc-bg-color: #fff;
  --bc-text-primary-color: #333;
  --bc-text-sub-color: #666666;
  --bc-text-highlight-color: #05d2ff;
  --bc-table-header-text-color: #666666;
  --bc-table-header-bg-color: rgba(224, 241, 255, 0.5);
  --bc-table-header-border-color: transparent;
  --bc-table-striped-bg-color: #fff;
  --bc-table-body-text-color: #333;
  --bc-rencai-card-labels-box-bg-color: rgba(224, 241, 255, 0.5);
  --bc-rencai-card-labels-box-border-color: transparent;
  --bc-rencai-label-text-color: #1492ff;
  --bc-rencai-label-border-color: #aad8ff;
  --bc-rencai-label-bg-color: #e3f2ff;
  --bc-rencai-card-bg-img: url(https://isp-prod.oss-cn-hangzhou.aliyuncs.com/ss-project/zing/baseline/rencai-card-bg-light.png);

  --bc-filters-border-color: #f0f0f0;
  --bc-filter-label-text-color: #999;
  --bc-filter-item-border-color: #f0f0f0;
  --bc-filter-tag-active-text-color: #1492ff;
  --bc-filter-tag-active-bg-color: #e0f1ff;
  --bc-filter-tips-text-color: #1492ff;
  --bc-filter-tips-icon-color: #b3b3b3;
  --bc-filter-button-reset-color: #666666;
  --bc-filter-button-reset-color-hover: #1492ff;
  --bc-filter-button-search-color: #fff;

  // 重置 z-pager 样式
  --bc-pager-text-color-hover: #1492ff;
  --bc-pager-text-color-active: #fff;
  --bc-pager-bg-color: transparent;
  --bc-pager-bg-color-active: #1492ff;
  --bc-pager-border-color: transparent;
  --bc-pager-border-color-hover: #1492ff;
  --bc-pager-border-color-active: #1492ff;
}

#rencailiebiao[theme='dark'] {
  --bc-bg-color: #153270;
  --bc-text-primary-color: #fff;
  --bc-text-sub-color: #d0e1ff;
  --bc-text-highlight-color: #05d2ff;
  --bc-table-header-text-color: #8eaae0;
  --bc-table-header-bg-color: rgba(37, 70, 133, 0.8);
  --bc-table-header-border-color: #254685;
  --bc-table-striped-bg-color: rgba(37, 70, 133, 0.8);
  --bc-table-body-text-color: #d0e1ff;
  --bc-rencai-card-labels-box-bg-color: #2a468b;
  --bc-rencai-card-labels-box-border-color: #254685;
  --bc-rencai-label-text-color: #05d2ff;
  --bc-rencai-label-border-color: #2a63ae;
  --bc-rencai-label-bg-color: #194b8d;
  --bc-rencai-card-bg-img: url(https://isp-prod.oss-cn-hangzhou.aliyuncs.com/ss-project/zing/baseline/rencai-card-bg-dark.png);

  // 重置 z-tiled-filters样式
  --bc-filters-border-color: rgba(143, 166, 207, 0.2);
  --bc-filter-label-text-color: #9cc6ff;
  --bc-filter-item-border-color: rgba(143, 166, 207, 0.2);
  --bc-filter-tag-active-text-color: #05d2ff;
  --bc-filter-tag-active-bg-color: #194b8d;
  --bc-filter-tips-text-color: #1492ff;
  --bc-filter-tips-icon-color: #b5cbff;
  --bc-filter-button-reset-color: #fff;
  --bc-filter-button-reset-color-hover: #1492ff;
  --bc-filter-button-search-color: #fff;

  // 重置 z-pager 样式
  --bc-pager-text-color-hover: #1492ff;
  --bc-pager-text-color-active: #fff;
  --bc-pager-bg-color: transparent;
  --bc-pager-bg-color-active: #1492ff;
  --bc-pager-border-color: transparent;
  --bc-pager-border-color-hover: #1492ff;
  --bc-pager-border-color-active: #1492ff;
}

.rencai-liebiao-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 238px 1fr;
  gap: 16px;

  .rencai-liebiao-left-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .rencai-total-exhibition {
      background-color: var(--bc-bg-color);
      padding: 34px 24px;
      display: flex;
      gap: 8px;

      .rencai-total-icon {
        width: 81px;
        height: 60px;
      }
      .rencai-total-content {
        width: 0;
        flex: 1;
        .rencai-total-label {
          font-size: 14px;
          color: var(--bc-text-primary-color);
          line-height: 14px;
          margin-bottom: 18px;
        }
        .rencai-total-value-unit {
          display: flex;
          align-items: flex-end;
          gap: 4px;
        }
        .rencai-total-value {
          flex: 1;
          width: 0;
          font-size: 28px;
          font-family: DIN-Medium, DIN;
          font-weight: 500;
          color: var(--bc-text-highlight-color);
          line-height: 28px;
        }
        .rencai-total-unit {
          font-size: 14px;
          color: #05d2ff;
          color: var(--bc-text-highlight-color);
          line-height: 14px;
        }
      }
    }
    .rencai-title-table-data {
      height: 0;
      flex: 1;
      background-color: var(--bc-bg-color);
      padding: 10px 8px;
      display: flex;
      flex-direction: column;
      .rencai-title-table-heade-items {
        display: flex;
        gap: 16px;
        font-size: 14px;
        font-weight: bold;
        line-height: 14px;
        color: var(--bc-table-header-text-color);
        padding: 17px 15px;
        border: 1px solid var(--bc-table-header-border-color);
        background-color: var(--bc-table-header-bg-color);
        .rencai-title-text {
          width: 0;
          flex: 1;
        }
      }

      .rencai-title-table-list {
        height: 0;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        .rencai-title-table-item {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: var(--bc-table-body-text-color);
          line-height: 14px;
          padding: 21px 15px;
          cursor: pointer;
          &:nth-child(2n) {
            background-color: var(--bc-table-striped-bg-color);
          }
          .rencai-title-text {
            flex: 1;
            width: 0;
            color: var(--bc-text-primary-color);
          }
        }
        // .rencai-title-table-item-active {
        // }
      }
    }
  }
  .rencai-liebiao-right-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    .rencai-filter-content {
      padding: 16px 12px;
      background-color: var(--bc-bg-color);
      position: relative;
      .keyword-input-box {
        display: flex;
        align-items: center;
        position: absolute;
        z-index: 1000;
        .keyword-label {
          width: 74px;
          color: var(--bc-filter-label-text-color);
        }
      }
      :deep(.z-tiled-filters-select) {
        border-top: 1px solid var(--bc-filters-border-color);
      }
      :deep(.z-tiled-filters-pack) {
        color: var(--bc-filter-tips-text-color);
        .z-tabs-nav-icon {
          color: var(--bc-filter-tips-icon-color);
        }
      }
      :deep(.z-tiled-filters-top) {
        height: 30px;
      }
      :deep(.z-tiled-filters-title) {
        color: var(--bc-filter-label-text-color);
      }
      :deep(.z-tiled-filters-item) {
        border-bottom: 1px dashed var(--bc-filter-item-border-color);
        .z-tiled-filters-span {
          color: var(--bc-text-sub-color);
        }
        .z-tiled-filters-active {
          color: var(--bc-filter-tag-active-text-color);
          background-color: var(--bc-filter-tag-active-bg-color);
        }
        .z-tiled-filters-item-pack {
          color: var(--bc-filter-tips-text-color);
          .z-tabs-nav-icon {
            color: var(--bc-filter-tips-icon-color);
          }
        }
      }
      :deep(.z-tiled-filters-bottom) {
        .n-button {
          padding: 9px 23px;
        }
        .n-button--default-type {
          --n-text-color: var(--bc-filter-button-reset-color) !important;
          --n-text-color-hover: var(--bc-filter-button-reset-color-hover) !important;
          --n-text-color-pressed: var(--bc-filter-button-reset-color-hover) !important;
          --n-text-color-focus: var(--bc-filter-button-reset-color-hover) !important;
        }
        .n-button--primary-type {
          color: var(--bc-filter-button-search-color);
          background-color: #1492ff;
          .n-button__border,
          .n-button__state-border {
            border: 1px solid #1492ff;
          }
        }
      }
    }
    .rencai-list-data-groups {
      height: 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: var(--bc-bg-color);
      padding: 15px;
      .rencai-card-items {
        height: 0;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        position: relative;
        .rencai-avatar {
          position: absolute;
          width: 48px;
          height: 48px;
          right: 21px;
          top: 11px;
        }
        .rencai-card-item {
          width: 294px;
          height: 166px;
          background: var(--bc-rencai-card-bg-img) no-repeat center / contain;
          padding: 20px 16px;
          position: relative;
          .rencai-name {
            font-size: 18px;
            color: var(--bc-text-primary-color);
            line-height: 18px;
            margin-bottom: 10px;
          }
          .rencai-sex-nation-content {
            display: flex;
            gap: 10px;
            font-size: 14px;
            color: var(--bc-text-sub-color);
            line-height: 14px;
            margin-bottom: 17px;
            padding-right: 50px;
            .rencai-nation {
              width: 0;
              flex: 1;
            }
          }
          .rencai-company {
            font-size: 14px;
            color: var(--bc-text-sub-color);
            line-height: 14px;
            margin-bottom: 10px;
          }
          .rencai-title-gather {
            width: 100%;
            font-size: 14px;
            color: var(--bc-text-sub-color);
            line-height: 14px;
          }
          .rencai-label-gather {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 36px;
            background: var(--bc-rencai-card-labels-box-bg-color);
            border-radius: 0px 0px 4px 4px;
            border: 1px solid var(--bc-rencai-card-labels-box-border-color);
            display: flex;
            align-items: center;
            padding: 0 16px;

            .rencai-label-item {
              display: inline-block;
              padding: 3px 8px;
              background-color: var(--bc-rencai-label-bg-color);
              border: 1px solid var(--bc-rencai-label-border-color);
              font-size: 14px;
              color: var(--bc-rencai-label-text-color);
              line-height: 14px;

              border-radius: 2px;
              &:not(:last-child) {
                margin-right: 8px;
              }
            }
            .rencai-label-items {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              gap: 8px;
              .rencai-label-item {
                margin-right: unset;
              }
            }
          }
        }
      }
      .pager-wrapper {
        justify-content: flex-end;
        height: unset;
        margin-top: 12px;
        :deep(.z-pager-left) {
          color: var(--bc-text-primary-color);
        }
        :deep(.n-pagination-item--active) {
          color: var(--bc-pager-text-color-active) !important;
          background-color: var(--bc-pager-bg-color-active) !important;
        }
        :deep(.n-pagination-item) {
          &:not(
              [class~='n-pagination-item--disabled'],
              [class~='n-pagination-item--active']
            ):hover {
            color: var(--bc-pager-text-color-hover) !important;
            border: 1px solid var(--bc-pager-border-color-hover) !important;
          }
        }
        :deep(.n-base-selection) {
          &:not(.n-base-selection--disabled):hover .n-base-selection__state-border {
            border: 1px solid var(--bc-pager-border-color-hover);
          }
        }
        :deep(.n-input) {
          .n-input__input-el {
            caret-color: var(--bc-pager-text-color-hover);
          }
          &:not(.n-input--disabled):hover .n-input__state-border {
            border: 1px solid var(--bc-pager-border-color-hover);
          }
        }
      }
    }
  }
}
</style>
