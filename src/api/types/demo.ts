
/**
   * @description: 专家资源库-查看详情

   * @description: "参数类型"
   */
export type getPersonInfoDetailByIdParamsType = {
  /**
     * id
     */
  id: string
}
 
/**
   * @description: 专家资源库-查看详情

   * @description: "返回值类型"
   */
export type getPersonInfoDetailByIdResultType = {code:number;data:{
  /**
   * 所在地区
   */
  area: string;// 所在地区
  /**
   * 完整籍贯
   */
  birthAddress: string;// 完整籍贯
  /**
   * 籍贯区县
   */
  birthArea: string;// 籍贯区县
  /**
   * 籍贯城市
   */
  birthCity: string;// 籍贯城市
  /**
   * 籍贯省份
   */
  birthProvince: string;// 籍贯省份
  /**
   * 创建时间
   */
  createTime: string;// 创建时间
  /**
   * 简介
   */
  describer: string;// 简介
  /**
   * 人物教育经历
   */
  educationList: Array<{
  /**
   * 学院
   */
  academy: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 学历
   */
  education: string
  /**
   * 教育机构
   */
  educationOrg: string
  /**
   * 教育截止时间
   */
  endTime: string
  /**
   * 记录id
   */
  id: string
  /**
   * 是否逻辑删除
   */
  isDelete: number
  /**
   * 专业
   */
  major: string
  /**
   * 人物代码
   */
  personCode: string
  /**
   * 教育起始时间
   */
  startTime: string
  /**
   * 更新时间
   */
  updateTime: string
}>;// 人物教育经历
  /**
   * 邮箱
   */
  email: string;// 邮箱
  /**
   * 人物任职经历
   */
  experienceList: Array<{
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 职务
   */
  duty: string
  /**
   * 任职机构
   */
  dutyOrg: string
  /**
   * 任职截止时间
   */
  endTime: string
  /**
   * 记录id
   */
  id: string
  /**
   * 是否逻辑删除
   */
  isDelete: number
  /**
   * 人物代码
   */
  personCode: string
  /**
   * 任职起始时间
   */
  startTime: string
  /**
   * 更新时间
   */
  updateTime: string
}>;// 人物任职经历
  /**
   * 记录id（主键）
   */
  id: string;// 记录id（主键）
  /**
   * 是否逻辑删除（1是,0否）
   */
  isDelete: number;// 是否逻辑删除（1是,0否）
  /**
   * 是否修改（1是[私域],0否[公域]）
   */
  isModify: number;// 是否修改（1是[私域],0否[公域]）
  /**
   * 人物标签（逗号隔开）
   */
  labelName: string;// 人物标签（逗号隔开）
  /**
   * 人才级别
   */
  level: string;// 人才级别
  /**
   * 主要领域（逗号隔开）
   */
  mainField: string;// 主要领域（逗号隔开）
  /**
   * 人物代码
   */
  personCode: string;// 人物代码
  /**
   * 人物名称
   */
  personName: string;// 人物名称
  /**
   * 联系电话
   */
  phone: string;// 联系电话
  /**
   * 来台前的地区
   */
  preAddress: string;// 来台前的地区
  /**
   * 来台前的城市
   */
  preCity: string;// 来台前的城市
  /**
   * 来台前的省份
   */
  preProvince: string;// 来台前的省份
  /**
   * 职称
   */
  rank: string;// 职称
  /**
   * 性别
   */
  sex: string;// 性别
  /**
   * 更新时间
   */
  updateTime: string;// 更新时间
};error:boolean;message:string;success:boolean;}
 