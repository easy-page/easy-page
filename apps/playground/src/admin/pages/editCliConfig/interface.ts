import {
  TemplateIdType,
  FieldConfig,
} from '@/common/constants/fieldMaps/interface'
import { ConfigFormProps } from '../crudConfig/interface'
import { SelectState } from '@easy-page/antd-ui'
import { ConfigListInfo } from '@/common/apis/getConfigList'
import { ConfirmDialogManagerState } from '@/common/fields'
import { ChargeSideEnum } from '@/common'
import { FiedConfigs } from '@/pages/actsCrud/ActsCrudInfo/common'

// key 为所选字段的 ID
export type FieldBelongState = Record<string, TemplateIdType>

export type EditCliConfigFormState = FiedConfigs & {
  fields: Array<string[]>
  template: SelectState<TemplateIdType>
  belong: FieldBelongState
  confirmDialogManager: ConfirmDialogManagerState
  fullConfig: ConfigListInfo
  refreshConfig: number
  fileName: string
  actPrefix: string
  bgBuList: SelectState<ChargeSideEnum[]>
  needPnCheck: boolean
}

export type EditCliConfigFormProps = ConfigFormProps & {
  configsMap: Partial<Record<TemplateIdType, ConfigListInfo>>
}
