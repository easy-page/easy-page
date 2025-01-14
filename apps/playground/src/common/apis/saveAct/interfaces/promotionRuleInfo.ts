import { ChargeTypeEnum, SubsidyOptEnum } from '@/common/constants'
import { SubsidyInfoOfFront } from './subsidyOfFront'

export enum PromotionKey {
  /** 菜品折扣价格 */
  Price = 'price',
  /** 菜品折扣率 */
  DiscountRate = 'discountRate',
  /** 菜品代理成本 */
  AgentSubsidyRatio = 'agentSubsidyRatio',
  /** 菜品代理成本 每单最高承担金额*/
  AgentSubsidyMax = 'agentSubsidyMax',
  /** 菜品商家成本 */
  PoiSubsidyRatio = 'poiSubsidyRatio',
  /** 提报价格限制 */
  MinPriceLimitDays = 'minPriceLimitDays',
  /** 菜品优惠库存 */
  DayStock = 'dayStock',
  /** 每单限购份数 */
  OrderLimit = 'orderLimit',
  /** 面向人群 */
  TargetUserType = 'targetUserType',
  // todo
  DishDiscountPriceRate = 'dishDiscountPriceRate',
  DishDiscountPrice = 'dishDiscountPrice',
}

export interface IPromotionKeyList {
  key: PromotionKey
  opt: SubsidyOptEnum
  minValue?: number | string | undefined
  maxValue?: number | string | undefined
  maxAmount?: string
}

export interface PromotionRuleInfo {
  id?: number
  // 优惠规则属性
  keyList: IPromotionKeyList[]
  // 补贴
  subsidy: {
    id?: number
    /**
     * - 这个是后端的数据结构类型，太狗屎了，不要，在提交和查询详情回来就处理掉
     * - 前端不关心这个结构
     *  */
    // chargeDetailVos: ISubsidy[]

    chargeDetailVos: SubsidyInfoOfFront[]
  }
}
