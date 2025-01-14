/** 前端-补贴分摊模块的数据结构 */

import { ChargeSideEnum, ChargeTypeEnum } from '@/common/constants'

export type MtChargeSidePn = {
  pn: string
  /** 承担比例/金额 */
  chargeAmt?: number
  pnName: string
}

export type ChargeSideInfo = {
  chargeSideCode: ChargeSideEnum
  /** 百分比/金额 */
  chargeAmt: number
  /** 最高不超过 */
  maxAmount: number
  pns?: MtChargeSidePn[]
}

export type SubsidyInfoOfFront = {
    /** 补贴方式 */
  chargeType: ChargeTypeEnum
  /** 美团补贴 */
  meituan: ChargeSideInfo
  /** 代理商补贴 */
  agent: ChargeSideInfo
  /** 商家补贴 */
  merchant: ChargeSideInfo
}
