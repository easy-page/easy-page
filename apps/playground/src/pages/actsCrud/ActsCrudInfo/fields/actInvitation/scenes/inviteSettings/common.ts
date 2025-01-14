import { chooseOperationOfSettings } from '../../fields/chooseOperation/common'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfInviteSettings,
  commonNoLimitOptionOfSettings,
  commonSgPoiListOfSettings,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
} from '../../fields'
import { commonInputWayOfSettings } from '../../fields/inputWay/common/inputIdsWayOfSettings'
import { invitationTipsOfSettings } from '../../fields/invitationTips'
import { ActivityStatusEnum } from '@/common'

const commonInfos = [
  commonInviteWayOfInviteSettings({}),
  commonInputWayOfSettings,
  invitationTipsOfSettings,
  commonSgPoiListOfSettings,
]

export const invitationOfSettingsScene =
  chooseOperationOfSettings().appendChildren([
    replaceAllPoiOptionOfEdit().appendChildren([...commonInfos]),
    commonNoLimitOptionOfSettings,
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
