import { ActInfo } from '@/common/apis'
import type { Operation } from '../../../Operations'

import { OperationEnum, OperationType } from '@/common/constants'
import { toCrudActAction } from './actions/toCrudAct'

import { getAuthConfig } from '../../utils/getAuthConfig'
import { getShowConfig } from '../../utils'

export const actCopy: Operation<ActInfo> = {
  id: OperationEnum.Copy,
  label: '复制',
  action: toCrudActAction(OperationType.COPY),
  show: getShowConfig((fullConfig) => {
    return fullConfig.showActCopyBtn
  }),
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.actCopyAuths
  }),
}
