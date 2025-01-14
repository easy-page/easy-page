import {
  ContainerIds,
  FieldIds,
  FieldOptionIds,
  SubFormIds,
} from '@/common/constants/fieldMaps'
import {
  AnyNodeInfoType,
  EasyPageOnChangeContext,
  EditableConfig,
  NodeInfoWithChildren,
  PageInfo,
} from '@easy-page/antd-ui'
import { ActFullInfo, UserInfo } from '@/common'
import { FiedConfigs } from './commonFieldConfigs'

export type SubFormType = (options: {
  handleChange?: (context: EasyPageOnChangeContext<any>) => void
  pageInfo?: PageInfo<any, any>
}) => AnyNodeInfoType

export type GetDefaultValuesOptions = {
  actDetail?: ActFullInfo
  userInfo?: UserInfo
}

export type FiedIdsType<ActFieldConfigs = FiedConfigs> = (
  options: ActFieldConfigs
) => AnyNodeInfoType

export type AndNodeWithChildren = NodeInfoWithChildren<any, any, any, any>

/** 用于预览和配置 */
export type ConfigsInfoMappingType<
  ActFieldConfigs = FiedConfigs,
  FormState = Record<string, any>
> = {
  fieldsMap?: Partial<Record<FieldIds, FiedIdsType<ActFieldConfigs>>>
  optionsMap?: Partial<Record<FieldOptionIds, () => AndNodeWithChildren>>
  containersMap?: Partial<Record<ContainerIds, () => AndNodeWithChildren>>
  subFormsMap?: Partial<Record<SubFormIds, SubFormType>>
  getEditableConfig?: (actDetail: ActFullInfo) => EditableConfig<FormState>
  getDefaultValues?: ({
    actDetail,
  }: GetDefaultValuesOptions) => Record<string, any>
}
