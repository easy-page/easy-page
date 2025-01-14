import { SubsidyConditionKeyEnum, SubsidyLevelEnum } from '@/common'
import { sgShenquanMerchantMaxSubsidyFormInfo } from '@/pages/plansCrud/fields/expandLevel/merchantMaxSubsidyForm/sgShenquanPageInfo'
import { merchantMaxSubsidyForm } from '@/pages/plansCrud/fields/expandLevel/merchantMaxSubsidyFormContainer'
import { sgUnionCouponPostprocessMerchantMaxSubsidy } from '@/pages/plansCrud/fields/expandLevel/utils'

export const ucSettingGears = merchantMaxSubsidyForm({
  pageInfo: sgShenquanMerchantMaxSubsidyFormInfo,
  orderTitle: '券门槛（元）',
  orderTitleTips: '',
  validateMerchantRequestPrice: true,
  merchantRequestExtra: '0~5000，支持一位小数',
  postprocess: sgUnionCouponPostprocessMerchantMaxSubsidy,
  subsidyConditionKey: SubsidyConditionKeyEnum.ScCouponThreshold,
  subsidyScene: SubsidyLevelEnum.OutSite,
})
