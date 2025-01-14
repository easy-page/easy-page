import { inviteWay } from './base'
import { byPoiInviteOption, byMerchantBrand } from './options'

/** 神会员活动邀请方式 */
export const shyInviteWayOfCreate = inviteWay().appendChildren([
  byPoiInviteOption(),
  byMerchantBrand(),
])
