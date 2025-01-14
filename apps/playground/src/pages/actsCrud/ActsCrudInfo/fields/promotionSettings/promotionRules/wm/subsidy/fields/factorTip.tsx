import { nodeUtil } from '@easy-page/antd-ui'

export const factorTip = nodeUtil.createCustomField(
  'factorTip',
  ' ',
  ({ frameworkProps: { getFormUtil } }) => {
    return <span style={{ color: 'red' }}>以上两折扣因子需至少配置一项</span>
  },
  {
    value: '',
  }
)
