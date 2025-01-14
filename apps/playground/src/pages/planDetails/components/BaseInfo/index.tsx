import { GetPlanDetailResult } from '@/common';
import { InfoField } from '../InfoField';

export type BaseInfoProps = {
  detail?: GetPlanDetailResult;
};
export const BaseInfo = ({
  detail = {} as GetPlanDetailResult,
}: BaseInfoProps) => {
  return (
    <div className="flex flex-col my-4">
      <InfoField label="方案 ID" content={detail.id} />
      <InfoField label="方案介绍" content={detail.intro} />
    </div>
  );
};
