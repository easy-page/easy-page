import { OperationFactorItem, Validator } from '@/common/apis'
import { MccConfig } from '../interface'

export type ValidateRes = { success: boolean; errorMsg?: string }
export type ValidateOptions = {
  /** 当前字段自己的完整 value */
  value: any
  factor: OperationFactorItem
  /** 当前已经配置的所有因子值 */
  pageState: any
  mccConfigs: MccConfig
}

export type ValidateHandler = (
  fieldVal: any,
  rule: Validator,
  options: ValidateOptions
) =>
  | { success: boolean; errorMsg: string }
  | Promise<{ success: boolean; errorMsg: string } | undefined>
  | undefined
