import {
  ChildFormContainerProps,
  ChildFormState,
  DefaultPageProps,
  ChildFormItem,
  ComponentProps,
} from '@easy-page/antd-ui'
import {
  MerchantMaxSubsidyField,
  MtLowestSubsidyRecord,
  SubMarketingPlanStatus,
} from '@/common'
import { SubPlanState } from './components'
import { CommonPlanFormProps, CommonPlanFormState } from '../interface'

export type SubPlanProps = {}

export type SubPlanFormComponent = React.FC<
  ComponentProps<
    ChildFormContainerProps,
    ChildFormState<Record<string, any>>,
    any,
    CommonPlanFormState,
    CommonPlanFormProps & DefaultPageProps<CommonPlanFormState>
  > & {
    curIdx: number
    curForm: ChildFormItem
    groupStatus: SubMarketingPlanStatus
  }
>

export type MerchantMaxSubsidyFormState = MerchantMaxSubsidyField & {
  stepNumber: number
}

export type MeituanLowestSubsidyFormState = MtLowestSubsidyRecord & {
  stepNumber: number
}

/** 子方案通用的表单字段定义 */
export type CommonSubPlanFormState = {
  merchantMaxSubsidy: ChildFormState<MerchantMaxSubsidyFormState>
  meituanLowestSubsidy: ChildFormState<MeituanLowestSubsidyFormState>
  baseLevelPrice: string
  'baseInfo.subPlanName': string
  'baseInfo.userGroup': string[]
  id?: number
  groupStatus?: SubMarketingPlanStatus
  subPlan?: SubPlanState
}

/** 子方案通用的外部 Props 定义 */
export type CommonSubPlanFormProps =
  DefaultPageProps<CommonSubPlanFormState> & {
    curFormId: string
    curFormIdx: number
    subPlan?: SubPlanState
    maxExpandLevelMcc: number
  }
