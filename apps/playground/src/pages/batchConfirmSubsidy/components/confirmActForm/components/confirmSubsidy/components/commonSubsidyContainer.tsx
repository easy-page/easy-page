import { OperationType, getOperationType } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import classNames from 'classnames'

export const commonSubsidyContainer = ({
  id,
  title,
}: {
  id: string
  title: string
}) =>
  nodeUtil.createContainer(id, ({ children }) => {
    return (
      <div className="flex pl-6 relative mt-4">
        <div className="mt-[4px] mr-4" style={{ fontWeight: 700 }}>
          {title}
        </div>
        <div className="flex flex-col ml-2">{children}</div>
      </div>
    )
  })

export const commonSubsidyInputContainer = ({ id }: { id: string }) =>
  nodeUtil.createContainer(id, ({ children }) => {
    return <div className="flex  w-[880px] justify-between">{children}</div>
  })
