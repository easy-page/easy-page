import { BizLineEnum } from '../../../../../../common/constants/bizline.ts'
import { FactorInfoConfig } from '../../../../../../common/apis/getConfigList/index.ts'
import { ActTypeEnum } from '../../../../../../common/constants/actTemplateIds.ts'

export type CloneFileObjParamType = {
  fileName: string
  fieldsConfig: any
  actPrefix: string
  actFactorInfo: FactorInfoConfig | undefined
  bizLine: BizLineEnum
  needPnCheck: boolean
  actType: ActTypeEnum
  actName: string
}

export const Basic_Act_Path = '/src/pages/actsCrud/ActsCrudInfo/actsPages'
export const Basic_Temp_Path = '/src/admin/cli/template'
