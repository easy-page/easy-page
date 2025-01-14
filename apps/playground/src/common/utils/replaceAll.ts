export function replaceAll(str, find, replace) {
  // 如果 find 不是字符串，则将其转换为字符串
  find = String(find)

  // 如果 find 是空字符串，则直接返回原始字符串（因为空字符串替换会导致无限循环）
  if (find === '') {
    return str
  }

  // 使用全局搜索的正则表达式
  const regex = new RegExp(find, 'g')

  // 使用 String.prototype.replace 方法进行替换
  return str.replace(regex, replace)
}
