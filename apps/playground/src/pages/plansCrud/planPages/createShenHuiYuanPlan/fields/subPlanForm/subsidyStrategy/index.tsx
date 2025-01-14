import {
  shyBaseLevel,
  shyExpandLevel,
  subPlanSubsidyContainer,
} from '@/pages/plansCrud/fields'

export const subsidyRule = subPlanSubsidyContainer().appendChildren([
  shyBaseLevel,
  shyExpandLevel,
])
