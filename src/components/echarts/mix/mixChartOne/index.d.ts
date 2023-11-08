declare namespace FsC {
  interface MixChartOneChartData {
    seriesPiece: {
      name: string
      data: (number | string)[]
      type: string
      meta?: MixChartOneChartDataMeta
      // 我晕了
      metaList?: MixChartOneChartDataMeta[]
    }[]
    xAxisData: any[]
  }
  interface MixChartOneChartDataMeta {
    unit?: string
    itemStyle?: any
    moreSeriesConfig?: any
  }
}
