/* eslint-disable no-useless-escape */
// 除表情外均可输入，即包含：中文、数字、特殊字符
export const validateStr = (val: string) => {
  const regex = /^[\u4E00-\u9FAF\w ~`！@#$¥%^…*（）!（）\-——+_=\[\]「」{}【】\|\|\'\'\'‘’。><?/？/,.～·()、《》""\“\”，<>]+$/
  return regex.test(val);
}

export function isOnlyNumbersAndCommas(input: string): boolean {
  // 定义一个正则表达式，匹配数字和英文逗号
  const regex = /^[0-9,]+$/;
  // 测试输入字符串是否符合正则表达式
  return regex.test(input);
}


export const isEmptyStr = (str: string) => {
  if (!str) {
    return true;
  }
  return !str.trim()
}

export const removeLeadingZeros = (str: string): string => {
  if (!str) {
    return str;
  }
  if (str === '0' || str.startsWith('0.') || !str.includes('.')) {
    // 允许输入 1 个 0 或保留以 '0.' 开头的字符串，或不含小数点的字符串
    return str.replace(/^0+(?=\d)/, '');
  }

  const [integerPart, fractionalPart] = str.split('.');

  // 处理整数部分，保留一个 '0' 如果整数部分被完全移除
  const normalizedIntegerPart = integerPart.replace(/^0+/, '') || '0';

  return `${normalizedIntegerPart}.${fractionalPart}`;
}