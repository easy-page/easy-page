import { PlanInfo } from '@/common/apis'
import { authPlanTempAndWhiteListAndSelf, AuthSence } from '@/common/auths'
import { Operation } from '../../../Operations'
import { OperationEnum } from '@/common/constants'

import { getShowConfig } from '../../utils'
import { PlanActionHandlersEnum } from '../actions/common/constant'
import { getPlanActionHandler } from '../actions'

/** 非神会员专用 */
export const planSendInvite: Operation<PlanInfo> = {
  id: OperationEnum.Send,
  label: '发布方案',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showPlanSendInviteBtn
  }),

  action: getPlanActionHandler({
    action: PlanActionHandlersEnum.PlanSendInvite,
    defaultAction: () => {
      throw Error('发送邀请暂无默认动作，请实现，或者配置自定义动作')
    },
  }),
  auth: [authPlanTempAndWhiteListAndSelf(AuthSence.PlanList)],
}
