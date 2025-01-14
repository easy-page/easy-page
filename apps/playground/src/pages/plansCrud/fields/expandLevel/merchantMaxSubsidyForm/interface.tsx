import { ChildFormState, FormUtil } from '@easy-page/antd-ui'
import {
  MeituanLowestSubsidyFormState,
  MerchantMaxSubsidyFormState,
} from '../../subPlan'
// import {
//   MeituanLowestSubsidyFormState,
//   MerchantMaxSubsidyFormState,
// } from '../../../../interface';

export type MerchantMaxSubsidyFormProps = {
  formId: string
  formIndex: number
  total: number
  onRemove: (id: string) => void
  /** 上一行 formUtil */
  lastFormUtil: FormUtil<MerchantMaxSubsidyFormState>
}

export type MerchantMaxSubsidyContainerState =
  ChildFormState<MerchantMaxSubsidyFormState>

export type MeituanLowestSubsidyContainerState =
  ChildFormState<MeituanLowestSubsidyFormState>
