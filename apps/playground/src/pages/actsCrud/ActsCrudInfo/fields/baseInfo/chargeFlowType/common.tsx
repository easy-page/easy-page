import { nodeUtil } from '@easy-page/antd-ui'
import { chargeFlowType } from './base'
import { commonAgentChargeOption, commonDirectMtChargeOption } from './options'
import { AuthResInfo, PoiTypeEnum } from '@/common'

export const commonChargeFlowType = () =>
  nodeUtil.extends(
    chargeFlowType({
      disableExtraTips: false,
    }).appendChildren([
      commonDirectMtChargeOption({
        disableAllForSomeWithNoAuth: true,
      }),
      commonAgentChargeOption({
        disableAllForSomeWithNoAuth: true,
      }),
    ]),
    {
      required: false,
      validate() {
        return () => {
          return { success: true }
        }
      },
    }
  )
