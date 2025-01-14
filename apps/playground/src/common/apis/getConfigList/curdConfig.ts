import { TemplateIdType } from '@/common/constants/fieldMaps/interface'
import { FiedConfigs } from '@/pages/actsCrud/ActsCrudInfo/common'

/**
 * - getActDefaultValues：默认值，固定模板
 * - 字段是否可编辑，生成默认结构，自己配置

/**
 * - getActDefaultValues：默认值，固定模板
 */
export type CrudConfig = {
  /** 用于生成文件夹名 */
  fileName?: string

  /** 用于生成活动的前缀，如：collectStore */
  actPrefix: string
  /** 提交保存时，是否需要校验 PN 阻止 */
  needPnCheck: boolean
  /** 字段 IDs */
  // fields: FieldsConfig[]
  /**
   * - 基于这个方法：prepareFieldConfig
   * - 通过参数：fields、fieldsConfig、template、belong
   * - 可获得树形结构数据
   */
  fields: string[][]
  /** 基于模板 */
  template: string
  /** 字段 Belong，用于回显方便 */
  belong: Record<string, TemplateIdType>
  fieldsConfig: Partial<FiedConfigs>
}
