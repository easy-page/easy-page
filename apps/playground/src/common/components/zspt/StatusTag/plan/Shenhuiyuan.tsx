import { PlanInfo } from '@/common/apis';
import { PlanStatusTag } from './common';
import { PlanStatusEnum } from '@/common/constants';
import { StatusTagSizeEnum } from '../common/constant';

export const ShenhuiyuanPlanStatus = ({ row }: { row: PlanInfo }) => {
  const { statusDesc, status } = row;
  return (
    <div>
      <PlanStatusTag
        size={StatusTagSizeEnum.Small}
        status={status as PlanStatusEnum}
      >
        {statusDesc}
      </PlanStatusTag>
    </div>
  );
};
