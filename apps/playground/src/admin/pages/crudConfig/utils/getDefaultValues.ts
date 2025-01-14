import {
  getOperationType,
  IsConfigTemplate,
  OperationType,
  UserInfo,
} from '@/common'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { cloneDeep, set } from 'lodash'

export type GetActDefaultValueOption = {
  config?: ConfigListInfo
  userInfo?: UserInfo
}
const getCopyDefaultValues = ({
  config,
  userInfo,
}: GetActDefaultValueOption): Record<string, any> => {
  const defaultValues = cloneDeep(config || {}) as ConfigListInfo
  const userMis = userInfo?.mis
  set(defaultValues, 'crudConfig.fileName', '')
  set(defaultValues, 'name', '')
  set(defaultValues, 'desc', '')
  set(defaultValues, 'crudConfig.actPrefix', '')
  set(defaultValues, 'config.actType', '')
  set(defaultValues, 'config.planType', '')
  set(defaultValues, 'config.templateInfo', {})
  set(defaultValues, 'isTemplate', `${IsConfigTemplate.No}`)
  set(defaultValues, 'config.applyDefaultRole', undefined)
  set(defaultValues, 'owner', userMis)
  set(defaultValues, 'managers', userMis)
  set(defaultValues, 'whiteList', userMis)
  return defaultValues
}

export const getConfigDefaultValues = ({
  config,
  userInfo,
}: GetActDefaultValueOption): Record<string, any> => {
  const operationType = getOperationType()
  if (operationType === OperationType.CREATE) {
    return {}
  }
  if ([OperationType.EDIT, OperationType.VIEW].includes(operationType)) {
    return config || {}
  }

  if (operationType === OperationType.COPY) {
    return getCopyDefaultValues({ config, userInfo })
  }
}
