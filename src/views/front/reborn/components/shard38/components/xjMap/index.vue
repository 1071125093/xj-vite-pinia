<script lang="ts" setup>
import useBaseMap from './utils/useBaseMap'
import { Props } from './types'

// #region ********** 库&组件等引入 start **************/
// #endregion ******* 库&组件等引入 ~end~ **************/

// #region ********** define区域 start **************/

const props = withDefaults(defineProps<Props>(), {
  isDeep: true,
  adcode: 330000, // 浙江省
  openDefaultMouseMoveHover: true,
  mapOptions: () => ({
    // center: [12517249.610825334, 3648741.0920981606], // 飞入的位置 使用不存在点会导致大量控制台资源获取的报错
    // center: [169.978959, 60.27365], // 飞入动画的起点位置
    // center: [121.500419, 31.238089], // 飞入动画的起点位置
    // zoom: 17, // 这个没用
    zooms: [7.6, 40], // 用这个（会影响下级区县级别地图的缩放大小）
    zoomEnable: false,
    dragEnable: false,
    rotateEnable: false,
    pitchEnable: false,
    pitch: 34,
    animateEnable: false, // 地图平移过程中是否使用动画
    // mapStyle: 'amap://styles/efa8212d6972933730ec583ef314bf09', // 可能是湖北或者和田
    // mapStyle: 'amap://styles/ef758899b87310263a68d3d68324c81d', // 产业雷达
    // mapStyle: 'amap://styles/4eee52d358907721115d6546de8f67ff', // 省经信
    mapStyle: 'amap://styles/4eee52d358907721115d6546de8f67ff',
    viewMode: '3D',
    showLabel: false,
    moveMap: false,
    openShifting: false,
    features: ['bg', 'building', 'point'] // 去除边界线
  }),
  showTooltipList: () => {
    return {}
  },
  centerValueList: () => {
    return {
      inProvinceNum: '',
      list: [
        {
          name: '杭州市',
          value: 981.38,
          unit: '亿元'
        },
        {
          name: '宁波市',
          value: 72.18,
          unit: '亿元'
        },
        {
          name: '温州市',
          value: 46.7,
          unit: '亿元'
        },
        {
          name: '嘉兴市',
          value: 22.3,
          unit: '亿元'
        },
        {
          name: '湖州市',
          value: 115.93,
          unit: '亿元'
        },
        {
          name: '绍兴市',
          value: 302.23,
          unit: '亿元'
        },
        {
          name: '金华市',
          value: 153.93,
          unit: '亿元'
        },
        {
          name: '衢州市',
          value: 19.29,
          unit: '亿元'
        },
        {
          name: '舟山市',
          value: 2.47,
          unit: '亿元'
        },
        {
          name: '台州市',
          value: 370.43,
          unit: '亿元'
        },
        {
          name: '丽水市',
          value: 19.94,
          unit: '亿元'
        }
      ]
    }
  },
  lngLatList: () => {
    return []
  },
  customImgDom: '',
  mapStyle: () => ({
    // outerBorderColor: '#6ca3c6', // 外层线的颜色颜色
    outerBorderColor: 'red', // 外层线的颜色颜色
    outerBorderWidth: 2.5, // 外层线的宽度
    innerBorderColor: '#C6DFF9', // 内层线的颜色颜色
    innerBorderWidth: 1.5 // 内层线的宽度
  }),
  mapOptionsCustom: () => {
    return {
      dragEnable: false,
      zoomEnable: false
    }
  }
})
// #endregion ******* define区域 ~end~ **************/

// #region ********** 我在cv，很麻木 start **************/
const {
  mapRef,
  _loadAreaNode,
  _renderlayer,
  districtExplorer,
  heatmap,
  tipMarkers,
  tipSubMarkers,
  mapShowTitle,
  _createMap,
  initTipMaker,
  _renderDistrictArea,
  handleFeatureClick,
  handleFeatureMouseoverAndOut,
  handleFeatureMouseMove
} = useBaseMap(
  {
    ...props.mapOptions,
    ...props.mapOptionsCustom
  },
  props
)
// #endregion ******* 我在cv，很麻木 ~end~ **************/

// #region ********** 执行-赋予-地图点击交互 start **************/
// 开始distroctExplorer监听事件
const featureListener = () => {
  // 监听feature的点击事件
  districtExplorer.base.on('featureClick', handleFeatureClick)
  // 监听feature的hover事件
  props.openDefaultMouseMoveHover && districtExplorer.base.on('featureMouseout featureMouseover', handleFeatureMouseoverAndOut)
  // 监听鼠标在feature上滑动
  // props.openDefaultMouseMoveHover && districtExplorer.base.on('featureMousemove', xjGogo)
  props.openDefaultMouseMoveHover && districtExplorer.base.on('featureMousemove', handleFeatureMouseMove)
}
// #endregion ******* 执行-赋予-地图点击交互 ~end~ **************/

// #region ********** 我也不知道这里是什么，我是sb start **************/

// #endregion ******* 我也不知道这里是什么，我是sb ~end~ **************/

// #region ********** 初始化相关 start **************/
/** 开始初始化 */
const startInit = async () => {
  await _createMap()
  initTipMaker()
  // 初始化鼠标hover提示内容弹窗Marker

  featureListener()
  await _renderDistrictArea(props.adcode, 40000, 'city', districtExplorer.currentAdCode[1])
}
onMounted(() => {
  nextTick(() => {
    startInit()
  })
})
// #endregion ******* 初始化相关 ~end~ **************/
// #region ********** 通用部分 start **************/
// #endregion ******* 通用部分 ~end~ **************/
</script>
<template>
  <div class="base-map-container">
    <div class="base-map" ref="mapRef" id="1006411"></div>
    <div class="xj-room">
    </div>
  </div>
</template>
<style lang="less" scoped>
.base-map-container {
  position: relative;
}
.base-map {
  width: 100%;
  height: 100%;
}
.xj-room {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
