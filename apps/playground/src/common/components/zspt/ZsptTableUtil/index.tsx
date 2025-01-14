import { Popover, TableColumnProps, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { DotText } from '../../../components/base/Text'
import { OperaitonContext } from '../../../auths'
import { FormatStyle, formateDate } from '../../../libs'
import { DangerouslySetInnerHTML } from '../../base/DangerouslySetInnerHtml'
import { CSSProperties } from 'react'
import { OPERATION_COL_KEY } from '@/common/constants'

/** T 为表格行数据的结构 */
export type BaseListContext<T = Record<string, any>> = Omit<
  OperaitonContext<T>,
  'record' | 'operation' | 'authUrl'
>

export type TableColumnHandler<T, C = Record<string, any>> = (
  context: C
) => Omit<TableColumnProps<T>, 'dataIndex'> & {
  tooltip?: string // 列标题的 toolTip
  format?: FormatStyle
  /** 时间范围展示字段，取值于的 字段 ID */
  rangeTime?: [string, string]
  useHtmlRender?: boolean
  /** 超出多少行后 ... */
  dotLineNumber?: number
}

export type CreateColumns<T, S = string, C = Record<string, any>> = {
  sence: S
  columns: Record<string, TableColumnHandler<T, C>>
}

export type GetColumns<S = string, C = Record<string, any>> = {
  sence: S
  ids: string[]
  context: C
}

export type AddOperationColumn<T, S = string, C = Record<string, any>> = {
  /** 当前场景 id */
  sence: S
  column: TableColumnHandler<T, C>
}

export type CopyColumn<S = string> = {
  /** 当前场景 id */
  sence: S
  /** 要拷贝场景的 id */
  targetScene: S
  copyIds: string[]
}
export type ExtendsColumn<T, S = string, C = Record<string, any>> = {
  /** 当前场景 id */
  sence: S
  /** 要拷贝场景的 id */
  targetScene: S
  /** 继承的列的 ID */
  extendId: string
  /** 根据所继承的列信息，扩张此列信息 */
  handler: (column: TableColumnHandler<T, C>) => TableColumnHandler<T, C>
}

export type TableUtilOptions<T> = {
  /** 自定义默认的 render 函数，处理表格行 */
  customDefaultRender?: (options: {
    format?: FormatStyle
  }) => TableColumnProps<T>['render']
}

/**
 * - 创建表格字段时的上下文类型
 * - S 为使用场景，同一个表格可以有多个实用场景
 * - T 为表格数据每行类型
 */
export class TableUtil<
  T extends Record<string, any>,
  S = string,
  C = Record<string, any>
> {
  private options: TableUtilOptions<T> = {}
  constructor(options?: TableUtilOptions<T>) {
    this.options = options || {}
  }

  private columns: Record<string, Record<string, TableColumnHandler<T, C>>> = {}

  createColumns({ sence, columns }: CreateColumns<T, S, C>) {
    this.columns[sence as string] = this.columns[sence as string] || {}
    const ids = Object.keys(columns)
    ids.forEach((id) => {
      this.columns[sence as string][id] = columns[id]
    })
  }

  copyColumns({ sence, targetScene, copyIds }: CopyColumn<S>) {
    this.columns[sence as string] = this.columns[sence as string] || {}
    const targetColumns = this.columns[targetScene as string] || {}
    copyIds.forEach((e) => {
      this.columns[sence as string][e] = targetColumns[e]
    })
  }

  extendsColumns({
    sence,
    targetScene,
    copyIds,
    columns,
  }: CopyColumn<S> & Pick<CreateColumns<T, S, C>, 'columns'>) {
    this.copyColumns({ sence, targetScene, copyIds })
    this.createColumns({ sence, columns })
  }

  extendsColumn({
    sence,
    targetScene,
    extendId,
    handler,
  }: ExtendsColumn<T, S, C>) {
    const targetColumns = this.columns[targetScene as string] || {}
    this.columns[sence as string] = this.columns[sence as string] || {}
    this.columns[sence as string][extendId] = handler(targetColumns[extendId])
  }

  getValue({ val, format }: { format?: FormatStyle; val: any }) {
    if (val === undefined || val === null) {
      return '-'
    }
    if (format) {
      return formateDate(val, format)
    }
    return val
  }

  renderRangeTime({
    format,
    startTime,
    endTime,
  }: {
    format?: FormatStyle
    startTime?: number
    endTime?: number
  }) {
    const startTimeStr = this.getValue({ val: startTime, format })
    const endTimeStr = this.getValue({ val: endTime, format })
    return (
      <div className="flex flex-col">
        <div>{startTimeStr}</div>
        <div>{endTimeStr}</div>
      </div>
    )
  }

  getDefaultRangeTimeRender({
    format = FormatStyle.YYYYMMDDHHmmss,
    rangeTime,
  }: {
    format?: FormatStyle
    rangeTime: [string, string]
  }): TableColumnProps<T>['render'] {
    return (value, record) => {
      return this.renderRangeTime({
        format,
        startTime: record[rangeTime[0]],
        endTime: record[rangeTime[1]],
      })
    }
  }

  private renderDangerousHtml({
    useHtmlRender,
    dotLineNumber,
    width,
    format,
  }: {
    useHtmlRender?: boolean
    dotLineNumber?: number
    width: number
    format?: FormatStyle
  }): TableColumnProps<T>['render'] {
    return (value) => {
      const val = this.getValue({ val: value, format })
      if (useHtmlRender) {
        const widthStyles = width
          ? {
              width: width - 30,
            }
          : {}

        console.log('dotLineNumber', dotLineNumber)

        const lineStyle =
          dotLineNumber > 1
            ? {
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: dotLineNumber,
              }
            : {
                textOverflow: 'ellipsis',
                display: 'block',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }
        const info = (
          <DangerouslySetInnerHTML
            style={
              {
                ...widthStyles,
                ...lineStyle,
              } as CSSProperties
            }
          >
            {val}
          </DangerouslySetInnerHTML>
        )
        return (
          <Tooltip
            rootClassName="max-w-[350px]"
            title={
              <div className="p-2 max-h-[200px] overflow-auto">
                {
                  <DangerouslySetInnerHTML
                    style={
                      {
                        ...widthStyles,
                      } as CSSProperties
                    }
                  >
                    {val}
                  </DangerouslySetInnerHTML>
                }
              </div>
            }
          >
            <div>{info}</div>
          </Tooltip>
        )
      }
    }
  }

  private getRender({
    render,
    format,
    rangeTime,
    useHtmlRender,
    dotLineNumber,
    width,
  }: {
    render?: TableColumnProps<T>['render']
    format?: FormatStyle
    rangeTime?: [string, string]
    useHtmlRender?: boolean
    dotLineNumber?: number
    width: number
  }): TableColumnProps<T>['render'] {
    if (render) {
      // 使用用户定义的
      return render
    }
    const { customDefaultRender } = this.options

    if (customDefaultRender) {
      return customDefaultRender({ format })
    }
    if (rangeTime && rangeTime.length !== 2) {
      console.warn('rangeTime 需输入：开始时间、截止时间的取值 Key')
    }
    if (rangeTime && rangeTime.length === 2) {
      return this.getDefaultRangeTimeRender({ format, rangeTime })
    }
    if (useHtmlRender) {
      return this.renderDangerousHtml({
        format,
        dotLineNumber,
        useHtmlRender,
        width,
      })
    }
    return (value, record) => {
      const val = this.getValue({ val: value, format })
      return <DotText line={dotLineNumber || 1}>{val}</DotText>
    }
  }

  private getTitle = (
    title: TableColumnProps<T>['title'],
    tooltip?: string
  ): TableColumnProps<T>['title'] => {
    /** 默认标题处理 */
    const curTitile = typeof title === 'function' ? title({}) : title
    return tooltip ? (
      <div className="flex flex-row items-center">
        <div className="mr-2">{curTitile}</div>
        <Tooltip title={tooltip}>
          <QuestionCircleOutlined />
        </Tooltip>
      </div>
    ) : (
      title
    )
  }

  /**
   * - 会按照给定 ids 顺序和展示行进行返回
   * @param param0
   * @returns
   */
  getColumns({ sence, context, ids }: GetColumns<S, C>): TableColumnProps<T>[] {
    const columns = this.columns[sence as string] || {}
    return ids.map((e) => {
      if (!columns[e]) {
        throw Error(`未注册id 为 ${e} 的列信息`)
      }
      const {
        tooltip,
        title,
        render,
        format,
        rangeTime,
        width,
        useHtmlRender,
        dotLineNumber,
        ...rest
      } = columns[e](context)

      return {
        ...rest,
        dataIndex: e,
        width,
        render: this.getRender({
          render,
          format,
          rangeTime,
          useHtmlRender,
          width: width as any as number,
          dotLineNumber,
        }),
        title: this.getTitle(title, tooltip),
      }
    })
  }

  addOperations({ sence, column }: AddOperationColumn<T, S, C>) {
    this.columns[sence as string] = this.columns[sence as string] || {}
    this.columns[sence as string][OPERATION_COL_KEY] = column
  }
}
