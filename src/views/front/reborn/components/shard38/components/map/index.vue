<template>
  <div id="content_box" class="container-map">
    <div id="mapContainer" :style="{ width: `${global_width_scale * 100}%`, height: `${global_height_scale * 100}%` }"></div>
    <div v-if="currentCityName?.length > 0" class="back">
      <span @click="goProvince">{{ currentCityName[0] }}</span>
      <span v-if="currentCityName[1]" @click="goCity">{{ currentCityName[1] }}</span>
      <span v-if="currentCityName[2]">{{ currentCityName[2] }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import useBaseMap from './hook/useBaseMap'
import asd from './components/asd/index.vue'
import { render } from 'vue'
// import iconImg1 from '@/assets/img/IndustrialEnvironment/map-icon1.png'
// import iconImg2 from '@/assets/img/IndustrialEnvironment/map-icon2.png'
// import iconImg3 from '@/assets/img/IndustrialEnvironment/map-icon3.png'

interface Props {
  // 市级的hover展示的弹窗信息
  showTooltipList?: { [key: string]: { title: string; value: string; unit: string }[] }
  centerValueList?: any
  // 市级的自定义点的图片dom字符串
  customImgDom?: string
  // 是否 控制自定义点的列表中的 相同位置的点 做一定偏移
  // openShifting?: boolean
  // 区县级别的自定义展示点的列表
  lngLatList?: any[]
  // 地图配置项
  mapOptions?: AMap.MapOptions
  // 地区码，配置可更改当前展示的地图块
  adcode?: number
  // 是否下钻
  isDeep?: boolean
  // 是否打开默认的鼠标滑动以及hover事件
  openDefaultMouseMoveHover?: boolean
  // sciPlatform?: boolean
  // 官网生成的map样式，找设计要，官网：https://geohub.amap.com/mapstyle/index
  mapStyle?: any
  // 自定义的option选项，可以控制地图是否缩放等内容
  mapOptionsCustom?: any
}
const props = withDefaults(defineProps<Props>(), {
  isDeep: true,
  // sciPlatform: false,
  adcode: 330000, // 浙江省
  openDefaultMouseMoveHover: true,
  mapOptions: () => ({
    // center: [12517249.610825334, 3648741.0920981606], // 飞入的位置 使用不存在点会导致大量控制台资源获取的报错
    // center: [169.978959, 60.27365], // 飞入动画的起点位置
    // center: [121.500419, 31.238089], // 飞入动画的起点位置
    adcode: 330000,
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
    outerBorderColor: '#6ca3c6', // 外层线的颜色颜色
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

const emit = defineEmits<{ (e: 'handelCityChange', value: string): void; (e: 'backProvince'): void; (e: 'customPointClick', value: string): void }>()
let hoverTipMaker: any = null
let renderStatus = false
const global_width_scale = inject('global_width_scale', 1) as number
const global_height_scale = inject('global_height_scale', 1) as number
// 这个字段用来存放当前选中的区县，同时用于区分当前地图展示的级别是市级还是区县级
const currentCityName = ref(['浙江省', '', ''])
const currentAdCode = ref(['330000', '', ''])
const maxValue = ref(0)
let anIndex = ref(0)
const timer = ref('')
const subFeaturesInfosList = ref([])
//当前聚焦的区域
const currentAreaNode: any = ref(null)
const {
  map,
  _loadAreaNode,
  _renderlayer,
  districtExplorer,
  heatmap,
  tipMarkers,
  tipSubMarkers,
  mapShowTitle,
  // mapShowDongYangTitle,
  _createMap,
  addHeat
} = useBaseMap('mapContainer', { ...props.mapOptions, ...props.mapOptionsCustom })

type Resize = () => void
const resizeMap = inject('resize', () => {
  console.log(123)
}) as Resize
// 下钻方法
const goProvince = () => {
  currentCityName.value[1] = ''
  currentCityName.value[2] = ''
  currentAdCode.value[2] = ''
  currentAdCode.value[1] = ''
  _renderDistrictArea(currentAdCode.value[0], 40000, 'province', currentAdCode.value[0])
  emit('handelCityChange', currentCityName.value, 'province')
}
const goCity = () => {
  currentCityName.value[2] = ''
  currentAdCode.value[2] = ''
  _renderDistrictArea(currentAdCode.value[1], 40000, 'city', currentAdCode.value[1])
  emit('handelCityChange', currentCityName.value, 'city')
}

/** 地图操作
 * ---------------------------------------------------------------------------------------------------------------------------------------
 */
// 地图点击
const handleFeatureClick = async (e: any, feature: any) => {
  // 在限制isDeep时为true时继续下钻
  if (!props.isDeep) return
  const { level, adcode: _adcode, name } = feature.properties
  // 清空弹窗内容
  if (hoverTipMaker) {
    hoverTipMaker.setMap(null)
  }
  // 赋值
  if (level === 'city') {
    if (currentCityName.value[1] === name) return
    currentCityName.value[2] = ''
    currentCityName.value[1] = name
    currentAdCode.value[2] = ''
    currentAdCode.value[1] = _adcode
  } else if (level === 'district') {
    if (currentCityName.value[2] === name) return
    currentCityName.value[2] = name
    currentAdCode.value[2] = _adcode
  }
  emit('handelCityChange', currentCityName.value, level)
  await nextTick()
  // 加载某个区域的浏览-------------------------下钻暂时取消
  _renderDistrictArea(_adcode, 40000, level, name)
}
// 鼠标悬浮
const handleFeatureMouseoverAndOut = (e: any, feature: any) => {
  // 展开区县级别地图时不展示此级别的悬浮框
  if (currentCityName.value[2]) return
  const isHover = e.type === 'featureMouseover' || e.type === 'featureMousemove'
  const { adcode: _adcode, level, name } = feature.properties

  
  const theHtml = h(asd, {
    title: '我裂开了'
  })
  const divElement = document.createElement('div');
  // render(theHtml, document.body)
  render(theHtml, divElement)
  const html = theHtml.el?.outerHTML


  hoverTipMaker.setContent(html)
  const polys = districtExplorer.value.findFeaturePolygonsByAdcode(_adcode)
  polys.forEach((item: any) => {
    item.setOptions({
      cursor: level === 'city' ? 'default' : 'pointer',
      fillOpacity: isHover ? 0.35 : 1
    })
  })
  hoverTipMaker.setMap(isHover ? map.value : null)
}
// 开始distroctExplorer监听事件
const featureListener = () => {
  // 监听feature的点击事件
  districtExplorer.value.on('featureClick', handleFeatureClick)
  // 监听feature的hover事件
  props.openDefaultMouseMoveHover && districtExplorer.value.on('featureMouseout featureMouseover', handleFeatureMouseoverAndOut)
  // 监听鼠标在feature上滑动
  props.openDefaultMouseMoveHover && districtExplorer.value.on('featureMousemove', handleFeatureMouseMove)
}
// 获取位置在滑动时动态计算位置来显示弹窗的方法
const handleFeatureMouseMove = (e: { originalEvent: any; originEvent: any }, feature?: any) => {
  // 展开区县级别地图时不展示此级别的悬浮框
  if (currentCityName.value[2]) return
  if (!hoverTipMaker.getMap()) {
    handleFeatureMouseoverAndOut(e, feature)
  }
  const originalEvent = e.originalEvent || e.originEvent
  const { x, y } = originalEvent.pixel
  const content = hoverTipMaker.getContent()
  if (!content) return
  const strArr = content.match(/(id="=?)(\S*)(?=")/)
  const id = strArr[strArr.length - 1]

  const Ele = document.getElementById(id) as HTMLElement
  const anchor = getPointOffset('mapContainer', Ele.clientWidth, Ele.clientHeight, x, y)
  hoverTipMaker.setPosition(originalEvent.lnglat)
  hoverTipMaker.setAnchor(anchor)
  
  if (anchor.includes('top')) {
    hoverTipMaker.setOffset(new window.AMap.Pixel(0, 20))
  } else if (anchor.includes('bottom')) {
    hoverTipMaker.setOffset(new window.AMap.Pixel(0, -10))
  }
}
const getPointOffset = (dom: string, width: number, height: number, x: number, y: number): string => {
  const { clientWidth } = document.getElementById(dom) as HTMLElement
  let horizontal = 'center'
  let vertical = 'bottom'
  if (x < width) {
    horizontal = 'left'
  } else if (clientWidth - x < width) {
    horizontal = 'right'
  }
  // console.log(height,y);

  if (y < height) {
    vertical = 'top'
  }
  return `${vertical}-${horizontal}`
}
// 使用根据adcode获取的areaNode数据来渲染区域浏览
const _renderAreaNode = async (areaNode: any, name: string, level: string) => {
  // 清除已经有的地图
  districtExplorer.value.clearFeaturePolygons()
  const { outerBorderColor, outerBorderWidth, innerBorderColor, innerBorderWidth } = props.mapStyle
  const subFeaturesInfos: Array<any> = []
  // 不加这里有个报错
  if (!areaNode) return
  districtExplorer.value.renderSubFeatures(areaNode, (feature: any) => {
    const { name, centroid, center } = feature.properties
    // 有的没有centroid坐标
    subFeaturesInfos.push({ name, lngLat: centroid || center })
    // 子级的区划绘制
    return {
      cursor: 'pointer',
      bubble: true,
      zIndex: -1,
      strokeColor: innerBorderColor, // 线颜色
      strokeOpacity: 1, // 线透明度
      strokeWeight: innerBorderWidth, // 线宽
      fillColor: 'transparent', // 填充色 (此处透明为了显示下方受光模块渐变的效果)
      fillOpacity: 1 // 填充透明度
    }
  })
  // 初始化点标记
  const _tipMarkers = tipMarkers
  const _tipSubMarkers = tipSubMarkers
  Object.keys(_tipMarkers).forEach((item) => {
    const markName = `${item}-name`
    const boardName = `${item}-board`
    if (_tipMarkers[item]) {
      _tipMarkers[item].setMap(null)
      _tipMarkers[item] = null
    }
    if (_tipMarkers[markName]) {
      _tipMarkers[markName].setMap(null)
      _tipMarkers[markName] = null
    }
    if (_tipMarkers[boardName]) {
      _tipMarkers[boardName].setMap(null)
      _tipMarkers[boardName] = null
    }
  })
  Object.keys(_tipSubMarkers).forEach((item) => {
    if (_tipSubMarkers[item]) {
      _tipSubMarkers[item].setMap(null)
      _tipSubMarkers[item] = null
    }
  })

  // 保存市级区域的中心点信息
  if (!currentCityName.value[2]) {
    subFeaturesInfosList.value = subFeaturesInfos
  }
  setMapShowTitle(name, level)

  // 绘制父级区划
  districtExplorer.value.renderParentFeature(areaNode, {
    cursor: 'pointer',
    bubble: true,
    zIndex: -1,
    strokeColor: 'outerBorderColor', // 线颜色
    fillColor: 'transparent', // 填充色 (此处透明为了显示下方受光模块渐变的效果)
    strokeWeight: outerBorderWidth // 线宽
  })
}
function setMapShowTitle(name?: string, level: stirng) {
  if (!props.centerValueList.list?.length > 0) return
  anIndex.value = 0
  maxValue.value = 0
  clearInterval(timer.value)
  timer.value = ''
  let setName = name || currentCityName.value[2] || currentCityName.value[1] || currentCityName.value[0]

  const filterListItem = (l, n) => {
    let res = 0
    l.forEach((item) => {
      item.name === n && (res = item.value)
    })
    return res
  }
  const filterUnitItem = (l, n) => {
    let res = ''
    l.forEach((item) => {
      item.name === n && (res = item.unit)
    })
    return res
  }
  console.log(name)

  // 使用市级区域保存的中心点信息
  if (currentCityName.value[2]) {
    let curItem = null
    subFeaturesInfosList.value.forEach((item) => {
      props.centerValueList.list.forEach((it) => {
        if (it.name === item.name) {
          maxValue.value = Math.max(maxValue.value, it.value)
        }
      })
      if (item.name === setName) {
        curItem = item
      }
    })
    mapShowTitle({ ...curItem, value: filterListItem(props.centerValueList.list, curItem.name) }, 1, maxValue.value)
  } else {
    // 展示 各区县名称
    subFeaturesInfosList.value.forEach((item) => {
      props.centerValueList.list.forEach((it) => {
        if (it.name === item.name) {
          maxValue.value = Math.max(maxValue.value, it.value)
        }
      })
    })
    subFeaturesInfosList.value.forEach((item, index) => {
      mapShowTitle(
        { ...item, value: filterListItem(props.centerValueList.list, item.name), unit: filterUnitItem(props.centerValueList.list, item.name) },
        index + 1,
        maxValue.value
      )
    })
  }
  // 循环显示boar信息板的样式
  intervalMark()
  // if (level !== 'district')
  //   timer.value = setInterval(() => {
  //   intervalMark()
  // }, 2000)
}
function intervalMark() {
  if (Object.keys(tipMarkers).length === 0) return
  const list = []
  Object.keys(tipMarkers).forEach((key) => {
    if (key.indexOf('-board') !== -1 && tipMarkers[key]) list.push(key)
  })
  const length = list.length
  anIndex.value++
  list.forEach((key, index) => {
    if (anIndex.value <= length) {
      if (anIndex.value - 1 === index) {
        tipMarkers[key].show()
      } else tipMarkers[key].hide()
    }
  })
  if (anIndex.value === length) {
    anIndex.value = 0
  }
}
// 初始化区域浏览
const _renderDistrictArea = async (_adcode: number, cityHight = 40000, level: string, name: string) => {
  // 初始化区域前，热力图数据返回前，清空现有热力图数据
  if (heatmap.value) {
    heatmap.value.destroy()
  }
  // 加载某个区域的浏览
  const areaNode = await _loadAreaNode(_adcode)
  //设置当前使用的定位用节点
  districtExplorer.value.setAreaNodesForLocating([areaNode])
  // districtExplorer.value.setAreaNodesForLocating([_adcode])
  currentAreaNode.value = areaNode
  // 渲染areaNode 父级区域 子级区域 颜色/边颜色
  _renderAreaNode(areaNode, name, level)
  // 根据覆盖物范围调整视野
  map.value.setFitView()
  // map.value.setFitView(districtExplorer.value.getAllFeaturePolygons(), false, [0, 75, 30, 30])
  // 添加图层
  _renderlayer({ areaNode, cityHight, level })
}
const initMap = async () => {
  await _createMap()
  renderStatus = true
  // 初始化鼠标hover提示内容弹窗Marker
  hoverTipMaker = new window.AMap.Marker({
    content: undefined,
    offset: new window.AMap.Pixel(0, -10),
    bubble: true,
    topWhenClick: true // 鼠标点击时marker是否置顶，默认false ，不置顶
  })
  featureListener()
  await _renderDistrictArea(props.adcode, 40000, 'city', currentAdCode.value[1])
  // addHeat()
}
watch(
  () => props.lngLatList,
  () => {
    nextTick(() => {
      if (!renderStatus) {
        return
      }
      if (heatmap.value) {
        heatmap.value.destroy()
      }
      props.lngLatList?.length > 0 && addHeat(props.lngLatList)
    })
  },
  {
    deep: true
    // immediate: true
  }
)
watch(
  () => props.centerValueList,
  () => {
    if (!renderStatus) {
      return
    }
    if (props.centerValueList.list?.length > 0) {
      setMapShowTitle()
    }
  },
  {
    deep: true,
    immediate: true
  }
)
onMounted(() => {
  nextTick(() => {
    resizeMap()
    initMap()
  })
})
</script>
<style lang="less">
.mapInfoWindow {
  padding: 5px;
  font-size: 12px;
  color: #fff7ed;
  border-radius: 5px;
  // padding-right: 20px;
  // background: url('~@/assets/img/infowin_country_bg.png') 100% no-repeat;
}
</style>
<style scoped lang="less">
.container-map {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
<style lang="less">
#mapContainer {
  width: 100%;
  height: 100%;
  background-image: none;
  background-color: transparent !important;
  // position: absolute;
}

.map-img {
  width: 66px;
  height: 66px;
  position: relative;
  top: 40px;
}

.amap-logo {
  visibility: hidden;
}

.amap-copyright {
  visibility: hidden;
}
.frame-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.map-content {
  z-index: 20;
  // min-width: 179px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  padding: 16px;
  color: #283951;
  text-align: left;

  .title {
    margin-bottom: 12px;
    line-height: 14px;
    font-size: 14px;
    font-family: MicrosoftYaHeiUI;
    word-break: break-all;
  }
  .list-item {
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      &.unit {
        margin-left: 5px;
      }
      &:nth-of-type(2) {
        color: #001532ff;
      }
    }
  }
}
.triangle {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(255, 255, 255, 0.9);
}

// 返回按钮样式
.back {
  position: absolute;
  display: flex;
  left: 0;
  top: 46px;

  span {
    position: relative;
    display: inline-block;
    width: 93px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-family: MicrosoftYaHeiUI;
    color: #b7e7ff;
    text-align: center;
    // background: url('@/assets/img/com/map/area-bg-1.png') no-repeat center;
    background-size: 100% 100%;
    cursor: pointer;

    &:nth-child(2) {
      // background-image: url('@/assets/img/com/map/area-bg.png');
      left: -10px;
      cursor: default;
    }
    &:nth-child(3) {
      // background-image: url('@/assets/img/com/map/area-bg.png');
      left: -20px;
      cursor: default;
    }
  }
}
.center-part {
  position: absolute;
  top: 0px;
  // margin: 0 auto;
  width: 975px;
  height: 956px;
}
.prism-content {
  /* 柱形下部分颜色+柱形底部菱形 */
  --bar-bg: #ff8f411a;
  /* 柱形上部分颜色 */
  --bar-shape: #fddb84ff;
  /* 柱形顶部菱形颜色 */
  --bar-top: #ffeab3ff;
  /* 柱形左侧顶部颜色 */
  --bar-left-top: #dda20aff;
  /* 柱形左侧底部颜色 */
  --bar-left-bottom: #ff8f4100;
  /* 柱形线条颜色 */
  --bar-line: rgba(0, 0, 0, 0.1);
  /* clip-path裁剪菱形 */
  --path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  --path-bottom: polygon(50% 50%, 100% 50%, 50% 100%, 0% 50%);
  /* 柱形宽度 */
  --w: 16px;
  /* 柱形高度最大值 */
  --h: 200px;
  /* clip-path左侧裁剪菱形 */
  --path-left: polygon(-0% -0%, 100% -0%, 100% 100%, 40% 100%);
  /* clip-path右边侧裁剪菱形 */
  --path-right: polygon(-300% -400%, 100% -5%, 90% 100%, 10% 100%);

  .prism-item-out {
    /* 柱形下部分颜色+柱形底部菱形 */
    --bar-bg: #ffeab370;
    /* 柱形上部分颜色 */
    --bar-shape: #ffeab370;
    /* 柱形顶部菱形颜色 */
    --bar-top: #c1b896ff;
    /* 柱形左侧顶部颜色 */
    --bar-left-top: #dda20a5e;
    /* 柱形左侧底部颜色 */
    --bar-left-bottom: #ff8f4100;
    /* clip-path右边侧裁剪菱形 */
    --path-right: polygon(-300% -400%, 100% -5%, 92% 100%, 4% 100%);
    z-index: 3;
  }
  .prism-item {
    position: absolute;
    left: 3px;
    top: calc(var(--height) * -1);
    width: var(--w);
    transform: translate(-50%, 0px);
    height: var(--height);
    background: linear-gradient(to top, var(--bar-bg), var(--bar-shape));
    // clip-path: var(--path-right);
    i {
      position: absolute;
      width: var(--w);
      height: calc(var(--w) / 2);
      clip-path: var(--path-bottom);
      left: 0;
      bottom: calc(var(--w) * -0.5);
      background: linear-gradient(-90deg, var(--bar-left-bottom) 0%, var(--bar-bg) 100%);
      /* 层级置于最上层 */
      z-index: 2;
      transform: translateY(-50%);
    }
  }
  .prism-item:hover {
    .prism-board {
      display: block;
    }
  }

  .prism-item:last-child {
    margin-right: 0;
  }

  /* bar添加前后伪元素，设置为clip-path裁剪后的菱形 */
  .prism-item::before {
    content: '';
    position: absolute;
    width: var(--w);
    height: calc(var(--w) / 2);
    clip-path: var(--path);
    left: 0;
    top: 0;
    background: var(--bar-top);
    /* 层级置于最上层 */
    z-index: 2;
    transform: translateY(-50%);
  }

  .prism-item::after {
    content: '';
    position: absolute;
    left: 0;
    top: calc(var(--height) * -0.5);
    z-index: 1;
    width: calc(var(--w) / 2);
    height: calc(var(--height));
    background: linear-gradient(to top, var(--bar-left-bottom), var(--bar-left-top));
    transform: translateY(50%);
    // clip-path: var(--path-left);
  }

  .prism-item span {
    position: absolute;
    width: 1px;
    height: 100%;
    left: 50%;
    top: 0;
    box-shadow: -1px 0px 1px rgba(0, 0, 0, 0.2);
  }
}
.prism-board {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  z-index: 2;
  padding: 10px 14px;
  background: linear-gradient(90deg, rgba(0, 41, 85, 0.94) 0%, rgba(0, 49, 86, 0.94) 99%);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  border: 1px solid;
  border-image: linear-gradient(159deg, rgba(57, 217, 219, 1), rgba(3, 89, 148, 1)) 1 1;
  transform: translate(-50%, calc(var(--height) * -1 - 43px - 12px));
  width: 200px;
  background: linear-gradient(89deg, rgba(0, 36, 82, 0.9) 0%, #002247 100%);
  border-radius: 6px;
  border: 1px solid rgba(75, 181, 235, 0.7);
  backdrop-filter: blur(0px);

  .prism-board-content {
    // display: flex;
    // justify-content: space-between;
    .prism-board-content-title {
      font-size: 14px;
      font-family: MicrosoftYaHeiUI;
      color: #ffffff;
      margin-bottom: 8px;
    }
    .prism-board-content-num {
      font-size: 14px;
      font-family: MicrosoftYaHeiUI;
      color: #ffffff;
    }
  }
}
</style>
