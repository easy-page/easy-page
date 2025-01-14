import { OperationType, ConfigPublishStatus } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { EditableConfig } from '@easy-page/antd-ui'
import { ConfigFormState } from '../interface'
import { ConfigListInfo } from '@/common/apis/getConfigList'

const configEditableConfigMap: Record<
  OperationType,
  (config: ConfigListInfo) => EditableConfig<ConfigFormState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (config) => {
    const isPublished = config.publishStatus === ConfigPublishStatus.Published
    if (isPublished) {
      return {
        canNotEditKeys: [
          // 'isTemplate',
          // 'fileName',
          // 'name',
          // 'bizLine',
          // 'type',
          // 'actPrefix',
          // 'actType',
          // 'planType',
          // 'applyDefaultRole',
          // 'templateInfo.name',
          // 'templateInfo.test',
          // 'templateInfo.prod',
        ],
      }
    }
    return {
      canNotEditKeys: ['isTemplate'],
    }
  },
}

export const getEditableConfig = (
  config: ConfigListInfo
): EditableConfig<ConfigFormState> => {
  const operationType = getOperationType()
  return configEditableConfigMap[operationType || OperationType.CREATE](config)
}
