import actionRequest from '@/utils/request';
import * as T from './types/demo'

                
/**
 * @description: 专家资源库-查看详情

 * @description: GET请求
 * @doc {string} https://tz-brain-api.aihuoshi.net/doc.html#/default/[%E4%B8%93%E5%AE%B6%E7%B2%BE%E5%87%86%E5%8C%B9%E9%85%8D]%E6%A8%A1%E5%9D%97/queryByIdUsingGET_23
* @param {Object} data - 参数对象 
* @param {string} data.id - id
* @returns {Object} result.data  返回值对象
* @property {string} result.data.area - 所在地区
* @property {string} result.data.birthAddress - 完整籍贯
* @property {string} result.data.birthArea - 籍贯区县
* @property {string} result.data.birthCity - 籍贯城市
* @property {string} result.data.birthProvince - 籍贯省份
* @property {string} result.data.createTime - 创建时间
* @property {string} result.data.describer - 简介
* @property {Array<any>} result.data.educationList - 人物教育经历
* @property {string} result.data.educationList.academy - 学院
* @property {string} result.data.educationList.createTime - 创建时间
* @property {string} result.data.educationList.education - 学历
* @property {string} result.data.educationList.educationOrg - 教育机构
* @property {string} result.data.educationList.endTime - 教育截止时间
* @property {string} result.data.educationList.id - 记录id
* @property {number} result.data.educationList.isDelete - 是否逻辑删除
* @property {string} result.data.educationList.major - 专业
* @property {string} result.data.educationList.personCode - 人物代码
* @property {string} result.data.educationList.startTime - 教育起始时间
* @property {string} result.data.educationList.updateTime - 更新时间
* @property {string} result.data.email - 邮箱
* @property {Array<any>} result.data.experienceList - 人物任职经历
* @property {string} result.data.experienceList.createTime - 创建时间
* @property {string} result.data.experienceList.duty - 职务
* @property {string} result.data.experienceList.dutyOrg - 任职机构
* @property {string} result.data.experienceList.endTime - 任职截止时间
* @property {string} result.data.experienceList.id - 记录id
* @property {number} result.data.experienceList.isDelete - 是否逻辑删除
* @property {string} result.data.experienceList.personCode - 人物代码
* @property {string} result.data.experienceList.startTime - 任职起始时间
* @property {string} result.data.experienceList.updateTime - 更新时间
* @property {string} result.data.id - 记录id（主键）
* @property {number} result.data.isDelete - 是否逻辑删除（1是,0否）
* @property {number} result.data.isModify - 是否修改（1是[私域],0否[公域]）
* @property {string} result.data.labelName - 人物标签（逗号隔开）
* @property {string} result.data.level - 人才级别
* @property {string} result.data.mainField - 主要领域（逗号隔开）
* @property {string} result.data.personCode - 人物代码
* @property {string} result.data.personName - 人物名称
* @property {string} result.data.phone - 联系电话
* @property {string} result.data.preAddress - 来台前的地区
* @property {string} result.data.preCity - 来台前的城市
* @property {string} result.data.preProvince - 来台前的省份
* @property {string} result.data.rank - 职称
* @property {string} result.data.sex - 性别
* @property {string} result.data.updateTime - 更新时间
 */
export const getPersonInfoDetailById = <P extends T.getPersonInfoDetailByIdParamsType, R extends T.getPersonInfoDetailByIdResultType>(data: P): Promise<R> => {
  return actionRequest({
    url: '/personInfo/detailById',
    method: 'get',
    params: data
  }) as unknown as Promise<R>
}

