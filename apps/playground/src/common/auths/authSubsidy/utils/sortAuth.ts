import { CheckSubsidyItem } from '@/common/constants'

const SortedAuthItems: CheckSubsidyItem[] = [
  CheckSubsidyItem.CheckBrandChargeAuth,
  CheckSubsidyItem.CheckMtChargeAuth,
  CheckSubsidyItem.CheckPoiConfirmMtChargeAuth,
]

export const sortAuthItems = (authItems: CheckSubsidyItem[]) => {
  const sorted: CheckSubsidyItem[] = []
  SortedAuthItems.forEach((each) => {
    if (authItems.includes(each)) {
      sorted.push(each)
    }
  })
  return sorted
}
