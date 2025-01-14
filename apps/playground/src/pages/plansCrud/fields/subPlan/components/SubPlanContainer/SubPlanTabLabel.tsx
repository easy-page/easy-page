import {
  DotText,
  StatusTagSizeEnum,
  SubMarketingPlanStatus,
  SubPlanStatusTag,
} from '@/common';
import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
export type SubPlanTabLabelProps = {
  hasError?: boolean;
  groupStatus: SubMarketingPlanStatus;
  label: string;
  choosed?: boolean;
  idx: number;
};
export const SubPlanTabLabel = ({
  hasError,
  groupStatus,
  label,
  choosed,
  idx,
}: SubPlanTabLabelProps) => {
  return (
    <div className="flex flex-row items-center">
      {hasError ? <CloseCircleOutlined className="mr-1 text-red-600" /> : <></>}
      <div className="flex flex-row items-center">
        <SubPlanStatusTag
          size={StatusTagSizeEnum.Small}
          status={groupStatus}
        ></SubPlanStatusTag>
        <DotText
          className={classNames('max-w-[150px]  text-[16px] ml-1', {
            'font-medium': choosed,
          })}
          line={1}
        >
          {label || `子方案${idx + 1}`}
        </DotText>
      </div>
    </div>
  );
};
