import {
  MerchantMaxSubsidyTable,
  MtLowestSubsidyTable,
  SubMarketingPlan,
  preprocessBaseLevelMerchantMaxSubsidy,
} from '@/common';
import { InfoField } from '../InfoField';

export type SubsidyRuleFieldProps = {
  detail: SubMarketingPlan;
};
export const SubsidyRuleField = ({
  detail = {} as SubMarketingPlan,
}: SubsidyRuleFieldProps) => {
  return (
    <div className="flex flex-col">
      <InfoField
        label="基础档位"
        content={`商家最高补贴${
          preprocessBaseLevelMerchantMaxSubsidy(detail.subsidyRule) || '-'
        }元，不限制订单券前价`}
      />
      <InfoField
        label="膨胀档位"
        content={
          <div className="flex flex-row  min-w-[600px]">
            <div>
              <div className="text-sm mb-1">商家最高补贴</div>
              <MerchantMaxSubsidyTable rules={detail.subsidyRule} />
            </div>
            <div className="ml-7">
              <div className="text-sm mb-1">美团最低补贴</div>
              <MtLowestSubsidyTable rules={detail.subsidyRule} />
            </div>
          </div>
        }
      />
    </div>
  );
};
