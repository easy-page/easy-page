import { ActTypeEnum } from '../actTemplateIds'
import { PlanTypeEnum } from '../planAndAct'
import { FieldIds } from './fieldIds'
import { FieldTypeEnum } from './fieldType'

export enum ActTemplate {
  Common = 'common',
  Sg = 'sg',
  Wm = 'wm',
}

// 和之前的方案保持一致为数组
export enum PlanTemplate {}

export type TemplateIdType = PlanTypeEnum | ActTypeEnum | ActTemplate

export type FieldConfig<Config = Record<string, any>> = {
  id: string
  fullId: string
  fieldType: FieldTypeEnum
  /** 生成字段时所需参数 */
  config?: Config
  children?: FieldConfig[]
  /** 字段所属活动或者方案 */
  belong?: TemplateIdType
}

export type FieldsConfig = FieldConfig[]
