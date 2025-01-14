import { nodeUtil } from '@easy-page/antd-ui'
import { Card } from 'antd'
import React from 'react'

export const baseOrExpandFieldContainer = (title: string | React.ReactNode) =>
  nodeUtil.createCustomField(
    'subsidy-base-container',
    ' ',
    ({ children }) => {
      return (
        <Card title={title} className="min-w-[1100px]">
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
        labelCol: { span: 3 },
        wrapperCol: { span: 22 },
      },
    }
  )
