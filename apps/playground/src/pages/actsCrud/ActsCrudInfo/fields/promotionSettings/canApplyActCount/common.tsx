import { applyActRestrict, applyActMinCount, applyActMaxCount } from './fields'
import { baseCanApplyActCount } from './base'

export const canApplyActCount = baseCanApplyActCount().appendChildren([
  applyActRestrict,
  applyActMinCount,
  applyActMaxCount,
])
