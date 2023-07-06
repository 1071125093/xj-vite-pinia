/**
 * @Author: XiaoJun
 * @Date: 2023-07-03 14:33:38
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-05 18:39:28
 * @Description: 给高德地图填坑
 * 下次一定，看文档吧
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/components/xjMap/types/index.d.ts
 */
declare type normalReturnFun = () => string | number

declare namespace AMap {
  interface DistrictExplorerOptions {
    /**
     * 地图对象实例。仅仅获取数据，不涉及地图相关的操作时，可以不设置。
     * @member {AMap.Map}
     */
    map?: AMap.Map

    /**
     * 是否启用事件支持，默认false。
     * 开启后，可以在map上识别鼠标位置所属的区划。
     * @member {boolean}
     */
    eventSupport?: boolean

    /**
     * 需要预加载的adcode列表。
     * @member {Array<number>}
     */
    preload?: Array<number>
  }
  /**
   * DistrictExplorer（行政区划浏览）提供了全国范围内到区县一级的行政区划数据（含边界），同时提供一些辅助功能，比如区划面绘制、事件监听，以及快速判断经纬度所属的子级区划等。
   * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-explorer
   */
  class DistrictExplorer extends AMap.EventDispatcher {
    constructor(opts?: DistrictExplorerOptions)

    /**
     * 加载 adcode 对应的 AreaNode。
     * @param  {number} adcode
     * @param  {Function} callback
     * @returns void
     */
    loadAreaNode(adcode: number, callback: (error: any, areaNode: AreaNode) => void): void

    /**
     * 批量加载 AreaNode。
     * @param  {Array<number>} adcodes
     * @param  {Function} callback
     * @returns void
     */
    loadMultiAreaNodes(adcodes: Array<number>, callback: (error: any, areaNodes: Array<AreaNode>) => void): void

    /**
     * 相当于 loadAreaNode(100000, callback)。
     * @param  {Function} callback
     * @returns void
     */
    loadCountryNode(callback: (error: any, areaNode: AreaNode) => void): void

    /**
     * 用递归方式获取某个经纬度位置所属的各级别区划信息。
     * @param  {AMap.LngLat | [number, number]} position
     * @param  {Function} callback
     * @param  {object} options?
     * @returns void
     */
    locatePosition(position: AMap.LngLat | [number, number], callback: (error: any, features: Array<object>) => void, options?: object): void

    /**
     * 绘制 areaNode 中的父级区划（ParentFeature）。
     * polygonOptions 为所绘多边形的样式，属性包括 strokeColor ，fillColor等。
     * @param  {AreaNode} areaNode
     * @param  {AMap.PolygonOptions} polygonOptions
     * @returns void
     */
    renderParentFeature(areaNode: AreaNode, polygonOptions: AMap.PolygonOptions): void

    /**
     * 绘制areaNode中的子级区划(SubFeature)。
     * 因为子级区划有多个，因此 polygonOptions 允许传递一个函数，对不同的子级返回不同的内容。
     * @param  {AreaNode} areaNode
     * @param  {AMap.PolygonOptions | Function} polygonOptions
     * @param  {number} index
     * @returns void
     */
    renderSubFeatures(areaNode: AreaNode, polygonOptions: AMap.PolygonOptions | ((subFeature: object, index: number) => AMap.PolygonOptions)): void

    /**
     * 绘制指定的feature，并返回内部创建的多边形（AMap.Polygon）数组。
     * @param  {object} feature
     * @param  {AMap.PolygonOptions} polygonOptions
     * @returns Array<AMap.Polygon>
     */
    renderFeature(feature: object, polygonOptions: AMap.PolygonOptions): Array<AMap.Polygon>

    /**
     * 返回内部创建（通过上述的render**方法）的且adcode匹配的全部polygon。
     * @param  {number} adcode
     * @returns Array<AMap.Polygon>
     */
    findFeaturePolygonsByAdcode(adcode: number): Array<AMap.Polygon>

    /**
     * 返回内部创建的全部 Polygon。
     * @returns Array<AMap.Polygon>
     */
    getAllFeaturePolygons(): Array<AMap.Polygon>

    /**
     * 清除内部创建的且由参数数组包含的 Polygon。
     * @param  {Array<AMap.Polygon>} polygons
     * @returns void
     */
    removeFeaturePolygons(polygons: Array<AMap.Polygon>): void

    /**
     * 清除内部创建的全部 Polygon。
     * @returns void
     */
    clearFeaturePolygons(): void

    /**
     * 设置用于位置归属识别的areaNode列表，优先级从高到低。
     * @param  {Array<AreaNode>} areaNodes
     * @returns void
     */
    setAreaNodesForLocating(areaNodes: Array<AreaNode>): void

    /**
     * 手动设置鼠标悬浮的 feature，同时触发 featureMouseover 事件（如果之前存在处于 hover 状态的 feature，则先对其触发 featureMouseout 事件）。
     * @param  {object} feature
     * @param  {object} event?
     * @returns void
     */
    setHoverFeature(feature: object, event?: object): void

    /**
     * 清除adcode对应的AreaNode实例缓存（adcode为空时，将清除全部缓存）。
     * 建议仅在对内存异常敏感的场景下使用。
     * @param  {number} adcode?
     * @returns void
     */
    clearAreaNodeCache(adcode?: number): void
  }

  /**
   * 提供事件注册、移除、触发功能。
   * @abstract
   * @class
   * @see http://lbs.amap.com/api/javascript-api/reference/event
   */
  class EventDispatcher {
    /**
     * 注册指定事件。
     * @param  {string} eventName 事件名称。
     * @param  {Function} handler 事件回调函数。
     * @param  {object} context? 事件回调中的上下文（可选，缺省时，handler 中 this 为调用 on 方法的对象本身，否则 this 指向 context 引用的对象）。
     * @description 多次绑定时，当 eventName、handler 函数对象、context 对象有任意一个不一样就会再次绑定。
     * @returns void
     */
    on(eventName: string, handler: Function, context?: object): void

    /**
     * 移除指定事件。
     * @param  {string} eventName 事件名称。
     * @param  {Function} handler 事件回调函数。
     * @param  {object} context? 事件回调中的上下文（可选，缺省时为调用 off 方法的对象本身，否则为 context 引用的对象）
     * @description 只有当 off 与 on 的 eventName、handler 函数对象、context 对象完全一致时才能有效移除监听。
     * @returns void
     */
    off(eventName: string, handler: Function, context?: object): void
  }

  /**
   * AreaNode实例不能直接创建，需要由上述的 loadAreaNode 或者 loadMultiAreaNodes 方法获取。
   */
  class AreaNode {
    private constructor()

    /**
     * 返回父级区划的 adcode。
     * @returns number
     */
    getAdcode(): number

    /**
     * 返回当前区域节点的整体经纬度范围。
     * @returns AMap.Bounds
     */
    getBounds(): AMap.Bounds

    /**
     * 返回查看该区域的最佳级别，仅推荐性质。
     * @returns number
     */
    getIdealZoom(): number

    /**
     * 返回父级区划的 name。
     * @returns string
     */
    getName(): string

    /**
     * 返回父级区划的属性（parentFeature.properties）。
     * @returns object
     */
    getProps(): object

    /**
     * 返回某个经纬度位置所属的子级区划，区域外返回null。该方法性能较高（每秒可达百万次），但不够精确（相对于逆地理编码服务），原因在于它是纯粹的几何判断，从而受限于feature中边界数据的精确程度。
     * @param  {LngLat | [number, number]} position
     * @returns object
     */
    getLocatedSubFeature(position: AMap.LngLat | [number, number]): object

    /**
     * 返回某个经纬度位置所属的子级区划的索引（针对 SubFeatures 数组中），区域外返回 -1。
     * @param  {LngLat | [number, number]} position
     * @returns number
     */
    getLocatedSubFeatureIndex(position: AMap.LngLat | [number, number]): number

    /**
     * 返回父级区划对应Feature。
     * @returns object
     */
    getParentFeature(): object

    /**
     * 返回该区域中全部的子级区划 Feature 数组。
     * @returns Array<object>
     */
    getSubFeatures(): Array<object>

    /**
     * 返回子级区划中adcode匹配的子级Feature。
     * @param  {number} adcode
     * @returns object
     */
    getSubFeatureByAdcode(adcode: number): object

    /**
     * 返回子级区划中对应索引位置的子级Feature。
     * @param  {number} index
     * @returns object
     */
    getSubFeatureByIndex(index: number): object

    /**
     * 根据所属的子级区划，将传入的位置点进行分组。
     * @param  {Array<any>} points
     * @param  {Function} getPosition
     * @returns Array<object>
     */
    groupByPosition(points: Array<any>, getPosition: (point: any, index: number) => AMap.LngLat | [number, number]): Array<object>
  }
  /**
   * 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件参数。
   * @interface
   * @description v1.2 新增
   * @see http://lbs.amap.com/api/javascript-api/reference/event
   */
  interface MapsEvent {
    /**
     * 事件类型。
     * @member {string}
     */
    type?: string

    /**
     * 发生事件的目标对象。
     * @member {object}
     */
    target?: object

    /**
     * 发生事件时光标所在处的经纬度坐标。
     * @member {LngLat | [number, number]}
     */
    lnglat?: LngLat | [number, number]

    /**
     * 发生事件时光标所在处的像素坐标。
     * @member {Pixel}
     */
    pixel?: Pixel
  }
}
declare namespace Loca {
  namespace PolygonLayer {
    type LayerOptions = Partial<{
      /** loca 对象，如果有，图层默认添加到地图上 */
      loca: Loca | null
      /** 图层显示层级，如果图层的深度检测开启，那么 zIndex 有可能失效 */
      zIndex: number
      /** 图层整体透明度 */
      opacity: number
      /** 图层是否可见 */
      visible: boolean
      /** 图层缩放等级范围 */
      zooms: [number, number]
      /** 剔除背面/前面的面（选择剔除将会提升性能），可选：back/front/none，back是剔除背面的面，front是剔除前面的面，none是不进行剔除 */
      cullface: 'back' | 'front' | 'none'
      /** 面是否接受光照，光照信息在 loca 对象中配置 */
      acceptLight: boolean
      /** 立体网格的粗糙度，值越高，说明表面越粗糙 */
      shininess: number
      /** 当面有厚度的时候，有没有侧面 */
      hasSide: boolean
      /** 当面有厚度的时候，有没有底面 */
      hasBottom: boolean
      /** 是否开启深度检测，开启后可能会影响 zIndex */
      depth: boolean
      /** 是否开启被遮挡的面隐藏，默认开启，如果关闭，在有透明度的时候，会显示出被遮挡的面 */
      blockHide: boolean
      /** 文字标注图层配置，配置同 AMap.LabelsLayer */
      labelsLayerOptions: Object | undefined
    }>
    type StyleOptions = Partial<{
      /** 面的顶面颜色 */
      topColor: string | normalReturnFun
      /** 面的侧面颜色（已废弃） */
      sideColor: string | normalReturnFun
      /** 面的侧面顶部的颜色 */
      sideTopColor: string | normalReturnFun
      /** 面的侧面底部的颜色 */
      sideBottomColor: string | normalReturnFun
      /** 面的底部的颜色 */
      bottomColor: string | normalReturnFun
      /** 海拔高度，也就是面的底面的高度。单位：米。支持动画过渡效果。 */
      altitude: number | normalReturnFun
      /** 面的厚度。单位：米。支持动画过渡效果。 */
      height: number | normalReturnFun
      /** 带有高度的时候，侧面的贴图纹理，目前仅支持侧面。如果需要纹理在侧面重复贴图，需要图片的宽高是 2 的 n 次方像素值。比如：256x256，64x1024 */
      texture: Canvas | URL | Image | Base64 | null
      /** 一个纹理图片覆盖的大小，[宽度, 高度]，单位是米，默认是宽 20 米，高 3 米贴一张纹理，会重复贴图。 */
      textureSize: [number, number] | normalReturnFun
      /** 面中心位置的文字标注，配置同 AMap.LabelMarker */
      label: Object | normalReturnFun | undefined
      /** 文字标注相对于顶面的海拔高度。单位：米。 */
      labelAltitude: number | normalReturnFun
    }>
    type BothOptions = LayerOptions & StyleOptions
  }
  namespace PulseLineLayer {
    type Options = Partial<{
      zIndex: number
      opacity: number
      visible: boolean
      zooms: [number, number]
    }>
    type StyleOptions = Partial<{
      /** '脉冲线的宽度' */
      lineWidth: number
      /** '脉冲头部颜色，每段脉冲的颜色由头部到尾部渐变' */
      headColor: string
      /** '脉冲尾部颜色' */
      trailColor: string
      /** '线整体海拔高度' */
      altitude: number
      /** //  '每段脉冲占整条路径长度的比例，例如interval = 0.25, 则表示每条路时4段脉冲' */
      interval: number
      /** '表示一条脉冲动画从头走到尾的时间（毫秒） */
      duration: number
    }>
    type BothOptions = Options & StyleOptions
  }
}
