import {
  MerchantMaxSubsidyTable,
  MtLowestSubsidyTable,
  SubMarketingPlan,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
  preprocessBaseLevelMerchantMaxSubsidy,
} from '@/common'
import { InfoField } from '../InfoField'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'

export type ShenQuanSubsidyRuleFieldProps = {
  detail: SubMarketingPlan
}

export const SgShenquanSubsidyRule = ({
  detail = {} as SubMarketingPlan,
}: ShenQuanSubsidyRuleFieldProps) => {
  const maxBaseSubsidyPrice = preprocessBaseLevelMerchantMaxSubsidy(
    detail.subsidyRule
  )
  const expandLevel = (detail?.subsidyRule || []).find(
    (e) => e.scene === SubsidyLevelEnum.Expand
  )
  return (
    <div className="flex flex-col">
      {maxBaseSubsidyPrice ? (
        <InfoField
          label="基础档位"
          content={`商家最高补贴${maxBaseSubsidyPrice || '-'}元，不限制券门槛`}
        />
      ) : (
        <></>
      )}
      {expandLevel ? (
        <InfoField
          label="膨胀档位"
          content={
            <div className="flex flex-row  min-w-[600px]">
              <div>
                <div className="text-sm mb-1">商家最高补贴</div>
                <MerchantMaxSubsidyTable
                  subsidyConditionKey={
                    SubsidyConditionKeyEnum.ScCouponThreshold
                  }
                  scene={MerchantMaxSubsidyScene.ShenQuanPlanView}
                  rules={detail.subsidyRule}
                />
              </div>
            </div>
          }
        />
      ) : (
        <></>
      )}
    </div>
  )
}
