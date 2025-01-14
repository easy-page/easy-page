import {
  promotionQualifyContainer,
  unionCouponQualify,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const applyQualify = promotionQualifyContainer().appendChildren([
  unionCouponQualify,
])
