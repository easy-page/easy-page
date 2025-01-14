import { ConfigLogInfoType } from '@/admin/common/apis/getLogList'
import {
  AdminOpTypeText,
  FormatStyle,
  getOperationColumnInfo,
  TableUtil,
} from '@/common'
import { LogColumnContext } from './interface'
import { LogListColumnId } from '@/admin/common'
import { logView } from './operations'

export enum LogListSence {
  LogList = 'logList',
}

export const logListColumns = new TableUtil<
  ConfigLogInfoType, // 表格每行信息字段的结构
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 如：活动列表在：主页、加入方案页均会使用，就是 2 个场景
   *  */
  LogListSence,
  /**
   * 使用场景，当此表格在多个地方使用的时候，可使用同一个 planListColumns 不同的场景来区分
   * 包含：MCC 配置、用户信息
   */
  LogColumnContext
>()

logListColumns.createColumns({
  sence: LogListSence.LogList,
  columns: {
    [LogListColumnId.RecordId]: ({ configs }) => ({
      width: 100,
      fixed: 'left',
      title: '记录名',
      render: (text) => {
        const config = configs.find((x) => x.id === text)
        return config?.name || '-'
      },
    }),
    [LogListColumnId.OpType]: () => ({
      width: 100,

      title: '配置操作',
      render: (text) => AdminOpTypeText[text],
    }),

    [LogListColumnId.Operator]: () => ({
      width: 100,
      title: '操作人',
    }),

    [LogListColumnId.CreatedAt]: () => ({
      width: 120,
      title: '操作时间',
      format: FormatStyle.YYYYMMDDHHmmss,
    }),
  },
})

logListColumns.addOperations({
  sence: LogListSence.LogList,
  column: (context) => {
    return getOperationColumnInfo<ConfigLogInfoType>({
      ...context,
      operations: [logView],
      maxCount: 4,
      columnProps: {
        title: '操作',
        width: 80,
        fixed: 'right',
      },
    })
  },
})
