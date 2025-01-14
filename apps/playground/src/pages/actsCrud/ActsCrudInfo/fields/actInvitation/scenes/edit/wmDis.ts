import { ActionTypeEnum, ActivityStatusEnum } from '@/common'
import {
  addPoiOptionOfEdit,
  commonChooseOperationOfEdit,
  commonInputIdsWayOfEdit,
  commonInviteWayOfEdit,
  commonNoOperationOfEdit,
  invitationTips,
  poiList,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
} from '../../fields'
import { wmDisCanApplyRole } from '../../../canApplyRole'
import { commonInputIdsWayOfEditWithFilter } from '../../fields/inputWay/InputWayOfEditWithFilter'
// import { commonChooseOperationOfEdit } from '../../fields/chooseOperation/common'

const commonFields = [
  commonInviteWayOfEdit({
    name: '通过业务品牌邀请',
    disabled: true,
    disabledWithOperations: [
      ActionTypeEnum.Remove,
      ActionTypeEnum.Add,
      ActionTypeEnum.NoChange,
    ],
  }),
  wmDisCanApplyRole, // 可报名角色
  commonInputIdsWayOfEditWithFilter,
  invitationTips,
  poiList(),
]

export const wmDisInvitationOfEditScene =
  commonChooseOperationOfEdit().appendChildren([
    // 不操作
    commonNoOperationOfEdit().appendChildren([...commonFields]),

    // 整体替换
    replaceAllPoiOptionOfEdit().appendChildren([...commonFields]),

    // 追加商家
    addPoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created, // 待邀请
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([...commonFields]),

    // 删除商家
    removePoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([...commonFields]),
  ])
