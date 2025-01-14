import { CanApplyRoleEnum, PoiTypeEnum } from '@/common'
import { createApplyRoleOption } from '../base'
import { InviteWay } from '../../interface'

export const cityManagerRoleOption = createApplyRoleOption({
  id: CanApplyRoleEnum.CityManager,
  label: '合作商CM（城市经理）',
  disabled: true,
  show({ effectedData }) {
    return (
      effectedData['dataType'] === InviteWay.ByPoiInvite && effectedData['poiType'] &&
      effectedData['poiType'] !== PoiTypeEnum.Direct
    )
  },
})
