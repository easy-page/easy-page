import { PlanInfo, MccData } from '../apis'
import { MccKeysEnum, FlowResourceStateEnum } from '../constants'
import { AuthHandler, NetFlowGrayListAll } from './planAndActAuths'

/** 验证流量资源 */
export const authNetFlow: AuthHandler<PlanInfo> = ({
  mccConfig = {} as MccData,
  record,
  userInfo,
}) => {
  const netFlowGraylist: string = mccConfig[MccKeysEnum.NetFlowGrayList] || ''
  const userList = netFlowGraylist.split(',')

  if (
    netFlowGraylist === NetFlowGrayListAll ||
    (userInfo && userList.includes(userInfo.mis))
  ) {
    console.log('在白名单中')
    return { allow: true, continueNextResult: 'allow' }
  }

  const allow =
    record.netFlowActivityWithdrawStatus === FlowResourceStateEnum.Nonentity
  return {
    /** 流量资源不存在，则允许操作，否则，不在白名单中，不允许操作 */
    allow: allow,
    msg: allow ? '' : '无权限操作',
    continueNextResult: 'allow',
  }
}
