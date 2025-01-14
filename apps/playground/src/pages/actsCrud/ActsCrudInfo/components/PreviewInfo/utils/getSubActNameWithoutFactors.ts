import { ActFullInfo, CategoryCode, FeExtend, toJson } from '@/common'

export const getSubActNameWithoutFactors = (data: ActFullInfo) => {
  const subActs = data.subActivity || []
  const subActNameWithoutFactors: string[] = []
  subActs.forEach((each) => {
    const dataCollectors = each.qualify?.dataCollector
    if (!dataCollectors) {
      subActNameWithoutFactors.push(each.name)
    } else {
      const factors = Object.values(dataCollectors)
        .map((e) => toJson(e))
        .filter((x) => Boolean(x))
      const hasPoiFactor = factors.some((e) => {
        const feExtend: FeExtend = toJson(e.feExtend)
        if (feExtend?.factorCategoryCode === CategoryCode.Sku) {
          return true
        }
        return false
      })
      if (!hasPoiFactor) {
        subActNameWithoutFactors.push(each.name)
      }
    }
  })
  return subActNameWithoutFactors
}
