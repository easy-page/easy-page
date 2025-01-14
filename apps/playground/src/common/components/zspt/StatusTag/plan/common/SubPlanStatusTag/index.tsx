import classNames from 'classnames';
import { SubPlanStatusColors } from './constant';
import {
  SubMarketingPlanStatus,
  SubMarketingPlanStatusText,
} from '@/common/apis';
import { StatusTagSizeEnum } from '../../../common/constant';
export const SubPlanStatusTag = ({
  status,
  size,
}: {
  status: SubMarketingPlanStatus;
  size?: StatusTagSizeEnum;
}) => {
  const config = SubPlanStatusColors[status];
  if (status === SubMarketingPlanStatus.ToStart || !config) {
    return <></>;
  }
  return (
    <span
      style={{
        backgroundColor: config.bgColor,
        color: config.fontColor,
      }}
      className={classNames(
        'rounded-sm  flex items-center w-fit',
        size || StatusTagSizeEnum.Small,
      )}
    >
      {SubMarketingPlanStatusText[status]}
    </span>
  );
};
