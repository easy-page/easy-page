import { GrayRuleCode } from '@/common/constants'

export type CompontOption = {
  label: string
  value: string
  disabled: boolean
}

/** 原来 x-component-props 协议里的配置 */
export type ComponentBaseProps = {
  multiple?: boolean // 是否是多选
  options?: CompontOption[]
  commaSeparated?: boolean
  saveTextSpace?: boolean
  placeholder?: string
  tipName?: string
  dataKey?: string
  content?: string
  searchUrl?: string
  searchMethod?: string
  leafLevel?: number
  cascade?: boolean
  previewSuffix?: string
  label?: string
  disabled?: boolean
  unit?: string // 单元
  showDataUrlParamFromBe?: string // 爆品售卖渠道 会用到该参数，是个 json 字符串
}

export type ComponentProps = Record<string, ComponentBaseProps>
export type DecoratorProps = {
  tooltip?: string
  subscript?: string // 标签
  previewInfo?: string
  grayKey?: GrayRuleCode
}

export type ViewConfig = {
  'x-component-props': ComponentProps
  'x-decorator-props': DecoratorProps
  default: Partial<Record<keyof ComponentProps, string>> // 组件默认值
}

export type GetFactorsParams = {
  factorCodes: string[]
}

export enum CategoryCode {
  Poi = 'poi',
  Sku = 'sku',
}

export const CategoryCodeDesc = {
  [CategoryCode.Poi]: '商家',
  [CategoryCode.Sku]: '商品',
}

export enum FactorStatus {
  Enable = 1,
  Disable = 2,
}

export enum CompareOperator {
  Lt = '<',
  Lte = '<=',
  E = '=',
  gt = '>',
  gte = '>=',
}
// 校验器
export interface Validator {
  enum: any[]
  isNeedInnerCheck: boolean // 是否需要在因子内部触发校验
  max: number // 字符数
  maxiQuantity: number
  maximum: number
  message: string
  min: number // 字符数
  miniQuantity: number
  minimum: number
  operator: CompareOperator
  pattern: string
  remoteValidator: string
  target: string
  type: ValidatorType
}

// 校验类型
export enum ValidatorType {
  Required = 'required', // 必填
  Regular = 'regular', // 正则
  Enum = 'enum', // 枚举-必须是 x、y、z 中的一个
  Min = 'min', // 字符串-最小长度
  Max = 'max', // 字符串-最大长度
  Minimum = 'minimum', // 数字-最小值
  Maximum = 'maximum', // 数字-最大值
  DecimalLength = 'decimalLength', // 小数点位数校验
  MiniQuantity = 'miniQuantity', // 数量-至少 x 个 id
  MaxiQuantity = 'maxiQuantity', // 数量-最多 x 个 id
  Compare = 'compare', // 和其他属性做比较
  Remote = 'remote', // 远程校验，因子内部校验和对话框提交时校验调用的都是同一个接口，对话框点提交时搜集配置了该类型的所有因子数据提交给后端
  Association = 'association', // 互斥校验，只在因子校验配置中存在
  IsInteger = 'isInteger', // 是否是整数
}

// 因子基础信息
export interface BaseFactorItem {
  factorCode: string // 因子 code
  factorName: string // 因子名称
  priority: number // 因子展示优先级，越小的展示越靠前
  status: FactorStatus // 因子状态
  isDefaultSelected: boolean // 是否默认选中，本地赋值本地使用
  isMustChoose: boolean // 是否必选，本地赋值本地使用
}
// 模板中选择因子时的因子条目
export interface TemplateFactorItem extends BaseFactorItem {
  secondCategoryName: string // 本地赋值展示使用
  isChecked: boolean // 本地赋值展示使用
}

export interface OperationFactorItem extends BaseFactorItem {
  /**
   * - 需要注意，key 是对应组件的 state 中某个字段的key
   * - 如组件的状态结构为：{x1: string, x2: string} 则
   * - validator 中{x1: [], x2: []} 分别表示 x1、x2 的验证规则
   *  */
  validators: Record<string, Array<Validator>> // 校验器
  viewConfig: ViewConfig
  componentName: string // 前端组件名称
  categoryCode: CategoryCode // 本地赋值本地使用
  categoryTitle: string // 分类名
}

export type FactorInfo = {
  /** 后端返回的完整信息 */
  fullInfo: FactorListResp<OperationFactorItem>
  /** 第一层目录信息 */
  firstCategoryList: FactorListFirstCategory<OperationFactorItem>[]
}

export interface FactorListResp<T> {
  poi?: FactorListFirstCategory<T> // 商家维度
  sku?: FactorListFirstCategory<T> // 商品维度
}
// 一级分类详情
export interface FactorListFirstCategory<T> {
  id: number
  name: string
  code: CategoryCode
  labelList: FactorListSecondCategory<T>[]
}
// 二级分类详情
export interface FactorListSecondCategory<T> {
  id: number
  priority: number // 分类展示优先级，越小的展示越靠前
  code: CategoryCode
  name: string
  list: T[]
}

export type FactorListFromBackend = FactorListResp<
  Omit<OperationFactorItem, 'viewConfig'> & {
    viewConfig: string
  }
>
