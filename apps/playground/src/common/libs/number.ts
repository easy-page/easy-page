export type EndWithRule = {
  sence?: (val: string) => boolean // 何种场景下，才执行 endWith，不传则默认就执行 endWith 验证
  endWith: string[]
}

export type CheckNumberInvalidOptions = {
  checkNumber?: boolean // 判断是否是数字
  checkInteger?: boolean
  checkInRange?: { min: number; max: number } // 判断是否在某个范围中
  // withMinVal?: boolean; // 是否允许为最小值, 默认 false
  // withMaxVal?: boolean; // 是否允许最大值，默认 false
  decimalNumber?: number // 如果配置了，则会检查小数位数是否等于 decimalNumber
  endWith?: EndWithRule[] // 是否已某个字符串结尾，比如：5，30等
}

export enum CheckNumberInvalidError {
  IsNotNumber,
  IsNotInteger,
  IsNotInRange,
  IsNotValidNumber, // 比如需要校验小数位数时，不合法
  Empty,
}
export type CheckNumberInvalidRes = {
  success: boolean
  error?: CheckNumberInvalidError
}

export const toNumber = (val: string): number | undefined => {
  try {
    return Number.isNaN(Number(val)) ? undefined : Number(val)
  } catch (error) {
    return undefined
  }
}

/** 判断是否是整数 */
export const isInteger = (value: string): boolean => {
  if (!value) {
    return true
  }
  return /^\d+$/.test(value)
}

/** 判断是否是 Number */
export const isNumber = (str?: string) => {
  if (!str) {
    /** 一般输入框未填写，不做 number 校验，默认为 true */
    return true
  }
  const temp = Number(str)
  if (Number.isNaN(temp)) {
    return false
  }
  return true
}

export const isEndWith = (val: string, endWithRule: EndWithRule[]): boolean => {
  if (!val) {
    return false
  }

  return endWithRule.some((each) => {
    if (!each.sence || each.sence?.(val)) {
      // 数组中，必须得至少有 1 个符合要求即可
      return each.endWith.some((suffix) => val.endsWith(suffix))
    }
    // 不符合 sence 场景，则不验证，默认为 true
    return true
  })
}

// 判断是否 <= 1位小数即可， 可以是 0 为小数
export const isDecimalNumber = (val: string, decimalNumber: number) => {
  if (!val) {
    return true
  }
  const dotIdx = val.indexOf('.')

  const total = val.length
  if (dotIdx === -1 || dotIdx === total - 1) {
    return true
  }
  return dotIdx >= total - decimalNumber - 1
}

export const checkNumberInvalid = (
  value: string,
  options: CheckNumberInvalidOptions
): CheckNumberInvalidRes => {
  if (!value || !value.trim()) {
    return { success: false, error: CheckNumberInvalidError.Empty }
  }
  const { checkNumber, checkInRange, checkInteger, decimalNumber, endWith } =
    options
  if (checkNumber && !isNumber(value)) {
    return { success: false, error: CheckNumberInvalidError.IsNotNumber }
  }
  if (checkInteger && !isInteger(value)) {
    return { success: false, error: CheckNumberInvalidError.IsNotInteger }
  }
  const valNum = Number(value)
  console.log('checkInRange', valNum, checkInRange)

  if (
    checkInRange &&
    (valNum < checkInRange.min || valNum > checkInRange.max)
  ) {
    console.log('checkInRange走到这里了吗');
    
    return { success: false, error: CheckNumberInvalidError.IsNotInRange }
  }
  if (decimalNumber && !isDecimalNumber(value, decimalNumber)) {
    return { success: false, error: CheckNumberInvalidError.IsNotValidNumber }
  }

  if (endWith && !isEndWith(value, endWith)) {
    return { success: false, error: CheckNumberInvalidError.IsNotValidNumber }
  }

  return {
    success: true,
  }
}

export enum NumberOperator {
  Lt = 'lt', // 小于
  Gt = 'gt', // 大于
  Lte = 'lte', // 小于等于
  Gte = 'gte', // 大于等于
  e = 'e', // 等于
}

export const compareNumber = (
  x: any,
  y: any,
  operator: NumberOperator
): boolean => {
  const num1 = toNumber(x)
  const num2 = toNumber(y)
  if (num1 === undefined || num2 === undefined) {
    return false
  }
  switch (operator) {
    case NumberOperator.Gt:
      return num1 > num2
    case NumberOperator.Gte:
      return num1 >= num2
    case NumberOperator.Lt:
      return num1 < num2
    case NumberOperator.Lte:
      return num1 <= num2
    case NumberOperator.e:
      return num1 === num2
    default:
      return false
  }
}

export function getDigitPosition(number: number): string {
  if (number < 0) {
    number = Math.abs(number) // 处理负数
  }

  if (number < 10) {
    return ''
  } else if (number < 100) {
    return '十'
  } else if (number < 1000) {
    return '百'
  } else if (number < 10000) {
    return '千'
  } else if (number < 100000) {
    return '万'
  } else if (number < 1000000) {
    return '十万'
  } else if (number < 10000000) {
    return '百万'
  } else if (number < 100000000) {
    return '千万'
  } else {
    return '亿'
  }
}

export const isZero = (str: string) => {
  if (!str) {
    return false
  }
  return toNumber(str) === 0
}
