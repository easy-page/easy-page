import { subsidyFieldContainer } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { mtDiscountCost } from './fields/mtSubsidyContainer'
import { wmdChargeType } from './fields/chargeType'
import { agentDiscountCost } from './fields/atDiscountCost'
import { dishShopCost } from './fields/dishShopCost'
import { PoiTypeEnum, PoiTypeText } from '@/common'
import { createWmChargeInfoContainer } from './fields/createChargeInfoContainer'

// 补贴分担设置
export const subsidy = subsidyFieldContainer().appendChildren([
  wmdChargeType, // 补贴方式
  // poiTypeTip,
  createWmChargeInfoContainer({
    getSubsidyTitle: ({ poiType }) => {
      if (poiType === PoiTypeEnum.All) {
        return `${PoiTypeText[PoiTypeEnum.Direct]}、${
          PoiTypeText[PoiTypeEnum.Agent]
        }`
      }
      if (!poiType) {
        return '待选择门店类型'
      }
      return `${PoiTypeText[poiType]}`
    },
  }).appendChildren([
    mtDiscountCost, // 菜品美团成本
    agentDiscountCost, // 菜品代理成本
    dishShopCost, // 菜品商家成本
  ]),
])
