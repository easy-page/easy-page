import { QuestionTooltip } from '@/common/components/base/QuestionTooltip'
import { nodeUtil } from '@easy-page/antd-ui'
import classNames from 'classnames'

// 三级标题
export type CreateTertiaryTitleContainerContainerOptions = {
  className?: string
  tooltip?: string
  showTip?: boolean
}

export const createTertiaryTitleContainerContainer = (
  id: string,
  title: string,
  options?: CreateTertiaryTitleContainerContainerOptions
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
            />
          </div>
          <div className="w-full ">{children}</div>
        </div>
      )
    },
    {}
  )
