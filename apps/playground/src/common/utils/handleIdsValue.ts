import { toNumber } from "../libs"

export const handleIdsValue = (val?: string) => {
  if (!val) {
    return
  }
  let newVal = val.replace(/，/g, ',')
  if (newVal.endsWith(',')) {
    newVal = newVal.slice(0, val.length - 1)
  }

  const valArr = newVal.split(',').map(e => toNumber(e)).filter(x => x !== null && x !== undefined)
  return valArr.length > 0 ? valArr : undefined
}