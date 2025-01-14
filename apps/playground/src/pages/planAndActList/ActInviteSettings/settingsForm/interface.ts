import { ToolbarProps } from '@/common/fields/common/toolbar/interface'
import {
  CommonActCrudFormProps,
  InviteWay,
  UplaodIdState,
} from '@/pages/actsCrud/ActsCrudInfo'
import { SelectState } from '@easy-page/antd-ui'
import { ActFullInfo, ActivityStatusEnum, CanApplyRoleEnum } from '@/common'

export type ShyInviteSettingFormState = ActFullInfo & {
  promotionType: string
  actId: number
  actName: string
  actStatus: ActivityStatusEnum
  chooseOperation: string
  dataType: InviteWay
  canApplyRole: CanApplyRoleEnum[]
  inputIdsWay: string
  inputId: string
  uploadId: UplaodIdState
  filterRule: SelectState<number | null>
}
export type ShyInviteSettingFormProps = ToolbarProps &
  Pick<
    CommonActCrudFormProps,
    'brandInviteTemplateUrl' | 'poiInviteTemplateUrl'
  >
