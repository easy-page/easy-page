/**
 * 列表搜索容器组件
 */
import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import './index.less'
import { FormUtil } from '@easy-page/antd-ui'
import { ZsptButton } from '../ZsptButton'

export const DEFAULT_FILTER_SIZE = 6

/** 默认每行搜索条件个数 */
const DEFAULT_LINE_FILTER_COUNT = 3

export interface FilterContainerProps {
  onClickSearch: (filters: Record<string, any>) => void
  onClickReset?:
    | ((formUtil: FormUtil<Record<string, any>>) => void)
    | (() => void)
    | null

  getFormUtil?: () => FormUtil<Record<string, any>>
  /** 重置按钮后面，展示其余自定义按钮 */
  buttonGroupRightNode?: React.ReactNode
  children: React.ReactNode[]
  /** 是否展示展开、收起筛选条件的按钮 */
  retract?: boolean
  className?: string
  /** 每行筛选条件个数 */
  lineFilterCount?: number
  /** 默认常显的总个数 */
  defaultFilterCount?: number
  /** 是否禁用重置 */
  disabledRest?: boolean
}

const EmptyPositionRender = ({
  emptyFillCount,
}: {
  emptyFillCount: number
}) => {
  const emptyPositionElList = Array.from(
    { length: emptyFillCount },
    (_, index) => index
  )
  return emptyPositionElList.map((item: number, index: number) => (
    <div key={`empty-position-${index}`} className="empty-container"></div>
  ))
}

const getShowChildrenCount = ({
  expand,
  totalFilterCount,
  defaultFilterCount,
}: {
  totalFilterCount: number
  defaultFilterCount: number
  expand: boolean
}) => {
  if (expand) {
    return totalFilterCount
  }
  if (totalFilterCount > defaultFilterCount) {
    return defaultFilterCount
  }
  return totalFilterCount
}

export const FilterContainer: React.FC<FilterContainerProps> = (props) => {
  const [expand, setExpand] = useState(false)
  const {
    onClickSearch,
    onClickReset,
    children,
    getFormUtil,
    buttonGroupRightNode,
    lineFilterCount = DEFAULT_LINE_FILTER_COUNT,
    defaultFilterCount = DEFAULT_FILTER_SIZE,
    retract = true,
    className,
    disabledRest,
  } = props

  const showExpandBtn = children?.length > defaultFilterCount
  /** 展示的字元素数量 */
  const showChildren = expand ? children : children.slice(0, defaultFilterCount)
  const totalFilters = children.length

  /** 展示的条件数量不能通过 dom 来计算，有些是隐藏了但有外层 dom，不能算 */
  const emptyFillCount = useMemo(() => {
    const showChildrenCount = getShowChildrenCount({
      expand,
      totalFilterCount: totalFilters,
      defaultFilterCount,
    })

    return lineFilterCount - (showChildrenCount % lineFilterCount) - 1
  }, [expand, totalFilters, defaultFilterCount])

  return (
    <div className={`zspt-search-container ${className}`}>
      <div
        className="zspt-search-grid"
        style={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: `repeat(${lineFilterCount}, 1fr)`,
          // justifyContent: 'end',
          gridColumnGap: '40px',
        }}
      >
        {showChildren}
        <EmptyPositionRender emptyFillCount={emptyFillCount} />
        <div className="zspt-search-container-btns">
          {showExpandBtn && retract === true && (
            <Button
              icon={expand ? <UpOutlined /> : <DownOutlined />}
              onClick={() => {
                setExpand(!expand)
              }}
              type="link"
            >
              {expand ? '收起' : '展开'}
            </Button>
          )}
          <ZsptButton
            type="primary"
            onClick={async () => {
              const formUtil = getFormUtil?.()
              const formData = formUtil?.getFormData?.()
              try {
                await formUtil?.validateVisibleFields?.()
                onClickSearch(formData || {})
              } catch (error) {
                console.log('search error:', error)
              }
            }}
          >
            查询
          </ZsptButton>
          {onClickReset && !disabledRest && (
            <Button
              onClick={onClickReset as any}
              type="default"
              className="search-reset-btn"
            >
              重置
            </Button>
          )}
          {buttonGroupRightNode}
        </div>
      </div>
    </div>
  )
}
