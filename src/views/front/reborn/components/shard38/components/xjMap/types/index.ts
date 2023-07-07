export interface Props {
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

export type Emits = {
  handelCityChange: [value: string[], level?: string]
  backProvince: []
  customPointClick: []
}
