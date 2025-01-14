import {
  ActTypeEnum,
  ChargeFlowTypeEnum,
  PoiTypeEnum,
} from '@/common/constants'
import { ProductSubsidy } from './productSubsidy'
export type ProductSelectionTableProps = {
  /** 是否展示错误的操作栏：上一条、下一条 */
  showErrorToolbar: boolean
  productSelections: ProductSelection[]
  /** 文件正确性校验错误 */
  fileErrorInfo?: string[]
  className?: string
  /** 预览时，表格加载状态 */
  tableLoading?: boolean

  /** 如果为 true，表示是：活动的表格，否则是方案的表格 */
  isAct?: boolean

  actType?: ActTypeEnum

  /** 如果是 true，表示是预览弹窗里的，否则是表单中的表格 */
  isPreview?: boolean

  /** 总体判断是否展示风险提示 */
  showSubsidyRiskTips: boolean

  /** 补贴类型 */
  chargeFlowType?: ChargeFlowTypeEnum[]
  /** 门店类型 */
  poiType?: PoiTypeEnum
  /** 当前选中的Tab */
  activeTab?: number
  tabIndex?: number
}

/** 单条记录类型 */
export type ProductSelection = {
  id: number
  errors?: Array<{ id: string; msgs: string[] }>
  /** 子活动名称 */
  childActName: string
  /** 商品 UPC */
  productUpc: string

  title: any

  /** 商品供货价（元） */
  supplyPriceRange:string
  /** 单门店最多报名商家 */
  enteredSkuCountMax: string
  /** 商品名称关键词 */
  productNameKeyword: string
  /** 商品名称敏感词 */
  productNameSensitiveWord: string
  /** 商品重量 */
  productWeight: number
  /** 商品品类 */
  productCategory: string
  /** 原价最大值 */
  productOriginPrice: string
  /** 组包商品名称 */
  combineProductName: string
  /** 组包后商品图片链接 */
  combineProductImgUrl: string
  /** 子商品件数 */
  combineProductSubItemAmount: number
  /** 优惠后价格最大值 */
  priceMax: number
  /** 每单限购份数区间 */
  orderLimitRange: number
  /** 每日活动库存最小值 */
  dayStockMin: number
  /** 目标人群 */
  targetUserType: string

  lineNumber: number
  directSubsidy: ProductSubsidy
  /** 代理门店补贴 */
  agentSubsidy: ProductSubsidy & {
    /** 代理商补贴-按比例（元） */
    poiAgentCharge: string
  }
  /** 在分页的时候，把当前页码带上 */
  pageIdx?: number
}

export type ColumnInfo = {
  ruleKey: string
  ruleValue: string
}

/** 后端返回的单挑信息 */
export type ProductSelectionFromBackend = {
  /** 草稿活动 id */
  id: number
  /** 活动名称 */
  name: string
  /** 报名资质相关信息 */
  policy: ColumnInfo[]
  /** 组包商品信息 */
  sku: ColumnInfo[]
  /** 招商优惠信息 */
  discount: ColumnInfo[]
  /** 补贴信息 */
  charge: ColumnInfo[]
  /** 每行序号 */
  lineNumber: number
  error?: { ruleKey: string; msgs: string[] }[]
}

export type ErrorLocation = {
  rowIdx: number
  /** 某一行中错误（errors）的 id */
  id: string
  /** 默认情况下不滚动，只有在上一步下一步时滚动 */
  needScroll?: boolean
}
