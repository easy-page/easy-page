import {
  ChargeFlowTypeEnum,
  ChargeFlowTypeText,
  PoiTypeEnum,
  AuthTypeEnum,
  AuthResInfo,
} from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { disableActions } from '../../utils/disableChargeFlowOptionActions'

export const commonAgentChargeOption = (options?: {
  disableAllForSomeWithNoAuth?: boolean
}) =>
  nodeUtil.createNode(
    ChargeFlowTypeEnum.AgentMtCharge,
    {
      name: ChargeFlowTypeText.agentMtCharge,
      actions: disableActions(PoiTypeEnum.Direct, {
        resourceId: AuthTypeEnum.AgentMtCharge,
        name: ChargeFlowTypeText.agentMtCharge,
        disableAllForSomeWithNoAuth: options?.disableAllForSomeWithNoAuth,
      }),
    },
    {
      checkBox: {
        disabled: true,
      },
    }
  )
