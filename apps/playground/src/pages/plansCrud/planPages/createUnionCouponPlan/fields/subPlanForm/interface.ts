import {
  MerchantMaxSubsidyField,
  MtLowestSubsidyRecord,
  SubMarketingPlanStatus,
} from '@/common'
import { SubPlanState } from '@/pages/plansCrud/fields/subPlan/components'
import { ChildFormState, DefaultPageProps } from '@easy-page/antd-ui'

export type MerchantMaxSubsidyFormState = MerchantMaxSubsidyField & {
  stepNumber: number
}

export type MeituanLowestSubsidyFormState = MtLowestSubsidyRecord & {
  stepNumber: number
}

/** 子方案通用的表单字段定义 */
export type UnionCouponSubPlanFormState = {
  merchantMaxSubsidy: ChildFormState<MerchantMaxSubsidyFormState>
  meituanLowestSubsidy?: ChildFormState<MeituanLowestSubsidyFormState>
  baseLevelPrice: string
  'baseInfo.subPlanName': string
  'baseInfo.userGroup': string[]
  id?: number
  groupStatus?: SubMarketingPlanStatus // 子方案状态
  settingGears?: string[] // 设置档位
  commissionRatio: number
}

/** 子方案通用的外部 Props 定义 */
export type UnionCouponSubPlanFormProps =
  DefaultPageProps<UnionCouponSubPlanFormState> & {
    curFormId: string
    curFormIdx: number
    subPlan?: SubPlanState
    maxExpandLevelMcc: number
    stopSubPlan: () => void
  }
