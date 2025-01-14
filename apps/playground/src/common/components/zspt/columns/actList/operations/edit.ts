import { ActInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { OperationEnum, OperationType } from '@/common/constants'

import { toCrudActAction } from './actions/toCrudAct'
import { getShowConfig } from '../../utils'
import { getAuthConfig } from '../../utils/getAuthConfig'

export const actEdit: Operation<ActInfo> = {
  id: OperationEnum.Modify,
  label: '编辑',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showActEditBtn
  }),
  action: toCrudActAction(OperationType.EDIT),
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.actEditAuths
  }),
}
