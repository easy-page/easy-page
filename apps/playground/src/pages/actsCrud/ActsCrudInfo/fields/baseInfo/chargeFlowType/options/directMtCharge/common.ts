import { nodeUtil, CheckboxEffectedType } from '@easy-page/antd-ui'
import {
  AuthTypeEnum,
  ChargeFlowTypeEnum,
  ChargeFlowTypeText,
  PoiTypeEnum,
} from '@/common/constants'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../../interface'
import { disableActions } from '../../utils/disableChargeFlowOptionActions'
import { AuthResInfo } from '@/common'

export const commonDirectMtChargeOption = (options?: {
  disableAllForSomeWithNoAuth?: boolean
}) =>
  nodeUtil.createNode<
    any,
    CommonActCrudFormState,
    CommonActCrudFormProps,
    CheckboxEffectedType
  >(ChargeFlowTypeEnum.DirectMtCharge, {
    name: ChargeFlowTypeText.directMtCharge,
    actions: disableActions(PoiTypeEnum.Agent, {
      resourceId: AuthTypeEnum.DirectMtCharge,
      name: ChargeFlowTypeText.directMtCharge,
      disableAllForSomeWithNoAuth: options?.disableAllForSomeWithNoAuth,
    }),
  })
