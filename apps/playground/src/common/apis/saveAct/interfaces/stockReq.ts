import { SubsidyOptEnum } from '@/common/constants'

// 库存要求
export enum StockRequestEnum {
  // 基础档位库存
  Stock4Base = 'stock4Base',
  // 膨胀档位每日库存
  Stock4Expand = 'stock4Expand',
  // 商家每日库存
  Stock4PoiDaily = 'stock4PoiDaily',
  // BD每日追补库存
  Stock4MtbDaily = 'stock4MtbDaily',
  // 代理商CM每日库存
  Stock4AgentDaily = 'stock4AgentDaily',
  /** 美团联盟红包 */
  stock4OutSite = 'stock4OutSite',
}
export type StockRuleItem = {
  key: StockRequestEnum // 补贴条件的键
  opt: SubsidyOptEnum // 补贴条件的操作符
  minValue: string // 补贴条件的最小值
  maxValue: string // 补贴条件的最大值
}

export type StockRequestType = StockRuleItem[]
