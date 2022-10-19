module.exports = {
  printWidth: 100, // 代码宽度建议不超过100字符
  tabWidth: 2, // tab缩进2个空格
  semi: false, // 末尾分号
  singleQuote: true, // 单引号
  jsxSingleQuote: true, // jsx中使用单引号
  trailingComma: 'es5', // 尾随逗号
  arrowParens: 'avoid', // 箭头函数仅在必要时使用()
  // https://stackoverflow.com/questions/63285895/make-prettier-less-uglier-prevent-split-tags
  // 解决 html 尖括号换行问题
  htmlWhitespaceSensitivity: 'ignore',
}
