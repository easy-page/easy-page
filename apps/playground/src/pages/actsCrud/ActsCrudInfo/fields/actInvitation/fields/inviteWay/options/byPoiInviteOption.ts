import { nodeUtil } from '@easy-page/antd-ui'
import { InviteWay } from '../../../../interface'

export const byPoiInviteOption = () =>
  nodeUtil.createNode(InviteWay.ByPoiInvite, { name: '通过门店邀请' })
