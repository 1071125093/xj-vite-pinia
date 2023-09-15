import theAxios from '@/utils/request'

// 数字普惠化柱状图
export const godie = ()=> {
  return theAxios<any[]>({
    url: '/monitor/billion-enterprise-list/getCityList',
    method: 'get'
  })
}
