import { ActTypeEnum, PoiTypeEnum } from '@/common'
import { ChargeSideOption } from '../fields'

export type FiedConfigs = {
  qualify?: ActTypeEnum
  inputIdsWayOfEdit?: {
    isFilterEnabled?: boolean
  }
  chargeFlowType?: {
    extraInfo?: Partial<Record<PoiTypeEnum, string>>
    disableExtraTips?: boolean
  }
  promotionType?: string
  discountRange?: any
  priceRange?: any
  mtsubsidyField?: Omit<ChargeSideOption, 'id' | 'title'>
  agentSubsidyField?: Omit<ChargeSideOption, 'id' | 'title'>
  merchantsubsidyField?: Omit<ChargeSideOption, 'id' | 'title'>
}
