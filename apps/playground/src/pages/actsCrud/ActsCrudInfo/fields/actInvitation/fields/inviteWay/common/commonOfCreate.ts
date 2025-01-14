import { inviteWay } from '../base'
import {
  byPoiInviteOption,
  byMerchantBrand,
  ByMerchantBrandOptions,
} from '../options'

export const commonInviteWayOfCreate = (options?: ByMerchantBrandOptions) =>
  inviteWay().appendChildren([byPoiInviteOption(), byMerchantBrand(options)])
