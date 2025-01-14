export const filterUndefined = (data: Record<string, any>) => {
  const result: Record<string, any> = {}
  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined) {
      result[key] = data[key]
    }
  })
  return result
}
