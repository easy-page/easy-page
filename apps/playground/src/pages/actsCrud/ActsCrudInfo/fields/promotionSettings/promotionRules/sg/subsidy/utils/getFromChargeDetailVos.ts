import { ISubActivity } from "@/common"

export const getFromChargeDetailVos = (
  defaultValues: ISubActivity,
  type: string,
  key: string
) => {
  const contentList = defaultValues.contentList || []
  if (contentList.length === 0) {
    return []
  }
  const chargeDetailVos = contentList[0].subsidy.chargeDetailVos
  if (chargeDetailVos.length === 0) {
    return []
  }

  return chargeDetailVos[0][type]?.[key] || 0
}