module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    //启用eslint-plugin-vue推荐的规则
    'plugin:vue/recommended'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不检测语句末尾的分号
    semi: ['off', 'always'],
    // 强制缩进为2个空格
    indent: ['off', 2],
    // 关闭函数名称跟括号之间的空格检测
    'space-before-function-paren': 0,
    // 忽略大括号内的空格
    'object-curly-spacing': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: true
        }
      }
    ],
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
