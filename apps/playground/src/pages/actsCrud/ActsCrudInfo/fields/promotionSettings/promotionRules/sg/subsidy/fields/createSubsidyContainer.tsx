import { nodeUtil } from '@easy-page/antd-ui'
import { Card } from 'antd'

export const subsidyFieldContainer = () =>
  nodeUtil.createCustomField(
    'subsidy-container',
    ' ',
    ({ children }) => {
      return (
        <Card title="补贴分摊设置" className="min-w-[1100px]">
          {children}
        </Card>
      )
    },
    {
      childrenUIConfig: {
        formItem: {
          labelCol: { span: 3 },
          wrapperCol: { span: 18 },
        },
      },
    },
    {
      layout: { disableLayout: true },
      formItem: {
        labelCol: { span: 4 },
        wrapperCol: { span: 22 },
      },
    }
  )
