import { SubsidyConditionKeyEnum } from '@/common'
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import { merchantMaxSubsidyForm } from './merchantMaxSubsidyFormContainer'
import { sgShenQuanPostprocessMerchantMaxSubsidy } from './utils'
import { baseOrExpandFieldContainer } from '../baseOrExpandFieldContainer'
import { sgShenquanMerchantMaxSubsidyFormInfo } from './merchantMaxSubsidyForm/sgShenquanPageInfo'

export const sqExpandLevel = baseOrExpandFieldContainer(
  <QuestionTooltip
    tooltip="享美团平台膨胀商家权益包，更高出资更多权益。（包含基础神券商家的全部权益，并享受定向营销场景大额券带来的流量权益"
    text="膨胀档位"
  ></QuestionTooltip>
).appendChildren([
  // 商家最高补贴要求
  merchantMaxSubsidyForm({
    pageInfo: sgShenquanMerchantMaxSubsidyFormInfo,
    orderTitle: '券门槛（元）',
    orderTitleTips: '',
    validateMerchantRequestPrice: true,
    merchantRequestExtra: '0~5000，支持一位小数',
    postprocess: sgShenQuanPostprocessMerchantMaxSubsidy,
    subsidyConditionKey: SubsidyConditionKeyEnum.ScCouponThreshold,
  }),
])
