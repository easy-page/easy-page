import { ActionTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'

export const chooseOperationLimitOptionOfDisabled = nodeUtil.createNode(
  `${ActionTypeEnum.Limited}`,
  {
    name: '限制',
  },
  { radio: { disabled: true } }
)
