import { SubMarketingPlanStatus } from '@/common';
import { OperationContext } from './interface';
import { DeleteBtn } from './deleteBtn';
import { StopBtn } from './stopBtn';

export const SubPlanOperation: Record<
  SubMarketingPlanStatus,
  React.FC<OperationContext>
> = {
  [SubMarketingPlanStatus.Started]: StopBtn,
  [SubMarketingPlanStatus.ToStart]: DeleteBtn,
  [SubMarketingPlanStatus.End]: () => <></>,
  [SubMarketingPlanStatus.Pause]: () => <></>,
};
