import { ActivityStatusEnum } from '@/common'
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
// import { commonChooseOperationOfEdit } from '../../fields/chooseOperation/common'

export const invitationOfEditScene =
  commonChooseOperationOfEdit().appendChildren([
    /** 都展示 */
    commonNoOperationOfEdit().appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),
    replaceAllPoiOptionOfEdit().appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),

    // 追加商家
    addPoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created, // 待邀请
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),

    // 删除商家
    removePoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([
      commonInviteWayOfEdit(), // 邀请方式
      commonInputIdsWayOfEdit, // 录入方式
      invitationTips,
      poiList(), // 查看商家名单按钮
    ]),
  ])

export const csInvitationOfEditScene =
  commonChooseOperationOfEdit().appendChildren([
    /** 都展示 */
    commonNoOperationOfEdit().appendChildren([
      // commonInviteWayOfEdit(),
      // commonInputIdsWayOfEdit,
      // invitationTips,
      // poiList(),
    ]),
    replaceAllPoiOptionOfEdit().appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),
    addPoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),
    removePoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ],
    }).appendChildren([
      commonInviteWayOfEdit(),
      commonInputIdsWayOfEdit,
      invitationTips,
      poiList(),
    ]),
  ])
