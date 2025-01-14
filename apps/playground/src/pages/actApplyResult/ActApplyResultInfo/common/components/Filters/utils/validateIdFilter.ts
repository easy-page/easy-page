export function validateIdFilter(
  input: string,
  maxCount: number
): {
  success: boolean
  errorMsg?: string
} {
  if (!input) {
    return { success: true }
  }
  const regex = /^(?!.*[，,]{2})(?![，,])[a-zA-Z0-9，,]+$/
  const result = regex.test(input)
  if (!result) {
    return {
      success: false,
      errorMsg: '仅支持输入数字、字母和逗号，多个逗号不可连续出现'
    }
  }
  const ids = input.split(',')
  if (ids.length > maxCount) {
    return { success: false, errorMsg: `ID 个数需小于${maxCount}` }
  }
  return { success: true }
}
