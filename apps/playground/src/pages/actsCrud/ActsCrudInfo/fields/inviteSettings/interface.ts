import { ActivityStatusEnum, CanApplyRoleEnum } from '@/common'
import { InviteWay, UplaodIdState } from '../interface'
import { SelectState } from '@easy-page/antd-ui'

export type CommonInviteSettingsFormState = {
  promotionType: string
  actId: number
  actName: string
  actStatus: ActivityStatusEnum
  chooseOperation: string
  dataType: InviteWay
  canApplyRole?: CanApplyRoleEnum[]
  inputIdsWay: string
  inputId: string
  uploadId: UplaodIdState
  filterRule: SelectState<number | null>
}
