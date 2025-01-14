import { purchaseManagerPageInfo } from './purchaseManagerPageInfo'
import { skuAdminPageInfo } from './skuAdminPageInfo'
import { supplierPageInfo } from './supplierPageInfo'

export const getPageInfo = (idx: number) => {
  if (idx === 0) {
    return skuAdminPageInfo
  }

  if (idx === 1) {
    return purchaseManagerPageInfo
  }

  if (idx === 2) {
    return supplierPageInfo
  }
}
