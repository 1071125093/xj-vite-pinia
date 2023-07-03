/**
 * @Author: XiaoJun
 * @Date: 2023-07-03 14:33:38
 * @LastEditors: XiaoJun
 * @LastEditTime: 2023-07-03 15:28:22
 * @Description: 给高德地图填坑
 * 下次一定，看文档吧
 * @FilePath: /xj-vite-pinia/src/views/front/reborn/components/shard38/components/map/types/index.d.ts
 */
declare type normalReturnFun = () => string | number

declare namespace AMap {}
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
