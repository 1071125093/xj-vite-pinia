/* eslint-disable */
/*
 * @Author: zhangqiyue
 * @Date: 2023-03-15 14:45:54
 * @LastEditors: zhangqiyue
 * @LastEditTime: 2023-05-19 18:52:28
 * @FilePath: \fd-dongyang-architectural-brain\src\components\map\hook\useBaseMap.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { reactive, shallowRef } from 'vue'
import side from './side.png'
import AMapLoader from '@amap/amap-jsapi-loader'

export default function useBaseMap(dom: string, mapOptions: AMap.MapOptions) {
  const map: any = shallowRef(null)
  // let mapLoca: { add: (arg0: any) => void; animate: { start: () => void; }; }
  const districtExplorer: any = shallowRef(null)
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

  const _createMap = async () => {
    return new Promise((resolve) => {
      AMapLoader.load({
        key: '60fdb942e15dfeefff0d5595c58a8de3', // 申请好的Web端开发者Key，首次调用 load 时必填
        // key:"9ff74af1cfa9a4b78433149e22f1f0ec", // 产业雷达
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale', 'AMap.ToolBar', 'AMap.Marker'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1' // AMapUI 版本
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '2.0' // Loca 版本
        }
      }).then(async (AMap) => {
        window.AMap = AMap
        map.value = new window.AMap.Map(dom, mapOptions)
        await window.AMapUI.load(['ui/geo/DistrictExplorer'], (DistrictExplorer: any) => {
          districtExplorer.value = new DistrictExplorer({
            eventSupport: true,
            map: map.value,
            preload: [mapOptions.adcode] //预加载
          })
          resolve(districtExplorer.value)
        })
        // 创建高德ui组件
        // map.value.on('complete', async () => {
        //   console.log(11);

        //   // 地图图块加载完成后触发
        //   // this.drawCountry("杭州市");

        // })
      })
    })
  }

  // 展示地图各地区中心点的标记及其名称
  const mapShowTitle = (
    item: { lngLat: number[]; name: string | number | symbol; value?: number; unit: string },
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
    tipMarkers[name] = new window.AMap.Marker({
      content: undefined,
      offset: new window.AMap.Pixel(0, 0),
      bubble: false,
      anchor: 'center',
      topWhenClick: true,
      clickable: true,
      zIndex: 1000
    })
    tipMarkers[name].setContent(`
      <div class="prism-content" style="--height: ${prismHeight}px;position: relative; width: 10px;transform: translate(50%, 0);">
        <div class="prism-item" style="display: ${prismHeight ? 'block' : 'none'};">
          <i></i>
        </div>
      </div>`)
    tipMarkers[name].setPosition(lngLat)
    tipMarkers[name].setMap(map.value)
    // 监听feature的点击事件
    tipMarkers[name].on('mouseover', () => {
      console.log('click tipMarkers')
      Object.keys(tipMarkers).forEach((key) => {
        if (key.includes('-board')) {
          tipMarkers[key].hide()
        }
      })
      // 点击时展示信息板board
      tipMarkers[boardName].show()
    })

    // part3: 信息板模块
    const boardName = `${name as unknown as string}-board`
    if (tipMarkers[boardName]) {
      tipMarkers[boardName].setMap(null)
    }
    tipMarkers[boardName] = new window.AMap.Marker({
      content: null,
      offset: new window.AMap.Pixel(0, 0),
      bubble: false,
      anchor: 'center',
      topWhenClick: true,
      zIndex: 5000
    })
    tipMarkers[boardName].hide()
    tipMarkers[boardName].setContent(`
      <div class="prism-board" style="display: ${value ? 'flex' : 'none'};position: relative;top: -${prismHeight + 40}px">
        <div class="prism-board-content">
          <p class="prism-board-content-title">${name || '-'}</p>
          <p class="prism-board-content-num">2022年：${value || '-'}${unit || '-'}</p>
        </div>
      </div>`)
    tipMarkers[boardName].setPosition(lngLat)
    tipMarkers[boardName].setMap(map.value)
  }
  // 展示东阳地图各地区中心点的标记及其名称
  // const mapShowDongYangTitle = (item: { lngLat: number[]; name: string | number | symbol; value?: any },
  //   index: number, maxValue: number = 300, 省内产值: number) => {
  //     console.log(item, index, maxValue, 省内产值, '省内产值');

  //   // eslint-disable-next-line prefer-const
  //   let { lngLat, name, value }: { lngLat: Array<number>; name: keyof typeof tipSubMarkers; value?:any } = item
  //   if (tipSubMarkers[name]) {
  //     tipSubMarkers[name].setMap(null)
  //   }
  //   tipSubMarkers[name] = new window.AMap.Marker({
  //     content: null,
  //     offset: new window.AMap.Pixel(0, 0),
  //     bubble: true,
  //     anchor: 'center',
  //     zIndex: 1000
  //   })
  //   const ratio = (省内产值 / maxValue) || 0
  //   const prismHeight = 200 * 1
  //   const prismHeight2 = 200 * ratio
  //   // 调整位置控制name不要展示重合
  //   const textValue = `top: ${prismHeight ? '14px' : '-7px'};left: -${String(name).length * 16 / 2 - 4 - (String(name).length - 1)}px;`
  //   tipSubMarkers[name].setContent(`
  //     <div class="prism-content" style="--height: ${prismHeight}px;position: relative; width: 10px">
  //         <div class="prism-item prism-item-out" style="display: ${prismHeight ? 'block' : 'none'};"></div>
  //         <div class="prism-item" style="display: ${prismHeight2 ? 'block' : 'none'};--height: ${prismHeight2}px;
  //         transform: translate(-50%, 0px) scaleX(0.91);"></div>
  //       <div class="prism-board" style="display: none;height: 88px;width: 230px;top: -44px;">
  //         <div class="prism-board-content">
  //           <span class="prism-board-content-title">总产值</span>
  //           <span class="prism-board-content-num">${value}亿元</span>
  //         </div>
  //         <div class="prism-board-content">
  //           <span class="prism-board-content-title">省内产值</span>
  //           <span class="prism-board-content-num">${省内产值}亿元</span>
  //         </div>
  //       </div>
  //       <div
  //         style="
  //           position: absolute;
  //           z-index: -1;
  //           ${textValue}
  //           width: ${String(name).length * 17}px;
  //           font-size: 16px;
  //           font-family: MicrosoftYaHeiUI;
  //           color: #B4D6FF;
  //           line-height: 16px;
  //           letter-spacing: 1px;
  //           text-shadow: 0px 2px 5px rgba(0,0,0,0.5);
  //         "
  //       >
  //         ${String(name)}
  //       </div>
  //     </div>`)
  //   tipSubMarkers[name].setPosition(lngLat)
  //   tipSubMarkers[name].setMap(map.value)
  // }
  const handleMouseOverContent = (name: string) => {
    return `
      <div class="frame-wrap">
        <div class="map-content" id="map-content" style="
          width: ${String(name).length * 16 + 32}px;
          display: flex;justify-content: center;max-width: 400px" >
          <div class="title" style="margin-bottom: 0;">${name}</div>
        </div>
        <div class="triangle"></div>
      </div>`
  }
  // 展示传入地图对应点的标记 (可传入dom字符串（customImgDom），或者直接传图片地址（customImg）)，给了一个默认的30px宽高的样式可以用
  const mapShowCustomPoint = (data: { lngLat: number[]; name: string }, customImgDom: string, callback: (data: any) => void, customImg?: string) => {
    const { lngLat, name }: { lngLat: Array<number>; name: keyof typeof tipMarkers } = data
    // 无法绘制没有坐标值数据
    if (lngLat.length === 0) return
    if (tipMarkers[name]) {
      tipMarkers[name].setMap(null)
      tipMarkers[name] = null
    }
    tipMarkers[name] = new window.AMap.Marker({
      content: null,
      offset: new window.AMap.Pixel(0, 0),
      bubble: true,
      anchor: 'center'
    })
    tipMarkers[name].setContent(`
        <div style="position: relative">
          ${customImg ? `<img src="${customImg}" style="width: 30px;height: 30px;display: inline-block;"/>` : customImgDom ? customImgDom : ``}
        </div>`)
    tipMarkers[name].setPosition(lngLat)
    tipMarkers[name].setMap(map.value)
    // popUp是鼠标触摸到时展示的弹窗
    const popUp = new window.AMap.Marker({
      position: new window.AMap.LngLat(lngLat[0], lngLat[1]),
      // offset: new window.AMap.Pixel(0, 0),
      // Pixel(x: +向右 -向左, y: +向下 - 向上)
      // （-（弹窗显示字符宽度 + 误差值）/ 2, -(弹窗padding值 + 弹窗字体大小 + 弹窗三角形高度 + 图片高度 / 2)）
      offset: new window.AMap.Pixel(-(String(name).length * 16 + 32) / 2, -(32 + 14 + 6 + 10 / 2)),
      content: handleMouseOverContent(name),
      zIndex: 100000
    })
    // 添加触摸事件
    tipMarkers[name].on('mouseover', () => {
      popUp.setMap(map.value)
    })
    // 添加触摸结束事件
    tipMarkers[name].on('mouseout', () => {
      popUp.remove()
    })
    // 传入自定义事件时，添加点击事件
    if (callback) {
      tipMarkers[name].on('click', () => {
        callback(data)
      })
    }
  }
  // 展示地图最低级别地区对应点的标记
  const mapShowSubMarkers = ({ lng_lat, name }: { address?: string; lng_lat?: string; name?: string; unit?: string }, imgUrl: string) => {
    if (name && tipMarkers[name]) {
      tipMarkers[name].setMap(null)
    }
    if (name) {
      tipSubMarkers[name] = new window.AMap.Marker({
        content: null,
        // offset: new window.AMap.Pixel(0, 0),
        // （-图片高度 / 2， 0）
        offset: new window.AMap.Pixel(-(28 / 2), 0),
        bubble: true,
        anchor: 'center'
      })
      const lngLat = lng_lat?.split(',') || []
      tipSubMarkers[name].setContent(`
        <div style="position: relative;">
          <img src="${imgUrl}" style="width: 28px;height: 34px;display: inline-block;"/>
        </div>`)

      // 测试的点
      // <div style="position: absolute; z-index: 30;width: 1px;height: 1px;background-color: red;border-radius: 50%"/>
      tipSubMarkers[name].setPosition(lngLat)
      tipSubMarkers[name].setMap(map.value)

      const popUp = new window.AMap.Marker({
        position: new window.AMap.LngLat(lngLat[0], lngLat[1]),
        // offset: new window.AMap.Pixel(0, 0),
        // Pixel(x: 向右, y: 向下)
        // （-（弹窗显示字符宽度 + 误差值 + 图片高度）/ 2, -(弹窗padding值 + 弹窗字体大小 + 弹窗三角形高度 + 图片高度 / 2)）
        offset: new window.AMap.Pixel(-(String(name).length * 16 + 32 + 28) / 2, -(32 + 14 + 6 + 32 / 2)),
        content: handleMouseOverContent(name),
        zIndex: 100000
      })
      tipSubMarkers[name].on('mouseover', () => {
        popUp.setMap(map.value)
      })
      tipSubMarkers[name].on('mouseout', () => {
        popUp.remove()
      })
    }
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
      color: '#C6DFF9FF',
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
      topColor() {
        return '#1b547cFF'
      },
      sideTopColor() {
        return '#1b547cFF'
      },
      sideBottomColor() {
        return '#04143C'
      },
      // 地图厚度
      height() {
        return cityHight
      },
      altitude: 0 - cityHight, // 地图偏移量
      texture: side
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
  //   function addPrism(pointList = [{
  //     "id": 20,
  //     "名称": "杭州市",
  //     "人口": 870.04,
  //     "value": 5945.82,
  //     coordinates: [120.15507, 30.274084]
  //   }]) {
  //     // const geoUrl = new window.Loca.GeoJSONSource({
  //     //   url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/gdp.json',
  //     // });
  //     // 维护geoJSON数据格式
  //     const geo = new window.Loca.GeoJSONSource({
  //       data: {
  //         type: 'FeatureCollection',
  //         features: pointList.map(item => {
  //           const featuresItem = {
  //             "type": "Feature",
  //             "properties": {},
  //             "geometry": {
  //               "type": "Point",
  //               "coordinates": [0, 0]
  //             }
  //           }
  //           featuresItem.properties = item
  //           featuresItem.geometry.coordinates = item.coordinates
  //           return featuresItem
  //         })
  //       }
  //     })
  //     prismLayer.value = new window.Loca.PrismLayer({
  //       zIndex: 20001,
  //       opacity: 1,
  //       visible: false,
  //       hasSide: true,
  //     });

  //     prismLayer.value.setSource(geo);
  //     // top3 的城市增加文字
  //     const topConf = {
  //       '杭州市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-one.png',
  //       '北京市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-two.png',
  //       '广州市': 'https://a.amap.com/Loca/static/loca-v2/demos/images/top-three.png',
  //     };
  //     prismLayer.value.setStyle({
  //       unit: 'meter',
  //       sideNumber: 4,
  //       topColor: (_index: any, f: { properties: { [x: string]: any; }; }) => {
  //         const n = f.properties['value'];
  //         return n > 7000 ? '#E97091' : '#2852F1';
  //       },
  //       sideTopColor: (_index: any, f: { properties: { [x: string]: any; }; }) => {
  //         const n = f.properties['value'];
  //         return n > 7000 ? '#E97091' : '#2852F1';
  //       },
  //       sideBottomColor: '#002bb9',
  //       radius: 3000,
  //       height: (_index: any, f: { properties: any; coordinates: any[]; }) => {
  //         const props = f.properties;
  //         const height = Math.max(10, Math.sqrt(props['value']) * 900 - 5000);
  //         const conf = topConf[props['名称']];
  //         // top3 的数据，增加文字表达
  //         if (conf) {
  //           map.value.add(
  //             new window.AMap.Marker({
  //               anchor: 'bottom-center',
  //               position: [f.coordinates[0], f.coordinates[1], height],
  //               content: '<div style="margin-bottom: 10px; float: left; font-size: 14px;height: 57px;
  //  width: 180px; color:#fff; background: no-repeat url(' +
  //                 conf +
  //                 '); background-size: 100%;"><p style="margin: 7px 0 0 35px; height: 20px; line-height:20px;">' +
  //                 props['名称'] + '人口 ' + props['人口'] + '</p>' +
  //                 '<p style="margin: 4px 0 0 35px; height: 20px; line-height:20px; color: #00a9ff; font-size: 13px;">' +
  //                 props['value'] + ' 元' +
  //                 '</p></div>',
  //             }),
  //           );
  //         }
  //         return height;
  //       },
  //       rotation: 360,
  //       altitude: 0,
  //     });
  //     mapLoca.value.add(prismLayer.value);
  //  }
  function addHeat(pointList = [{ count: 10, coordinates: [120.22047498787455, 30.185354564274313] }]) {
    // 每次进来先清除
    // const geoHeat = new window.Loca.GeoJSONSource({
    //   url: 'https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_house_order.json',
    // });
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

    heatmap.value.setSource(geoHeat, {
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
    addLight(level)
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
        color: '#7DEAFF',
        lineWidth: 5,
        altitude: 0 - cityHight
      }
    })
    // 3d图层
    boundPolygonLayer.value = setboundPolygonLayer(areaNode, cityHight)

    pluseLineLayer.value = setPluseLineLayer({ areaNode })
    // 阴影效果的跑光
    pluseLineLayer1.value = setPluseLineLayer({
      areaNode,
      styleOption: {
        lineWidth: 5,
        headColor: '#5FFFFA',
        trailColor: '#174FA900',
        zIndex: 1000
      }
    })

    // const dat = new window.Loca.Dat()

    // dat.addLight(mapLoca.value.ambLight, mapLoca.value, '环境光');
    // dat.addLight(mapLoca.value.dirLight, mapLoca.value, '平行光');
    // dat.addLight(mapLoca.value.pointLight, mapLoca.value, '点光');
  }
  const getPointOffset = (currentMarker: any) => {
    const item = currentMarker.getExtData()
    // 前面加逗号只是为了想解构出下标1的数据
    const [, iconHeight] = currentMarker.getSize()
    // 该方法整体思路是 将marker点坐标（容器像素坐标）与地图容器宽高相比较，动态判断需要展示的信息窗口是否超过边界并进行调整
    const { lon, lat } = item
    // 该项目 信息窗口宽高基本确定，给定宽高
    const defaultWidth = 480
    const defaultHeight = 200
    const { clientWidth: width } = document.getElementById(dom) as HTMLElement
    const targetLnglat = new window.AMap.LngLat(lon, lat)
    const { x: targetX, y: targetY } = map.value.lngLatToContainer(targetLnglat)
    let xPixel = targetX
    let yPixel = targetY - iconHeight / 2
    let anchorBottom = true
    if (targetX < defaultWidth / 2) {
      xPixel = defaultWidth / 2 + 20
    } else if (width - targetX < defaultWidth / 2) {
      xPixel = width - defaultWidth / 2 - 20
    }
    if (targetY < defaultHeight) {
      anchorBottom = false
      yPixel = targetY + iconHeight / 2
    }
    const pixel = new window.AMap.Pixel(xPixel, yPixel)
    const lngLat = map.value.containerToLngLat(pixel)
    return { lngLat, anchorBottom }
  }
  // 根据adcode获取areaNode数据
  const _loadAreaNode = (adcode: any) => {
    return new Promise((resolve, reject) => {
      districtExplorer.value.loadAreaNode(adcode, (error: any, areaNode: any) => {
        if (error) {
          return reject(error)
        }
        return resolve(areaNode)
      })
    })
  }

  return {
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
    mapShowSubMarkers,
    mapShowCustomPoint,
    boundLinelayerDataSet,
    setboundLinelayer,
    setPluseLineLayer,
    setboundPolygonLayer,
    _renderlayer,
    getPointOffset,
    _loadAreaNode,
    addHeat
  }
}
