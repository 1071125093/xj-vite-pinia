/*
 * @Author: XiaoJun
 * @Date: 2022-07-07 17:32:09
 * @LastEditors: XiaoJun
 * @LastEditTime: 2022-07-10 12:52:11
 * @Description: 组件功能
 * @FilePath: /xj-vite-pinia/.prettierrc.js
 */
module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true,
  jsxBracketSameLine: true,
  printWidth: 100,
  singleQuote: true,
  semi: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  arrowParens: 'always',
  endOfLine: 'auto',
};
