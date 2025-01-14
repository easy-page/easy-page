import {
  PoiTypeEnum,
  ChargeFlowTypeEnum,
  FactorInfo,
  PnInfo,
  ActFullInfo,
  CanApplyRoleEnum,
  BelongBizline,
  ActTypeEnum,
} from '@/common'
import {
  ChildFormContainerProps,
  ChildFormItem,
  ChildFormState,
  ComponentProps,
  DefaultPageProps,
  EasyPageOnChangeContext,
  FormUtil,
  PageInfo,
  SelectState,
} from '@easy-page/antd-ui'
import { Dayjs } from 'dayjs'
import { UploadFileStatus } from 'antd/es/upload/interface'
import {
  AuthResInfo,
  GetSubsidyRule4GroupRes,
  CreateProductTypeEnum,
  IActRuleList,
  IBudget,
  ProductSelection,
  Qualify,
} from '@/common/apis'
import { ConfirmDialogManagerState } from '@/common/fields/common/ConfirmDialogManager'
import { RangeState, ToolbarProps } from '@/common/fields'

export enum PnControl {
  Strong = 'STRONG',
  Week = 'WEAK',
}

export const PnControlText: Record<PnControl, string> = {
  [PnControl.Strong]: '强管控',
  [PnControl.Week]: '弱管控',
}

export type BudgetaryPnPageState = {
  pn: SelectState<string>
  budgetAmount: string
  control: PnControl
  pnName?: string
}

export enum InviteWay {
  /** 通过门店邀请 */
  ByPoiInvite = '1',
  /** 通过业务品牌邀请 */
  ByMerchantBrand = '2',
  ByFilter = '3',
  BySupplier = '4',
}

/** 预算申请理由 */
export type ApplyReasionState = {
  reason: string
  pns: IBudget[]
  needAuditOfApi?: boolean
  /** 非本组 pn 的 pnId */
  notInMisOrgPns: string[]
}

export type UplaodIdState = {
  name: string
  url: string
  uid: string // 文件唯一id
  status?: UploadFileStatus
  response?: string
  fileType?: string
}[]

/**
 * - key 为子活动 ID，value 表示是否挂载完毕
 */
export type SubActPnLoadState = Record<string, boolean>

export type NeedAuditResState = {
  needed: boolean
  option?: string
}

/** 通用最外层表单的 FormState */
export type CommonActCrudFormState = ActFullInfo & {
  poiType: PoiTypeEnum
  chargeFlowType: ChargeFlowTypeEnum[]
  promotionType: ActTypeEnum
  actName: string
  brief: string
  ruleDesc: string
  subActPnLoadState: SubActPnLoadState
  endTime: number
  // promotionTime: PromotionTime;
  'promotionTime.isRestrict': string
  'promotionTime.period': ChildFormState
  'promotionTime.weekTimes': number[]
  'promotionTime.timeRange': Dayjs[]
  'subactivityRule.isRestrict': SelectState<string>
  'subactivityRule.enterMin': string
  'subactivityRule.enterMax': string
  subActivity: ChildFormState<CommonSubActPageState>
  belongBizline: SelectState<BelongBizline>
  dataType: InviteWay
  budgetControl: ChildFormState<BudgetaryPnPageState>
  inputIdsWay: string
  actRule: IActRuleList<ProductSelection>
  uploadId: UplaodIdState
  filterRule: SelectState<string>
  chooseOperation: string
  qualify: Qualify
  canAudit?: boolean
  canApplyRole: CanApplyRoleEnum[]
  canCancel?: CanApplyRoleEnum[]
  canCancelAfterActEnd?: CanApplyRoleEnum[]
  canEdit?: CanApplyRoleEnum[]
  canEditAfterActEnd?: CanApplyRoleEnum[]
  applyReason: ApplyReasionState
  submitVersion: number
  confirmDialogManager: ConfirmDialogManagerState
  applyReasonContainer: Omit<ApplyReasionState, 'reason'>
  needAuditRes: NeedAuditResState // 是否需审核报名结果
  subsidyRule: GetSubsidyRule4GroupRes
  'invitation.inputType': number
  activitySceneTag?: string[]
}

/** key 为选项 id, value 为选型值 */
export type BizlineOption = Record<string, string>

/** 通用最外层表单的 FormProps */
export interface CommonActCrudFormProps
  extends DefaultPageProps<any>,
    ToolbarProps {
  mccSubActMaxCount?: number
  factors?: FactorInfo
  pnListData?: PnInfo[]
  bizlineOptions: BizlineOption
  poiInviteTemplateUrl?: string
  brandInviteTemplateUrl?: string
  activitySceneTagConfig?: string
  resourceIdRes: AuthResInfo[]
}

/** 选择承担组织自增表单的 FormState */
export type ChargeSidePnPageState = {
  pn: SelectState<string>
  chargeAmt: string
  amount: string
}

export type DiscountRateState = {
  minValue: string
  maxValue: string
}

/** 通用子活动页面状态 */
export type CommonSubActPageState = {
  name: string
  chargeType: SelectState<string>
  discountRate: RangeState
  price: RangeState
  'validationRule.skuLimit': string
  qualify: Qualify
  'meituan.chargeAmt': string
  'meituan.maxAmount': string
  'agent.chargeAmt': string
  'agent.maxAmount': string
  'pns.chargeSidePnform': ChildFormState<ChargeSidePnPageState>
  'merchant.chargeAmt': string
  'merchant.maxAmount': string
  materialRule: string
  needRequire: string
  openGuide?: boolean
  chooseGuideWay?: CreateProductTypeEnum
  /** 每单代理成本占比 */
  atPercent: DiscountRateState
  /** 美补 每单最高承担金额 */
  mtMaxMoney: string
  dishDiscountPrice: RangeState // 菜品折扣价格
  dishDiscountPriceRate: RangeState // 菜品折扣率
  shopPercent: RangeState
  /** 每单美团成本占比 */
  mtPercent: string
  /** 面向人群 */
  facePeople: string
  /** 每单限购份数 */
  limitNumber: {
    max: string
    min: string
  }
  /** 菜品优惠库存 */
  dishSaleStock: {
    max: string
    min: string
  }
  /** 提报价格限制 */
  priceLimit: string
  /** 菜品美团成本 */
  mtDiscountCost: string
  /** 菜品代理成本 */
  agentDiscountCost
}

/** 通用子活动页面上下文 */
export interface CommonSubActPageProps
  extends DefaultPageProps<CommonSubActPageState>,
    Partial<CommonActCrudFormState> {
  name: string
  chargeType: SelectState<string>
  pnListData: PnInfo[]
  subActCount: number
  // 获得最外层父节点的 ref
  getFormUtil?: () => FormUtil<CommonActCrudFormState>
}

/** 表单组件本身 Props */
export type SubActFormProps<PageState, PageProps> = ComponentProps<
  ChildFormContainerProps,
  ChildFormState,
  any,
  PageState,
  PageProps & DefaultPageProps<PageState>
> & {
  handleChange?: (context: EasyPageOnChangeContext<Record<string, any>>) => void
  childForm: ChildFormItem
  formIndex: number
  pageInfo: PageInfo<any, any>
}
