import { CategoryCode, ComponentProps, ViewConfig } from '@/common/apis'

export interface FeExtend {
  previewInfo?: string
  factorCategoryCode?: CategoryCode
  [key: string]: any
}

export enum MatchTypeEnum {
  FuzzyMatch = 'fuzzy_match',
  AnyFuzzyMatch = 'any_fuzzy_match',
  AnyExactMatch = 'any_exact_match',
  ExactMatch = 'exact_match',
}

export enum ValidateType {
  Required = 'required',
  Minimum = 'minimum',
  Maximum = 'maximum',
  DecimalLength = 'decimalLength',
  Compare = 'compare',
  Max = 'max',
  MaxiQuantity = 'maxiQuantity',
  Regular = 'regular',
  Remote = 'remote',
}

export enum ValidateTarget {
  RightValue = 'rightValue',
}

export enum ValidateOperator {
  Lte = '<=',
}

/** 验证类型和所取字段的 Key 映射 */
export const ValidateFieldMap: Record<ValidateType, string[]> = {
  [ValidateType.Required]: [],
  [ValidateType.Minimum]: ['minimum'],
  [ValidateType.Maximum]: ['maximum'],
  [ValidateType.DecimalLength]: ['maximum'],
  [ValidateType.Compare]: ['target', 'operator'],
  [ValidateType.Max]: ['max'],
  [ValidateType.MaxiQuantity]: ['maxiQuantity'],
  [ValidateType.Regular]: ['pattern'],
  [ValidateType.Remote]: ['remoteValidator'],
}

export type ValidatorRule = {
  message: string
  type: ValidateType
  minimum?: number
  maximum?: number
  target?: ValidateTarget
  max?: number
  maxiQuantity?: number
  pattern?: string
  remoteValidator?: string
  operator?: string
}

export enum Components {
  FactorSelectTextarea = 'FactorSelectTextarea',
  FactorTextarea = 'FactorTextarea',
  FactorTextTextarea = 'FactorTextTextarea',
  FactorCity = 'FactorCity',
  FactorMultiCascader = 'FactorMultiCascader',
  FactorInterval = 'FactorInterval',
  FactorBothSelect = 'FactorBothSelect',
}

export type FactorSchema = {
  value: Components
  label: string
  viewConfig: ViewConfig
  validators: Partial<Record<keyof ComponentProps, ValidatorRule[]>>
}
