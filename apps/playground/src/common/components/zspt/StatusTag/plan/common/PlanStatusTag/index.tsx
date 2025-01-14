import { PLAN_STATUS_DESC, PlanStatusEnum } from '@/common/constants';
import { PlanStatusColors } from './constant';
import classNames from 'classnames';
import { StatusTagSizeEnum } from '../../../common';

export const PlanStatusTag = ({
  status,
  children,
  size,
}: {
  status: PlanStatusEnum;
  size: StatusTagSizeEnum;
  children?: any;
}) => {
  const config = PlanStatusColors[status];
  const text = PLAN_STATUS_DESC[status];
  return (
    <span
      style={{
        backgroundColor: config.bgColor,
        color: config.fontColor,
      }}
      className={classNames('rounded-sm  flex items-center w-fit', size)}
    >
      {children || text}
    </span>
  );
};
