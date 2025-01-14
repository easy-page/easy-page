import { nodeUtil } from '@easy-page/antd-ui'

export const csActPeriod = nodeUtil.createCustomField(
  'activity.promotionTime.period',
  '',
  () => <></>,
  {
    value: '00:00-23:59',
  },
  {
    formItem: { noStyle: true },
  }
)
