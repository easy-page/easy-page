import { nodeUtil, Empty, RadioEffectedType } from '@easy-page/antd-ui'
import { CommonActCrudFormState, InviteWay } from '../../../../../interface'

export const byConditionFilter = () =>
  nodeUtil.createNode<any, CommonActCrudFormState, Empty, RadioEffectedType>(
    InviteWay.ByFilter,
    {
      name: '根据条件筛选商家',
    }
  )
