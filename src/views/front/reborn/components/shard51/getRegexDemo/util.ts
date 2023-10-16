/**
 * @description: 一个类，提供静态方法，以获取项目所需的具体正则表达式
 */
export class RegexState {
  /** 定义全部的options */
  private static options = [
    {
      /** 常用于匹配数据返回的富文本，处理其中的多余style样式 */
      label: '匹配style标签',
      message: '匹配style标签',
      reg: /<style\b[^<]*(?:(?!<\/span>)<[^<]*)*<\/style>/gi
    },
    {
      label: '身份证号验证（中国大陆身份证）',
      message: '身份证号验证（中国大陆身份证）',
      reg: /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}([0-9]|X)$/
    },
    {
      label: '严格密码校验',
      message: '请输入新密码（密码必须为八位以上十八位以下且包含数字、大小写字母以及英文特殊字符）',
      reg: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!~@#$%^&*]).{8,16}$/
    }
  ] as const

  /**
   * @description:
   * @param {*} label:输入指定的字符串 获取所需的具体reg正则表达式
   * 在ts的椒盐虾（校验下） 理论上不会出现/ /的情况
   */
  static getReg<T extends (typeof this.options)[number]['label']>(label: T) {
    return this.getItem(label)?.reg || / /
  }
  /**
   * @description:
   * @param {*} label:输入指定的字符串 获取所需的具体Item
   */
  static getItem<T extends (typeof this.options)[number]['label']>(label: T) {
    const theItem = this.options.find((fi) => fi.label === label)
    return theItem
  }
}
