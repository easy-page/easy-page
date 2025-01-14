import { chooseOperationOfSettings } from '../../fields/chooseOperation/common'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfEdit,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
  shyInputWayOfSettingsWithFilter,
  shyNoOperationOfSettings,
  shyPoiListOfSettings,
} from '../../fields'
import { ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { commonCanApplyRoleOfEdit, shyCanApplyRoleOfEdit } from '../../../canApplyRole'

const commonInfos = [
  commonInviteWayOfEdit({
    name: '通过业务品牌邀请',
    disabledWithOperations: [
      ActionTypeEnum.Remove,
      ActionTypeEnum.Add,
      ActionTypeEnum.NoChange,
    ],
  }),
  shyCanApplyRoleOfEdit,
  // commonCanApplyRoleOfEdit,
  shyInputWayOfSettingsWithFilter,
  shyPoiListOfSettings,
]

/** 神会员 */
export const shyInvitationOfSettingsScene =
  chooseOperationOfSettings().appendChildren([
    shyNoOperationOfSettings().appendChildren([...commonInfos]),
    replaceAllPoiOptionOfEdit().appendChildren([...commonInfos]),
    addPoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([...commonInfos]),
    removePoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([...commonInfos]),
  ])
2
