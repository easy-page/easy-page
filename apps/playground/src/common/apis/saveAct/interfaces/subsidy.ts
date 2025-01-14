import {
  ChargeSideEnum,
  ChargeTypeEnum,
  IsInMisOrgPn,
  PoiTypeEnum,
} from '@/common/constants'

export interface ISubsidy {
  // 补贴ID
  id?: number
  // 门店类型, 详见枚举
  poiType: PoiTypeEnum
  //承担数额
  chargeAmt?: number
  //承担类型 0=品牌，1=美团，2=代理商，3=商家
  chargeSide: ChargeSideEnum
  //承担方式 1=金额 2=比例
  chargeType: ChargeTypeEnum
  // 最大数量后续有折扣比例时使用
  maxAmount?: number
  // 承担组织
  pn?: string
  // 承担组织名字
  pnName?: string
  isInMisOrg?: IsInMisOrgPn
  // 补贴金额
  chargeSideAmt?: number
  // 不做处理的承担比例
  showChargeAmt?: number
}
