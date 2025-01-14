import { commonChooseOperationOfEdit } from '../../fields/chooseOperation/common/commonOfEdit'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfEdit,
  poiList,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
  shyInputIdsWayOfEditWithFilter,
} from '../../fields'
import { ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { poiTypeTips } from '../../fields/poiTypeTips'
import { shyCanApplyRoleOfEdit } from '../../../canApplyRole'
import { noOperation } from '../../fields/chooseOperation/options/noOperation/base'

const commonFields = [
  commonInviteWayOfEdit({
    name: '通过业务品牌邀请',
    disabledWithOperations: [
      ActionTypeEnum.Remove,
      ActionTypeEnum.Add,
      ActionTypeEnum.NoChange,
    ],
  }),
  shyCanApplyRoleOfEdit,
  shyInputIdsWayOfEditWithFilter,
  poiList(),
  poiTypeTips,
]

export const shyInvitationOfEditScene =
  commonChooseOperationOfEdit().appendChildren([
    /** xinghuan 说不操作时都展示 */
    noOperation().appendChildren([...commonFields]),
    replaceAllPoiOptionOfEdit().appendChildren([...commonFields]),
    addPoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
        ActivityStatusEnum.Inviting,
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Terminated,
      ],
    }).appendChildren([...commonFields]),
    removePoiOptionOfEdit({
      excludeStatus: [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
        ActivityStatusEnum.Inviting,
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Terminated,
      ],
    }).appendChildren([...commonFields]),
  ])
