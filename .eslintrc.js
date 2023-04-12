/*
 * @Author: suzb@hsmap.com
 * @Date: 2022-04-05 14:21:07
 * @LastEditTime: 2023-04-12 18:30:55
 * Copyright (c) 2022 by nick/火石创造, All Rights Reserved.
 */
module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  env: {
    node: true,
    browser: true
  },
  globals: {
    jest: 'readonly',
    window: true
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'comma-dangle': 0, // 对象字面量项尾不能有逗号
    'no-underscore-dangle': 0, // 标识符不能以_开头或结尾
    'no-undef': 0, // 不能有未定义的变量
    camelcase: 0, // 强制驼峰法命名
    quotes: [0, 'single'], // 引号类型 `` "" ''
    'quote-props': [0, 'always'], // 对象字面量中的属性名是否强制双引号
    semi: [0, 'always'], // 语句强制分号结尾
    'max-classes-per-file': [0, 'always'], // 一个文件最多可以写几个class
    'linebreak-style': [0, 'windows'], // 换行风格
    'no-param-reassign': 0, // 禁止给参数重新赋值
    'no-plusplus': 0, // 禁止使用++，--
    'max-len': ['error', { code: 200 }],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // 后续添加
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/attributes-order': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/v-on-event-hyphenation': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-empty-function': 'warn'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
