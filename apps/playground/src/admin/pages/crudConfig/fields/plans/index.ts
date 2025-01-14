import { nodeUtil } from '@easy-page/antd-ui'
import {
  fieldContainer,
  opActionContainer,
  opAuthContainer,
  operationContainer,
  opShowContainer,
  otherContainer,
  planContainer,
} from '../titleContainers'
import { ConfigFormState } from '../../interface'
import { ConfigType } from '@/common'
import { useNewZsptFramework } from '../others/useNewZsptFramework'
import { planCopyBtnAuths, planEditBtnAuths } from './operations/auth'
import { planType } from './planType'
import { authPlanOptionsInfo } from '../operation/actions/authPlanOptionsInfo'
import { showPlanBtns } from './operations/show'
import { usePlanSendInviteDefaultAction } from './operations/action/usePlanSendInviteDefaultAction'
import { usePlanViewDefaultAction } from './operations/action/usePlanViewDefaultAction'
import { usePlanWithdrawDefaultAction } from './operations/action/usePlanWithdrawDefaultAction'
import { planBaseInfo } from './baseInfo'
export const planSettings = nodeUtil.extends<any, ConfigFormState>(
  planContainer().appendChildren([
    planBaseInfo,
    operationContainer().appendChildren([
      opShowContainer().appendChildren(showPlanBtns),
      opAuthContainer().appendChildren([
        planEditBtnAuths,
        planCopyBtnAuths,
        authPlanOptionsInfo,
      ]),
      opActionContainer().appendChildren([
        usePlanSendInviteDefaultAction,
        usePlanWithdrawDefaultAction,
        usePlanViewDefaultAction,
      ]),
    ]),
    otherContainer().appendChildren([useNewZsptFramework]),
  ]),
  {
    when() {
      return {
        effectedKeys: ['type'],
        show({ effectedData }) {
          return effectedData['type'] === `${ConfigType.Plan}`
        },
      }
    },
  }
)
