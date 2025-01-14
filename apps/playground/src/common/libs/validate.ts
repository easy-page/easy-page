import { EditableConfig } from '@easy-page/antd-ui'

/** 判断长度 */
export const isLength = (max: number, str?: string) => {
  if (!str) {
    return true
  }
  return str.length > max
}

/** 验证 ID 类型搜索条件 */
export function validateIdFilter(
  input: string,
  maxCount: number,
  options?: {
    errorMsg: string
    regexStr: RegExp
  }
): {
  success: boolean
  errorMsg?: string
} {
  if (!input) {
    return { success: true }
  }

  const { errorMsg, regexStr } = options || {}

  const regex = regexStr || /^(?!.*[，,]{2})(?![，,])[a-zA-Z0-9，,]+$/
  const result = regex.test(input)
  if (!result) {
    return {
      success: false,
      errorMsg: errorMsg || '仅支持输入数字、字母和逗号，多个逗号不可连续出现',
    }
  }
  const ids = input.replace(/，/g, ',').split(',')
  if (ids.length > maxCount) {
    return { success: false, errorMsg: `ID 个数需小于${maxCount}` }
  }
  return { success: true }
}

export function hasDuplicateElements(arr: string[]): boolean {
  const set = new Set(arr)
  return set.size !== arr.length
}

export const getDisabledState = (
  key: string,
  editable?: EditableConfig<any>
) => {
  if (editable === undefined) {
    return false
  }
  if (editable === false) {
    return true
  }
  if (typeof editable === 'object') {
    if (editable.canEditKeys?.includes(key)) {
      return false
    }
    if (editable.canNotEditKeys?.includes(key)) {
      return true
    }

    if (!editable.canEditKeys && editable.canNotEditKeys) {
      return false
    }

    return true
  }
  return false
}
