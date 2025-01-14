import { OperationType } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { nodeUtil } from '@easy-page/antd-ui'
import classNames from 'classnames'

// 一级标题
export type CreatePrimaryTitleOptions = {
  className?: string
  childrenClassName?: string
}

export const createPrimaryTitleContainer = (
  id: string,
  title: (mode: OperationType) => string,
  options?: CreatePrimaryTitleOptions
) =>
  nodeUtil.createContainer(id, ({ children }) => {
    const mode = getOperationType() || OperationType.CREATE
    return (
      <div id={id} className={classNames('flex flex-col', options?.className)}>
        <div className="font-bold text-[24px] bg-[#F8F8F8] p-2 mb-1">
          {title(mode)}
        </div>
        <div className={classNames('w-full ', options?.childrenClassName)}>
          {children}
        </div>
      </div>
    )
  })
