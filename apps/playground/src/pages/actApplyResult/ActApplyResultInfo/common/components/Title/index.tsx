import {
  ACTIVITY_STATUS_DESC,
  ActStatusTag,
  ActivityStatusEnum,
  StatusTagSizeEnum,
} from '@/common';

export type ActTitleProps = {
  title: string;
  status: ActivityStatusEnum;
};
export const ActTitle = ({ title, status }: ActTitleProps) => {
  return (
    <div className="flex flex-row items-center justify-start mb-4">
      <div className="font-bold text-xl mr-2 ">{title}</div>
      {status ? (
        <ActStatusTag status={status} size={StatusTagSizeEnum.Small}>
          {status ? ACTIVITY_STATUS_DESC[status] : '-'}
        </ActStatusTag>
      ) : (
        <></>
      )}
    </div>
  );
};
