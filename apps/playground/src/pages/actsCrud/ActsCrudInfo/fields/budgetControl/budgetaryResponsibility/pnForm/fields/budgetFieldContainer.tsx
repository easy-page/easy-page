import { nodeUtil } from '@easy-page/antd-ui'

export const budgetFieldContainer = nodeUtil.createContainer(
  'budget-field',
  ({ children }) => {
    return <div className="flex flex-row items-start">{children}</div>
  }
)
