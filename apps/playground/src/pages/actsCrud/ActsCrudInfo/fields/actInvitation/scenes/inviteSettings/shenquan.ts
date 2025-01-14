import { chooseOperationOfSettings } from '../../fields/chooseOperation/common'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfInviteSettings,
  commonNoLimitOptionOfSettings,
  commonSgPoiListOfSettings,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
  shyInputWayOfSettingsWithFilter,
  shyNoOperationOfSettings,
} from '../../fields'
import { invitationTipsOfSettings } from '../../fields/invitationTips'
import { ActivityStatusEnum } from '@/common'
import { shenquanInviteWayOfInviteSettings } from '../../fields/inviteWay/common/shenquanOfSettings'

const commonInfos = [
  shenquanInviteWayOfInviteSettings({}), // 邀请方式
  // commonInviteWayOfInviteSettings({}),
  shyInputWayOfSettingsWithFilter, // 录入方式
  invitationTipsOfSettings,
  commonSgPoiListOfSettings,
]

export const shenquanInvitationOfSettingsScene =
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
