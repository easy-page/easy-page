import { ActionTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const chooseOperationNoLimitOptionOfDisabled = nodeUtil.createNode(
  `${ActionTypeEnum.Unlimited}`,
  {
    name: '不限制',
  },
  { radio: { disabled: true } }
)
