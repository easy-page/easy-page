import { ISubActivity, SubsidyInfoOfFront } from '@/common'

export const getChargeDetailVosFromSubAct = (
  subAct: ISubActivity,
  key: keyof SubsidyInfoOfFront
) => {
  if ((subAct?.contentList || []).length === 0) {
    return undefined
  }
  const subsidy = subAct.contentList[0].subsidy
  const chargeDetail = subsidy.chargeDetailVos?.[0]
  if (!chargeDetail) {
    return undefined
  }
  return chargeDetail[key]
}
