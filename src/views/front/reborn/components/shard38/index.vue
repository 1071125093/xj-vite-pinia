<!--
 * @Author: XiaoJun
 * @Date: 2022-07-07 19:37:02
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-01-18 16:42:10
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/index.vue
-->
<script lang="ts" setup>
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import xjMenu from './components/xjMenu.vue'
// #region ********** 引入区域 start **************/

// #endregion ******* 引入区域 ~end~ **************/

// #region ********** define区域 start **************/

// #endregion ******* define区域 ~end~ **************/

// #region ********** 地图实例化区域 start **************/
const mapDom = ref()
/** 地图实例 */
let mapInstance: any

const colors = ['#094C70', '#4D9AFF', '#BDE8F9', '#FFFCA9', '#FFC26A']
let tipMarker = null
const mapData = ref({})
const districtExplorer: any = ref(null)
const currentAreaNode: any = ref(null)

/** 初始化地图 */
const initMap = async () => {
  const AMap = await AMapLoader.load({
    key: '9ff74af1cfa9a4b78433149e22f1f0ec', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).catch((err) => {
    console.log('地图初始化错误')
  })
  mapInstance = new AMap.Map(mapDom.value, {
    //设置地图容器id
    viewMode: '3D', //是否为3D地图模式
    pitch: 20, // 地图俯仰角度，有效范围 0 度- 83 度
    mapStyle: 'amap://styles/darkblue',
    zoom: 5, //初始化地图级别
    dragEnable: true, // 地图是否可通过鼠标拖拽平移，默认为true
    center: [105.602725, 37.076636], //初始化地图中心点位置
    features: ['point', 'road', 'bg'], //地图要素
    layers: [
      //使用多个图层
      // new AMap.TileLayer.Satellite(),
      // new AMap.TileLayer.RoadNet(),
    ],
    zooms: [4, 18], //设置地图级别范围
  })
  var trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10,
  })
}

const xjTest = () => {
  AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], function (DistrictExplorer, $) {
    //创建一个实例
    districtExplorer.value = new DistrictExplorer({
      eventSupport: true, //打开事件支持
      map: mapInstance,
    })
    console.log(DistrictExplorer)
    console.log(districtExplorer)

    tipMarker = new AMap.Marker({
      content: '213',
      offset: new AMap.Pixel(60, 40),
      bubble: true,
    })
    // 监听feature的点击事件
    districtExplorer.value.on('featureClick', handleFeatureClick)
    // 监听feature的hover事件
    districtExplorer.value.on('outsideClick', function (e) {
      districtExplorer.value.locatePosition(
        e.originalEvent.lnglat,
        function (error, routeFeatures) {
          if (routeFeatures && routeFeatures.length > 1) {
            //切换到省级区域
            switch2AreaNode(routeFeatures[1].properties.adcode)
          } else {
            //切换到全国
            switch2AreaNode(100000)
          }
        },
        {
          levelLimit: 2,
        }
      )
    })
    // switch2AreaNode(props.areaId || 100000)
    switch2AreaNode(100000)
  })
}

const handleFeatureClick = (e, feature) => {
  var featureInfo = feature.properties
  console.log(featureInfo)
  switch2AreaNode(featureInfo.adcode)
}

const switch2AreaNode = (adcode, callback) => {
  loadAreaNode(adcode, function (error, areaNode) {
    if (error) {
      if (callback) {
        callback(error)
      }
      return
    }
    currentAreaNode.value = areaNode
    //设置当前使用的定位用节点
    districtExplorer.value.setAreaNodesForLocating([currentAreaNode.value])
    refreshAreaNode(areaNode)
    if (callback) {
      callback(null, areaNode)
    }
  })
}
const refreshAreaNode = (areaNode) => {
  districtExplorer.value.setHoverFeature(null)
  renderAreaPolygons(areaNode)
}
const renderAreaPolygons = (areaNode) => {
  //更新地图视野
  mapInstance.setBounds(areaNode.getBounds(), null, null, true)
  //清除已有的绘制内容
  districtExplorer.value.clearFeaturePolygons()
  //绘制子区域
  districtExplorer.value.renderSubFeatures(areaNode, function (feature) {
    const name = feature.properties.name
    const fillColor = '#094C70'
    var strokeColor = '#010c23'
    return {
      cursor: 'default',
      bubble: true,
      strokeColor: strokeColor, //线颜色
      strokeOpacity: 1, //线透明度
      strokeWeight: 1, //线宽
      fillColor: fillColor, //填充色
      fillOpacity: 1, //填充透明度
    }
  })
  //绘制父区域
  districtExplorer.value.renderParentFeature(areaNode, {
    cursor: 'default',
    bubble: true,
    strokeColor: '#010c23', //线颜色
    strokeOpacity: 1, //线透明度
    strokeWeight: 1, //线宽
    fillColor: areaNode.getSubFeatures().length ? null : colors[0], //填充色
    fillOpacity: 0.35, //填充透明度
  })
}
const loadAreaNode = (adcode, callback) => {
  districtExplorer.value.loadAreaNode(adcode, function (error, areaNode) {
    if (callback) {
      callback(null, areaNode)
    }
  })
}

const asyncCreateScript = (url, id) => {
  return new Promise((resolve, reject) => {
    // 如果已经有加载，则直接resolve
    if (document.getElementById(id)) {
      resolve()
      return
    }
    const scriptUrl = url
    const scriptDom = document.createElement('script')
    scriptDom.type = 'text/javascript'
    scriptDom.charset = 'utf-8'
    scriptDom.src = scriptUrl
    scriptDom.id = id
    document.head.appendChild(scriptDom)
    // 确保在script加载成功之后再初始化地图
    scriptDom.onload = () => {
      resolve()
    }
    scriptDom.onerror = () => {
      reject()
    }
  })
}
// #endregion ******* 地图实例化区域 ~end~ **************/

// #region ********** 初始化 start **************/
onMounted(async () => {
  await initMap()
  await asyncCreateScript('https://webapi.amap.com/ui/1.1/main.js', 'GD_api')
  xjTest()
})
// #endregion ******* 初始化 ~end~ **************/
</script>
<template>
  <div class="shard">
    <div class="xj_map_container" ref="mapDom"></div>
  </div>
</template>
<style lang="less" scoped>
.shard {
}
.xj_map_container {
  width: 700px;
  height: 700px;
  border: 1px solid #87ceeb;
}
</style>
