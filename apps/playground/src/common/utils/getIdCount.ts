export const getIdCount = (val: string) => {
  if (!val) {
    return 0
  }
  return val.split(',').length
}

export const getSKUIdCount = (val: string) => {
  if (!val) {
    return 0
  }
  const arr = val.split(',')
  return arr.filter((item) => item !== '').length
}
