import { nodeUtil } from '@easy-page/antd-ui'
import { chargeOptionEffect } from './effects'
import {
  commonAgentChargeOption,
  commonChargeFlowType,
  commonDirectMtChargeOption,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const csChargeFlowType = nodeUtil.extends(
  commonChargeFlowType().appendChildren([
    commonDirectMtChargeOption(),
    commonAgentChargeOption(),
  ]),
  {
    fieldUIConfig: chargeOptionEffect,
  }
)
