import { getOperationType, OperationType } from '@/common'
import { AnyNodesInfoType } from '@easy-page/antd-ui'
import { actInviteContainer } from '../../containers'

export const invitation = (
  nodeMap: Record<OperationType, AnyNodesInfoType>
) => {
  const operationType = getOperationType() || OperationType.CREATE
  const curInviteInfo = nodeMap[operationType]
  console.log('curInviteInfo:', curInviteInfo)
  return actInviteContainer().appendChildren([...curInviteInfo])
}

export * from './commonSgInvitation'
export * from './shyCommonSgInvitation'

export * from './shenquanCommonSgInvitation'
export * from './unioncouponSgInvitation'
