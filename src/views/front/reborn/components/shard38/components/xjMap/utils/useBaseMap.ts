/**
 * @Author: XiaoJun
 * @Date: 2023-07-04 20:42:44
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-09-21 16:19:53
 * @Description: 我是地图的hooks层，只知道怎么做，不知道用在哪
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/components/xjMap/utils/useBaseMap.ts
 */

import AMapLoader from '@amap/amap-jsapi-loader'
import { reactive, render, shallowRef } from 'vue'
import boardCard from '../components/boardCard.vue'
import mapTooltip from '../components/mapTooltip.vue'
import prismContent from '../components/prismContent.vue'
import { TheEmits } from '../index.vue'
import { Props } from '../types'
import { getHtmlByVNode } from './common'
import side from './side.png'

export default function useBaseMap(mapOptions: AMap.MapOptions, props: Omit<Props, 'mapOptions'>, emits: TheEmits) {
  const mapRef = ref()
  // const map = ref()
  const map: any = shallowRef(null)
  // let mapLoca: { add: (arg0: any) => void; animate: { start: () => void; }; }
  const mapLoca: any = shallowRef(null)
  const tipMarkers: any = reactive({})
  const tipSubMarkers: any = reactive({})
  const boundLinelayerTop: any = shallowRef(null)
  const boundLinelayerBottom: any = shallowRef(null)
  const boundPolygonLayer: any = shallowRef(null)
  const pluseLineLayer: any = shallowRef(null)
  const pluseLineLayer1: any = shallowRef(null)
  const prismLayer: any = shallowRef(null)
  const heatmap: any = shallowRef(null)
  /** 异步创建地图 */
  const _createMap = async () => {
    return new Promise((resolve) => {
      AMapLoader.load({
        key: '121f83178898edf35b075ee4e4980b49', // 申请好的Web端开发者Key，首次调用 load 时必填
        // key:"9ff74af1cfa9a4b78433149e22f1f0ec", // 产业雷达
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Marker', 'AMap.ElasticMarker'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1' // AMapUI 版本
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0' // Loca 版本
        }
      }).then(async (amap) => {
        window.AMap = amap

        map.value = new window.AMap.Map(mapRef.value, mapOptions)
        await window.AMapUI.load(['ui/geo/DistrictExplorer'], (DistrictExplorer: any) => {
          districtExplorer.base = new DistrictExplorer({
            map: map.value,
            eventSupport: true,
            preload: [props.adcode] //预加载
          } as AMap.DistrictExplorerOptions)
          resolve(districtExplorer.base)
        })
      })
    })
  }
  // 展示地图各地区中心点的标记及其名称
  const mapShowTitle = (
    item: { lngLat: any; name: string | number | symbol; value?: number; unit: string },
    index: number,
    maxValue: number = 300
  ) => {
    // eslint-disable-next-line prefer-const
    let { lngLat, name, value, unit }: { lngLat: Array<number>; name: keyof typeof tipSubMarkers; value?: number; unit: string } = item
    const markName = `${name as unknown as string}-name`
    // part1: 区域名称模块： markName
    if (tipMarkers[markName]) {
      tipMarkers[markName].setMap(null)
    }
    const ratio = value / maxValue || 0
    const prismHeight = 170 * ratio
    // 调整位置控制name不要展示重合
    const textValue = `top: ${prismHeight ? '14px' : '-7px'};left: -${(String(name).length * 16) / 2 - 4 - (String(name).length - 1)}px;`

    tipMarkers[markName] = new window.AMap.Marker({
      content: `<div
        style="
          position: absolute;
          z-index: -1;
          ${textValue}
          width: ${String(name).length * 17}px;
          font-size: 16px;
          font-family: MicrosoftYaHeiUI;
          color: #B4D6FF;
          line-height: 16px;
          letter-spacing: 1px;
          text-shadow: 0px 2px 5px rgba(0,0,0,0.5);
        "
      >
        ${String(name)}
      </div>`,
      offset: new window.AMap.Pixel(0, 0),
      bubble: true,
      anchor: 'center',
      zIndex: 10
    })

    tipMarkers[markName].setPosition(lngLat)
    tipMarkers[markName].setMap(map.value)

    // part2: 柱形图信息模块
    if (tipMarkers[name]) {
      tipMarkers[name].setMap(null)
    }
    // 没有数据的不展示柱形图以及信息板
    if (!value) return
    const prismHtml = getHtmlByVNode(
      h(prismContent, {
        prismHeight
      })
    )
    tipMarkers[name] = new window.AMap.Marker({
      content: prismHtml,
      offset: new window.AMap.Pixel(0, 0),
      bubble: false,
      anchor: 'center',
      topWhenClick: true,
      clickable: true,
      zIndex: 1000,
      position: lngLat,
      map: map.value
    })
    // 监听feature的点击事件
    tipMarkers[name].on('mouseover', () => {
      Object.keys(tipMarkers).forEach((key) => {
        if (key.includes('-board')) {
          tipMarkers[key].hide()
        }
      })
      // 点击时展示信息板board
      tipMarkers[boardName].show()
    })

    // part3: 信息板模块
    const boardName = `${name as string}-board`
    if (tipMarkers[boardName]) {
      tipMarkers[boardName].setMap(null)
    }
    const boardCardHtml = getHtmlByVNode(
      h(boardCard, {
        prismHeight,
        name: name as string,
        value,
        unit
      })
    )
    tipMarkers[boardName] = new window.AMap.Marker({
      content: boardCardHtml,
      offset: new window.AMap.Pixel(0, 0),
      bubble: false,
      anchor: 'center',
      topWhenClick: true,
      zIndex: 5000,
      position: lngLat as any,
      map: map.value,
      visible: false
    })
  }
  // 线图层及动画图层所需数据
  const boundLinelayerDataSet = (areaNode: any) => {
    const parentFeature = areaNode.getParentFeature()
    const {
      geometry: {
        coordinates: [[boundCoords]]
      },
      properties
    } = parentFeature

    // LocaLoader().then(async (Loca: any) => {
    const data = new window.Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties,
            geometry: {
              type: 'LineString',
              coordinates: boundCoords
            }
          }
        ]
      }
    })
    return data
    // })
  }
  // 创建线图层
  const setboundLinelayer = ({ areaNode, styleOption = { altitude: 5 } }: { areaNode: any; styleOption?: Loca.PulseLineLayer.StyleOptions }) => {
    /**
     * @param {Object} areaNode  //哪个城市的线条
     * @param {Object} styleobj  //线条颜色
     * @param {Object} altitude //偏移量
     */
    const data = boundLinelayerDataSet(areaNode)
    const boundLinelayer = new window.Loca.LineLayer({
      loca: mapLoca.value,
      zIndex: 10
    })
    boundLinelayer.setSource(data)
    // 样式
    boundLinelayer.setStyle({
      color: '#C6DFF9',
      lineWidth: 3,
      ...styleOption
    })

    mapLoca.value.add(boundLinelayer)
    return boundLinelayer
  }

  // 创建动画图层
  const setPluseLineLayer = ({ areaNode, styleOption = {} }: { areaNode: any; styleOption?: Loca.PulseLineLayer.BothOptions }) => {
    const { zIndex } = styleOption
    const data = boundLinelayerDataSet(areaNode)
    const pulseLineLayer = new window.Loca.PulseLineLayer({
      zIndex: zIndex || 100,
      opacity: 1,
      visible: true
    })
    pulseLineLayer.setSource(data)
    // 样式
    const innerOption: Loca.PulseLineLayer.BothOptions = {
      lineWidth: 0,
      // headColor: 'rgba(125, 234, 255,0.2)',
      trailColor: 'rgba(0,0,0,0)',
      interval: 0.5,
      altitude: 5,
      duration: 30000,
      ...styleOption
    }
    pulseLineLayer.setStyle(innerOption)
    if (prismLayer.value) {
      prismLayer.value.show(500)
      prismLayer.value.addAnimate({
        key: 'height',
        value: [0, 1],
        duration: 500,
        easing: 'Linear',
        transform: 2000,
        random: true,
        delay: 8000
      })
    }
    mapLoca.value.add(pulseLineLayer)
    mapLoca.value.animate.start()
    return pulseLineLayer
  }
  // 创建3d图层
  const setboundPolygonLayer = (areaNode: any, cityHight: number) => {
    if (boundPolygonLayer.value) {
      boundPolygonLayer.value.destroy()
    }
    // 当需要渲染最后一级时，不存在lngLatSubList，使用lngLatParent来渲染当前层
    const { lngLatSubList, lngLatParent } = areaNode._data.geoData
    if (!lngLatSubList && !lngLatParent) {
      return
    }
    /**
     * @param {Object} areaNode  //哪个城市的3d地图
     * @param {number} cityHight //高度
     */
    // 设置地图的数据
    const geo = new window.Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: lngLatSubList ? [...lngLatSubList] : [lngLatParent]
      }
    })
    // 侧边围栏样式
    const _boundPolygonLayer = new window.Loca.PolygonLayer({
      zIndex: 20,
      opacity: 1,
      cullface: 'none',
      shininess: 10,
      hasSide: true
    } as Loca.PolygonLayer.LayerOptions)
    _boundPolygonLayer.setSource(geo)
    // 样式
    _boundPolygonLayer.setStyle({
      // hover后显示的颜色
      // topColor() {
      //   return '#1b547cFF'
      // },
      // sideTopColor() {
      //   return '#1b547cFF'
      // },
      // sideBottomColor() {
      //   return '#04143C'
      // },
      topColor() {
        return '#234889'
      },
      sideTopColor() {
        return 'blue'
      },
      sideBottomColor() {
        return 'green'
      },
      // 地图厚度
      height() {
        return cityHight
      },
      altitude: 0 - cityHight // 地图偏移量
      // texture: side // 我和sideTopColor，sideBottomColor二选一
    } as Loca.PolygonLayer.StyleOptions)
    mapLoca.value.add(_boundPolygonLayer)
    return _boundPolygonLayer
  }
  function addLight(level: string) {
    let centerPoint = mapLoca.value.getCenter()
    let addLength = 0
    switch (level) {
      case 'city':
        addLength = 0.8
        break
      case 'province':
        addLength = 0
        break
      case 'district':
        addLength = 1.1
        break
    }
    centerPoint = [centerPoint[0] + 0.3385, centerPoint[1] + 5.908921 - addLength, 2800]
    mapLoca.value.pointLight = {
      color: '#202642',
      position: centerPoint,
      intensity: 1000,
      // 距离表示从光源到光照强度为 0 的位置，0 就是光不会消失。
      distance: 900000
    }
    mapLoca.value.dirLight.position = [0, 0, 0]
    mapLoca.value.ambLight.color = '#3e98b5'
    mapLoca.value.ambLight.intensity = 0.7
  }

  /**
   * @description: 热力图
   * https://lbs.amap.com/api/loca-v2/api#heatmaplayer
   * @param {*} pointList
   */
  function addHeat(pointList = [{ count: 10, coordinates: [120.22047498787455, 30.185354564274313] }]) {
    // 维护geoJSON数据格式
    // 最大数量
    let maxCount = 0
    const geoHeat = new window.Loca.GeoJSONSource({
      data: {
        type: 'FeatureCollection',
        features: pointList.map((item) => {
          const featuresItem = {
            type: 'Feature',
            properties: {
              count: 0
            },
            geometry: {
              type: 'Point',
              coordinates: [0, 0]
            }
          }
          maxCount = Math.max(maxCount, item.count)
          featuresItem.properties.count = item.count
          featuresItem.geometry.coordinates = item.coordinates
          return featuresItem
        })
      }
    })
    // 热力图
    heatmap.value = new window.Loca.HeatMapLayer({
      // loca,
      zIndex: 20000,
      opacity: 1,
      visible: true,
      zooms: [2, 22]
    })

    heatmap.value.setSource(geoHeat)
    heatmap.value.setStyle({
      radius: 15,
      unit: 'px',
      height: 20,
      // radius: 10,
      // unit: 'px',
      // height: 10,
      gradient: {
        // 0: '#85a6fa',
        // 0.1: '#87cff8',
        // 0.2: '#64c1a7',
        0: '#87cff8',
        0.2: '#33ac34',
        0.3: '#ecdc4f',
        0.4: '#ff6204',
        0.6: '#ef3909',
        0.85: '#df2b11',
        0.95: '#d62316',
        1: '#c4141f'
      },
      value: function (_index: any, feature: { properties: { count: any } }) {
        return feature.properties.count
      },
      min: 0,
      max: maxCount, //4.6
      heightBezier: [0, 0.53, 0.37, 0.98]
    })
    mapLoca.value.add(heatmap.value)
  }
  // 渲染图层
  const _renderlayer = async ({ areaNode, cityHight, level }: { areaNode: any; cityHight: number; level: string }) => {
    // 创建loca容器
    if (!window.Loca.Container) return
    if (!mapLoca.value) {
      mapLoca.value = new window.Loca.Container({
        map: map.value
      })
    }
    // 添加光源
    // addLight(level)
    // addPrism()
    // 添加棱柱
    // addPrism()
    // 每次进来先清除
    if (boundLinelayerTop.value) {
      boundLinelayerTop.value.destroy()
    }
    if (boundLinelayerBottom.value) {
      boundLinelayerBottom.value.destroy()
    }
    if (boundPolygonLayer.value) {
      boundPolygonLayer.value.destroy()
    }
    if (pluseLineLayer.value) {
      pluseLineLayer.value.destroy()
    }
    if (pluseLineLayer1.value) {
      pluseLineLayer1.value.destroy()
    }
    // 线图层一
    boundLinelayerTop.value = setboundLinelayer({ areaNode })
    // 线图层二 底层的地图外边框线
    boundLinelayerBottom.value = setboundLinelayer({
      areaNode,
      styleOption: {
        color: 'blue',
        lineWidth: 5,
        altitude: 0 - cityHight
      }
    })
    // 3d图层
    boundPolygonLayer.value = setboundPolygonLayer(areaNode, cityHight)

    pluseLineLayer.value = setPluseLineLayer({
      areaNode,
      styleOption: {
        lineWidth: 5,
        headColor: '#5FFFFA',
        trailColor: '#174FA900',
        // trailColor: '#174FA900',
        zIndex: 1000
      }
    })
  }
  /** 获取一个点位要不要偏移 */
  const getPointOffset = (width: number, height: number, x: number, y: number): string => {
    const { clientWidth } = mapRef.value
    let horizontal = 'center'
    let vertical = 'bottom'
    if (x < width) {
      horizontal = 'left'
    } else if (clientWidth - x < width) {
      horizontal = 'right'
    }
    if (y < height) {
      vertical = 'top'
    }
    return `${vertical}-${horizontal}`
  }
  // 根据adcode获取areaNode数据
  const _loadAreaNode = (adcode: number): any => {
    return new Promise((resolve, reject) => {
      districtExplorer.base.loadAreaNode(adcode, (error: any, areaNode: any) => {
        if (error) {
          return reject(error)
        }
        return resolve(areaNode)
      })
    })
  }

  // #region **********   初始化tipMaker  start **************/
  const hoverTipMaker = shallowReactive<{
    base?: AMap.Marker
    alignByEvent: any
  }>({
    base: undefined,
    alignByEvent(e: { originalEvent: any }) {
      if (!this.base) return
      const originalEvent = e.originalEvent || e.originEvent
      const { x, y } = originalEvent.pixel
      const Ele = this.base.dom
      const anchor = getPointOffset(Ele.clientWidth, Ele.clientHeight, x, y)
      this.base.setPosition(originalEvent.lnglat)
      this.base.setAnchor(anchor)
      if (anchor.includes('top')) {
        this.base.setOffset(new window.AMap.Pixel(0, 20))
      } else if (anchor.includes('bottom')) {
        this.base.setOffset(new window.AMap.Pixel(0, -10))
      }
    }
  })
  const tipMakerInit = () => {
    hoverTipMaker.base = new window.AMap.Marker({
      content: undefined,
      offset: new window.AMap.Pixel(0, -10),
      bubble: true,
      // map: map.value,
      topWhenClick: true // 鼠标点击时marker是否置顶，默认false ，不置顶
    })
  }

  // #endregion *******   初始化tipMaker  ~end~ **************/

  // #region ********** districtExplorer start **************/
  const districtExplorer = reactive<{
    // 这个救不了，any
    base: AMap.DistrictExplorer
    currentAreaNode: string
    currentCityName: string[]
    currentAdCode: string[]
    subFeaturesInfosList: any[]
  }>({
    // md我是天才
    // 主要是districtExplorer.base在地图创建完之后 始终不会变成undefined
    base: undefined as any,
    currentAreaNode: '',
    currentCityName: ['', '', ''],
    currentAdCode: ['100000', '', ''],
    subFeaturesInfosList: []
  })
  // 初始化区域浏览
  const _renderDistrictArea = async (_adcode: number, cityHight = 40000, level: string, name: string) => {
    // 初始化区域前，热力图数据返回前，清空现有热力图数据
    if (heatmap.value) {
      heatmap.value.destroy()
    }
    // 加载某个区域的浏览
    const areaNode = await _loadAreaNode(_adcode)
    //设置当前使用的定位用节点
    districtExplorer.base.setAreaNodesForLocating([areaNode])
    // districtExplorer.base.setAreaNodesForLocating([_adcode])
    districtExplorer.currentAreaNode = areaNode
    // 渲染areaNode 父级区域 子级区域 颜色/边颜色
    _renderAreaNode(areaNode, name, level)
    // 根据覆盖物范围调整视野
    map.value.setFitView()
    // map.value.setFitView(districtExplorer.base.getAllFeaturePolygons(), false, [0, 75, 30, 30])
    // 添加图层
    _renderlayer({ areaNode, cityHight, level })
  }
  // 使用根据adcode获取的areaNode数据来渲染区域浏览
  const _renderAreaNode = async (areaNode: any, name: string, level: string) => {
    // 清除已经有的地图
    districtExplorer.base.clearFeaturePolygons()
    const { outerBorderColor, outerBorderWidth, innerBorderColor, innerBorderWidth } = props.mapStyle
    const subFeaturesInfos: Array<any> = []
    // 不加这里有个报错
    if (!areaNode) return
    districtExplorer.base.renderSubFeatures(areaNode, (feature: any) => {
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
    if (!districtExplorer.currentCityName[2]) {
      districtExplorer.subFeaturesInfosList = subFeaturesInfos
    }
    setMapShowTitle(name, level)

    // 绘制父级区划
    districtExplorer.base.renderParentFeature(areaNode, {
      cursor: 'pointer',
      bubble: true,
      zIndex: -1,
      strokeColor: outerBorderColor, // 线颜色
      // strokeColor: 'outerBorderColor', // 线颜色
      fillColor: 'transparent', // 填充色 (此处透明为了显示下方受光模块渐变的效果)
      strokeWeight: outerBorderWidth // 线宽
    })
  }
  const maxValue = ref(0)
  const timer = ref('')
  const anIndex = ref(0)

  function setMapShowTitle(name?: string, level: string) {
    if (!props.centerValueList.list?.length) return
    anIndex.value = 0
    maxValue.value = 0
    clearInterval(timer.value)
    timer.value = ''
    const setName = name || districtExplorer.currentCityName[2] || districtExplorer.currentCityName[1] || districtExplorer.currentCityName[0]

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
    // 使用市级区域保存的中心点信息
    if (districtExplorer.currentCityName[2]) {
      let curItem: any = null
      districtExplorer.subFeaturesInfosList.forEach((item) => {
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
      districtExplorer.subFeaturesInfosList.forEach((item) => {
        props.centerValueList.list.forEach((it) => {
          if (it.name === item.name) {
            maxValue.value = Math.max(maxValue.value, it.value)
          }
        })
      })
      districtExplorer.subFeaturesInfosList.forEach((item, index) => {
        mapShowTitle(
          { ...item, value: filterListItem(props.centerValueList.list, item.name), unit: filterUnitItem(props.centerValueList.list, item.name) },
          index + 1,
          maxValue.value
        )
      })
    }
    // 循环显示boar信息板的样式
    intervalMark()
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

  let theHtml: any
  onMounted(() => {
    theHtml = h(mapTooltip, {
      title: '我裂开了'
    })
    const divElement = document.createElement('div')
    // render(theHtml, document.body)
    render(theHtml, divElement)
  })

  // 地图点击
  const handleFeatureClick = async (e: any, feature: any) => {
    // 在限制isDeep时为true时继续下钻
    if (!props.isDeep) return
    const { level, adcode, name } = feature.properties
    // 清空弹窗内容
    hoverTipMaker.base?.setMap(null)
    // 赋值
    if (level === 'province') {
      if (districtExplorer.currentCityName[0] === name) return
      districtExplorer.currentCityName[1] = ''
      districtExplorer.currentCityName[0] = name
      districtExplorer.currentAdCode[1] = ''
      districtExplorer.currentAdCode[0] = adcode
    } else if (level === 'city') {
      if (districtExplorer.currentCityName[1] === name) return
      districtExplorer.currentCityName[2] = ''
      districtExplorer.currentCityName[1] = name
      districtExplorer.currentAdCode[2] = ''
      districtExplorer.currentAdCode[1] = adcode
    } else if (level === 'district') {
      if (districtExplorer.currentCityName[2] === name) return
      districtExplorer.currentCityName[2] = name
      districtExplorer.currentAdCode[2] = adcode
    }
    emits('handelCityChange', districtExplorer.currentCityName, level)
    await nextTick()
    // 加载某个区域的浏览-------------------------下钻暂时取消
    _renderDistrictArea(adcode, 40000, level, name)
  }
  // 鼠标悬浮
  const handleFeatureMouseoverAndOut = (e: any, feature: any) => {
    // 展开区县级别地图时不展示此级别的悬浮框
    if (districtExplorer.currentCityName[2]) return
    const isHover = e.type === 'featureMouseover' || e.type === 'featureMousemove'
    const { adcode: _adcode, level, name } = feature.properties

    const html = theHtml.el?.outerHTML

    hoverTipMaker.base?.setContent(html)
    const polys = districtExplorer.base.findFeaturePolygonsByAdcode(_adcode)
    polys.forEach((item: any) => {
      item.setOptions({
        cursor: level === 'city' ? 'default' : 'pointer',
        fillOpacity: isHover ? 0.35 : 1
      })
    })
    hoverTipMaker.base?.setMap(isHover ? map.value : null)
  }
  // 获取位置在滑动时动态计算位置来显示弹窗的方法
  const handleFeatureMouseMove = (e: { originalEvent: any; originEvent: any }, feature?: any) => {
    // 展开区县级别地图时不展示此级别的悬浮框
    if (districtExplorer.currentCityName[2]) return
    if (!hoverTipMaker.base) return
    if (!hoverTipMaker.base.getMap()) {
      handleFeatureMouseoverAndOut(e, feature)
    }
    hoverTipMaker.alignByEvent(e)
  }
  // #endregion ******* districtExplorer ~end~ **************/

  return {
    mapRef,
    map,
    districtExplorer,
    heatmap,
    tipMarkers,
    tipSubMarkers,
    boundLinelayerTop,
    boundLinelayerBottom,
    boundPolygonLayer,
    pluseLineLayer,
    pluseLineLayer1,
    _createMap,
    mapShowTitle,
    // mapShowDongYangTitle,
    // mapShowSubMarkers,
    // mapShowCustomPoint,
    boundLinelayerDataSet,
    setboundLinelayer,
    setPluseLineLayer,
    setboundPolygonLayer,
    _renderlayer,
    getPointOffset,
    _loadAreaNode,
    addHeat,
    tipMakerInit,
    _renderDistrictArea,
    handleFeatureClick,
    handleFeatureMouseoverAndOut,
    handleFeatureMouseMove
  }
}
