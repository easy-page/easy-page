import { chooseOperationOfSettings } from '../../fields/chooseOperation/common'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfEdit,
  commonNoLimitOptionOfSettings,
  commonSgPoiListOfSettings,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
  shyNoOperationOfSettings,
} from '../../fields'
import { invitationTipsOfSettings } from '../../fields/invitationTips'
import { ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { wmDiscountInputIdsWayOfSettings } from '../../fields/inputWay/common/wmDiscountInputIdsWayOfSettings'
import { wmDisCanApplyRole } from '../../../canApplyRole'

const commonInfos = [
  commonInviteWayOfEdit({
    name: '通过业务品牌邀请',
    disabled: true,
    disabledWithOperations: [
      ActionTypeEnum.Remove,
      ActionTypeEnum.Add,
      ActionTypeEnum.NoChange,
      ActionTypeEnum.Replace,
    ],
  }),

  wmDisCanApplyRole, // 可报名角色
  wmDiscountInputIdsWayOfSettings,
  invitationTipsOfSettings,
  commonSgPoiListOfSettings,
]

export const wmDiscountInvitationOfSettingsScene =
  chooseOperationOfSettings().appendChildren([
    // 同神会员
    shyNoOperationOfSettings().appendChildren([...commonInfos]),
    replaceAllPoiOptionOfEdit().appendChildren([...commonInfos]),
    addPoiOptionOfEdit({
      // 追加商家
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
