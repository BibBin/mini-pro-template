module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [  
    'plugin:vue/recommended'  
  ],  
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //语句强制分号结尾
    'semi': [2, 'never'],
    // 强制缩进为2个空格
    'indent': ['error', 2],
    // 关闭函数名称跟括号之间的空格检测
    'space-before-function-paren': 0,
    // 忽略大括号内的空格
    'object-curly-spacing': 0,
    // 使用单引号 
    'quotes': [1, 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}