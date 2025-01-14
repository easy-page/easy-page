import { OperationType, getOperationType } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import classNames from 'classnames'
import './index.less'

export const formBlockTitle = (id: string, title: string) =>
  nodeUtil.createContainer(id, ({ children }) => {
    return (
      <div className="flex  flex-col pl-6 relative mt-4">
        <div className="block-title  mb-2">{title}</div>
        {children}
      </div>
    )
  })

export const formBlockRowTitle = (id: string, title: string) =>
  nodeUtil.createContainer(id, ({ children }) => {
    return (
      <div className="flex pl-6 mb-2 mt-4 relative items-center">
        <div className="block-title mr-4">{title}</div>
        {children}
      </div>
    )
  })
