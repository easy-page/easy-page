import { SubsidyLevelEnum, SubsidyRule } from '@/common/apis'
import { SubsidyConditionKeyEnum } from '@/common/constants'
// 基础档位
export const preprocessBaseLevelMerchantMaxSubsidy = (
  rules?: SubsidyRule[]
) => {
  const baseLevel = (rules || []).find((e) => e.scene === SubsidyLevelEnum.Base)
  if (!baseLevel) {
    return undefined
  }

  const baseLevelRule = baseLevel.rule?.[0]
  if (!baseLevelRule) {
    return undefined
  }
  const baseLevelRuleCharge = baseLevelRule.charge?.[0]

  return baseLevelRuleCharge?.minValue
}

export type QuanqianJiaState = {
  min?: string
  max?: string
}

export type MerchantMaxSubsidyField = {
  quanqianPrice: QuanqianJiaState
  merchantRequestPrice: string
}

// 膨胀档位
export const preprocessExpandMerchantMaxSubsidy = ({
  subsidyRule,
  subsidyConditionKey = SubsidyConditionKeyEnum.ScOrderPriceWithoutCoupon,
  subsidyScene = SubsidyLevelEnum.Expand,
}: {
  subsidyRule?: SubsidyRule[]
  subsidyConditionKey?: SubsidyConditionKeyEnum,
  subsidyScene?: SubsidyLevelEnum
}): Partial<MerchantMaxSubsidyField>[] => {
  const defaultValue = []
  if (!subsidyRule) {
    return defaultValue
  }
  const subsidyLevel = subsidyRule?.find(
    (e) => e.scene === subsidyScene
  )
  if (!subsidyLevel) {
    return defaultValue
  }
  // 商家最高补贴表格
  const rules = (subsidyLevel.rule || []).filter(
    (e) => e.condition.key === subsidyConditionKey
  )
  return rules.map((each) => ({
    quanqianPrice: {
      max: each.condition?.maxValue,
      min: each.condition?.minValue || '0',
    },
    merchantRequestPrice: each.charge?.[0]?.maxValue,
  }))
}
