import {
  applyControlContainer,
  unionCouponCanCancelAct,
  unionCouponCanModify,
  unionCouponNeedAuditRes,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const applyControl = applyControlContainer().appendChildren([
  unionCouponCanCancelAct,
  unionCouponCanModify,
  unionCouponNeedAuditRes,
])
