import { ISubActivity } from '@/common'

export const getFromChargeSidePn = (defaultValues: ISubActivity) => {
  const contentList = defaultValues.contentList || []
  if (contentList.length === 0) {
    return []
  }
  const chargeDetailVos = contentList[0].subsidy.chargeDetailVos
  if (chargeDetailVos.length === 0) {
    return []
  }

  return chargeDetailVos[0].meituan?.pns || []
}
