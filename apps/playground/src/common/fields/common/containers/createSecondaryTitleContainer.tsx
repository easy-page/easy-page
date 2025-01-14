import { nodeUtil } from '@easy-page/antd-ui';
import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import classNames from 'classnames';

// 二级标题
export type CreateSecondaryTitleContainerOptions = {
  className?: string;
  tooltip?: string
  showTip?: boolean
};

export const createSecondaryTitleContainer = (
  id: string,
  title: string,
  options?: CreateSecondaryTitleContainerOptions,
) =>
  nodeUtil.createContainer(
    id,
    ({ children }) => {
      return (
        <div className={classNames('flex flex-col', options?.className)}>
          <div className="flex flex-row items-center mb-4   pb-2">
            <QuestionTooltip
              showTip={options?.showTip}
              text={<div className="font-bold text-[16px]">{title}</div>}
              tooltip={options?.tooltip}
              placement="right"
            />
          </div>
          <div className="w-full">{children}</div>
        </div>
      );
    },
    {},
  );
