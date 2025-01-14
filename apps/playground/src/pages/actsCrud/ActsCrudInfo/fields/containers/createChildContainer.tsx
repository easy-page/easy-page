import { BlockColorHeader } from '@/common';
import { nodeUtil } from '@easy-page/antd-ui';
import classNames from 'classnames';

export type CreateChildContainerOptions = {
  className?: string;
  tooltip?: React.ReactNode;
};

/** 子表单里面的小模块容器，带表单标题 */
export const createChildContainer = (
  id: string,
  title: string,
  options?: CreateChildContainerOptions,
) =>
  nodeUtil.createContainer(
    id,
    ({ children }) => {
      return (
        <div className={classNames('flex flex-col mb-4', options?.className)}>
          <BlockColorHeader title={title} tooltip={options?.tooltip} />
          <div className="w-full px-4">{children}</div>
        </div>
      );
    },
    {},
  );

export type CreateContainerOptions = {
  className?: string;
};
// 最外层表单模块标题
export const createContainer = (
  id: string,
  title: string,
  options?: CreateContainerOptions,
) =>
  nodeUtil.createContainer(
    id,
    ({ children }) => {
      return (
        <div className={classNames('flex flex-col', options?.className)}>
          <div className="font-bold text-lg bg-[#F8F8F8] p-2 mb-4">{title}</div>
          <div className="w-full">{children}</div>
        </div>
      );
    },
    {},
  );
