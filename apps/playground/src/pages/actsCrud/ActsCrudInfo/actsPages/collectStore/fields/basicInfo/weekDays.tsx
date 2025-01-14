import { nodeUtil } from '@easy-page/antd-ui'
import React from 'react'

export const csWeekDays = nodeUtil.createCustomField(
  'activity.promotionTime.weekTimes',
  '',
  () => <></>,
  {
    value: '1,2,3,4,5,6,7',
  },
  {
    formItem: { noStyle: true },
  }
)
