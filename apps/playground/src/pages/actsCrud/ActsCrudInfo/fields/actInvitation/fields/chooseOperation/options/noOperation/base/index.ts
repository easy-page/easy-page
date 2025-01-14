import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common/constants'
import { CommonActCrudFormState } from '../../../../../../interface'

export const noOperation = () =>
  nodeUtil.createNode<any, CommonActCrudFormState>(
    `${ActionTypeEnum.NoChange}`,
    {
      name: '不操作',
    }
  )
