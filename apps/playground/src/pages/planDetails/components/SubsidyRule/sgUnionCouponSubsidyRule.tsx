import {
  MerchantMaxSubsidyTable,
  SubMarketingPlan,
  SubsidyConditionKeyEnum,
  SubsidyLevelEnum,
} from '@/common'
import { MerchantMaxSubsidyScene } from '@/common/components/zspt/SubsidyTable/MerchantMaxSubsidy/columns'

export type UnionCouponSubsidyRuleFieldProps = {
  detail: SubMarketingPlan
}

export const SgUnionCouponSubsidyRule = ({
  detail = {} as SubMarketingPlan,
}: UnionCouponSubsidyRuleFieldProps) => {
  const OutSite = (detail?.subsidyRule || []).find(
    (e) => e.scene === SubsidyLevelEnum.OutSite
  )
  return (
    <div className="flex flex-col">
      {OutSite ? (
        <div className="flex flex-row  min-w-[600px]">
        <div>
          <div className="text-sm mb-1">商家佣金比例：{detail?.commissionRatio}%</div>
          <div className="text-sm mb-1">商家最高补贴：</div>
          <MerchantMaxSubsidyTable
            subsidyConditionKey={
              SubsidyConditionKeyEnum.ScCouponThreshold
            }
            scene={MerchantMaxSubsidyScene.UnionCouponPlanView}
            rules={detail?.subsidyRule}
            subsidyScene={SubsidyLevelEnum.OutSite}
          />
        </div>
      </div>
      ) : (
        <></>
      )}
    </div>
  )
}
