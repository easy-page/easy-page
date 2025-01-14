import { PlanInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { OperationEnum } from '@/common/constants'
import { authPlanTempAndWhiteListAndSelf, AuthSence } from '@/common/auths'
import { getShowConfig } from '../../utils'
import { getPlanActionHandler } from '../actions'
import { PlanActionHandlersEnum } from '../actions/common/constant'

export const planWithDraw: Operation<PlanInfo> = {
  id: OperationEnum.Withdraw,
  label: '撤回方案',
  show: getShowConfig((full) => {
    return full.showPlanWithdrawBtn
  }),
  action: getPlanActionHandler({
    action: PlanActionHandlersEnum.PlanWithdrawView,
    defaultAction: () => {
      throw Error('方案撤回暂无默认动作，请实现，或者配置自定义动作')
    },
  }),
  auth: [authPlanTempAndWhiteListAndSelf(AuthSence.PlanList)],
}
