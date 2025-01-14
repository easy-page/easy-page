import { commonChooseOperationOfEdit } from '../../fields/chooseOperation/common/commonOfEdit'
import {
  addPoiOptionOfEdit,
  commonInviteWayOfEdit,
  poiList,
  removePoiOptionOfEdit,
  replaceAllPoiOptionOfEdit,
  shyInputIdsWayOfEditWithFilter,
} from '../../fields'
import { ActivityStatusEnum } from '@/common'
import { poiTypeTips } from '../../fields/poiTypeTips'
import { noOperation } from '../../fields/chooseOperation/options/noOperation/base'

const commonFields = [
  commonInviteWayOfEdit({ name: '通过商家品牌邀请' }),
  shyInputIdsWayOfEditWithFilter,
  poiList(),
  poiTypeTips,
]

export const shenquanInvitationOfEditScene =
  commonChooseOperationOfEdit().appendChildren([
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
