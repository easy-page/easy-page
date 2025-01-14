import {
  PLAN_STATUS_DESC,
  PlanStatusEnum,
  PlanStatusTag,
  StatusTagSizeEnum,
} from '@/common';

export type PlanTitleProps = {
  title: string;
  status: PlanStatusEnum;
};
export const PlanTitle = ({ title, status }: PlanTitleProps) => {
  return (
    <div className="flex flex-row items-center justify-start">
      <div className="font-bold text-xl mr-2 ">{title}</div>
      {status ? (
        <PlanStatusTag
          status={status}
          size={StatusTagSizeEnum.Small}
        ></PlanStatusTag>
      ) : (
        <></>
      )}
    </div>
  );
};
