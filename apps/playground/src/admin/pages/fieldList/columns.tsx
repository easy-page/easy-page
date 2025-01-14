import { FieldListColumnId } from '@/admin/common'
import {
  FieldBelongText,
  FormatStyle,
  getOperationColumnInfo,
  TableUtil,
  ConfigEnvText,
} from '@/common'
import { FieldContext } from './interface'
import { fieldCopy, fieldDelete, fieldEdit, fieldView } from './operations'

export enum FieldSence {
  Field = 'field',
}

export const fieldListColumns = new TableUtil<
  any, // 表格每行信息字段的结构
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 如：活动列表在：主页、加入方案页均会使用，就是 2 个场景
   *  */
  FieldSence,
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 包含：MCC 配置、用户信息
   */
  FieldContext
>()

fieldListColumns.createColumns({
  sence: FieldSence.Field,
  columns: {
    [FieldListColumnId.FieldId]: () => ({
      width: 100,
      fixed: 'left',
      title: '字段 ID',
    }),
    [FieldListColumnId.FieldName]: () => ({
      width: 100,

      title: '字段名',
    }),
    [FieldListColumnId.Belong]: () => ({
      width: 100,
      title: '所属模块',
      render: (text) => (text ? FieldBelongText[text] : '-'),
    }),
    [FieldListColumnId.Owner]: () => ({
      width: 100,

      title: 'Owner',
    }),

    [FieldListColumnId.Env]: () => ({
      width: 100,

      title: '环境',
      render: (text) => ConfigEnvText[text],
    }),

    [FieldListColumnId.Updator]: () => ({
      width: 100,

      title: '最近更新人',
    }),
    [FieldListColumnId.CreatedAt]: () => ({
      width: 120,

      title: '创建时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
    [FieldListColumnId.UpdatedAt]: () => ({
      width: 120,

      title: '更新时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
  },
})

fieldListColumns.addOperations({
  sence: FieldSence.Field,
  column: (context) => {
    return getOperationColumnInfo<any>({
      ...context,
      operations: [fieldEdit, fieldView, fieldCopy, fieldDelete],
      maxCount: 4,
      columnProps: {
        title: '操作',
        width: 200,
        fixed: 'right',
      },
    })
  },
})
