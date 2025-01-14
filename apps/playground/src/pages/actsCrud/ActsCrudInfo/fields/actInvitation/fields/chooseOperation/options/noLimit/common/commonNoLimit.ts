import { ActionTypeEnum } from '@/common/constants'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../../../interface'

export const commonNoLimitOption = () =>
  nodeUtil.createNode<any, CommonActCrudFormState>(
    `${ActionTypeEnum.Unlimited}`,
    {
      name: '不限制',
    }
  )
