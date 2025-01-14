import {
  SubsidyChargeKeyEnum,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  SubsidyOptEnum,
  SubsidyRule,
} from '@/common'
import { MerchantMaxSubsidyFormState } from '../../subPlan'

const getOp = (totalLine: number, curLine: number) => {
  const isLastLine = totalLine - 1 === curLine
  const isFirstLine = curLine === 0
  if (totalLine === 1) {
    return SubsidyOptEnum.Gt
  }
  if (isLastLine) {
    return SubsidyOptEnum.Ge
  }

  if (isFirstLine) {
    return SubsidyOptEnum.OpenInterval
  }
  return SubsidyOptEnum.LcRoInterval
}

const getOpOfSg = (totalLine: number, curLine: number) => {
  const isLastLine = totalLine - 1 === curLine
  if (totalLine === 1 || isLastLine) {
    // 只有一行或者多行的最后一行
    return SubsidyOptEnum.Ge
  }

  return SubsidyOptEnum.LcRoInterval
}

export const postprocessMerchantMaxSubsidy = (
  data: Partial<MerchantMaxSubsidyFormState>[]
): SubsidyRule => {
  const maxSubsidy: SubsidyRule = {
    scene: SubsidyLevelEnum.Expand,
    rule: data.map((each, idx) => {
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScOrderPriceWithoutCoupon,
          opt: getOp(data.length, idx),
          minValue: each.quanqianPrice?.min,
          maxValue: each.quanqianPrice?.max,
        },
        charge: [
          {
            key: SubsidyChargeKeyEnum.ChargeSidePoi,
            opt: SubsidyOptEnum.Le,
            minValue: '',
            maxValue: each.merchantRequestPrice,
          },
        ],
      }
    }),
  }
  return maxSubsidy
}
export const sgShenQuanPostprocessMerchantMaxSubsidy = (
  data: Partial<MerchantMaxSubsidyFormState>[]
): SubsidyRule => {
  const maxSubsidy: SubsidyRule = {
    scene: SubsidyLevelEnum.Expand,
    rule: data.map((each, idx) => {
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScCouponThreshold,
          opt: getOpOfSg(data.length, idx),
          minValue: each.quanqianPrice?.min,
          maxValue: each.quanqianPrice?.max,
        },
        charge: [
          {
            key: SubsidyChargeKeyEnum.chargeSidePoi4Sg,
            opt: SubsidyOptEnum.Le,
            minValue: '',
            maxValue: each.merchantRequestPrice,
          },
        ],
      }
    }),
  }
  return maxSubsidy
}

export const sgUnionCouponPostprocessMerchantMaxSubsidy = (
  data: Partial<MerchantMaxSubsidyFormState>[]
): SubsidyRule => {
  const maxSubsidy: SubsidyRule = {
    scene: SubsidyLevelEnum.OutSite,
    rule: data.map((each, idx) => {
      return {
        condition: {
          key: SubsidyConditionKeyEnum.ScCouponThreshold,
          opt: getOpOfSg(data.length, idx),
          minValue: each.quanqianPrice?.min,
          maxValue: each.quanqianPrice?.max,
        },
        charge: [
          {
            key: SubsidyChargeKeyEnum.chargeSidePoi4Sg,
            opt: SubsidyOptEnum.Le,
            minValue: '',
            maxValue: each.merchantRequestPrice,
          },
        ],
      }
    }),
  }
  return maxSubsidy
}
