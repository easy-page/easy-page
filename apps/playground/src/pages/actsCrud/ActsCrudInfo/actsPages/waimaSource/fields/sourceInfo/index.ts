import {
  canApplyGoodCount,
  sourceInfoContainer,
  subActBasicInfoContainer,
  subActPromotionName,
  workFlowContainer,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { subSourceInfo } from './sourceInfoTab'
import { actTotalAmount } from './actTotalAmount'
import { sourceInfoName } from './sourceInfoTab/fields/sourceInfoName'
import { placementTime } from './sourceInfoTab/fields/placementTime'
import { placementCity } from './sourceInfoTab/fields/placementCity'
import { targetBrand } from './sourceInfoTab/fields/targetBrand'
import { needSkuApply } from './sourceInfoTab/fields/needSkuApply'
import { sourceRequirement } from './sourceInfoTab/fields/sourceRequirement'
import { sourceRequirement2 } from './sourceInfoTab/fields/sourceRequirement2'
import { requirementInput } from './sourceInfoTab/fields/sourceRequirement/requirementInput'
import { resourceId } from './sourceInfoTab/fields/subActId'

export const wmsSourceInfo = sourceInfoContainer().appendChildren([
  actTotalAmount(),
  subSourceInfo({
    effects: ({ getFormUtil, childForm }) => [],
    nodes: [
      resourceId,
      sourceInfoName,
      sourceRequirement,
      requirementInput,
      placementCity,
      placementTime(),
      targetBrand,
      needSkuApply(),
    ],
  }),
])
