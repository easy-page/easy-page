import { SubMarketingPlan } from '@/common';
import { InfoField } from '../InfoField';

export type SubPlanBaseProps = {
  detail?: SubMarketingPlan;
};
export const SubPlanBaseInfo = ({
  detail = {} as SubMarketingPlan,
}: SubPlanBaseProps) => {
  const groupInfo = (detail.businessPartition?.[0]?.oriMisId || []).join(',');
  return (
    <div className="flex flex-col">
      <InfoField label="子方案名称" content={detail.name} />
      <InfoField label="可用人群" content={groupInfo} />
    </div>
  );
};
