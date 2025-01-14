import React, { useEffect } from 'react'
import './index.less'
import { CustomEllipsis } from '../CustomEllipsis'
import { ProductSelection, ErrorLocation } from '@/common'
import { getPageNoByIdx, PAGE_SIZE } from '../util'
export type CustomTdProps = {
  record: ProductSelection
  /** 当前第几页 */
  pageIdx?: number
  /** 当前行数 */
  index: number
  /** 当前 列 ID */
  dataIndex: string
  /** 当前单元格展示样式 */
  info: React.ReactNode
  /** 当前错误所在位置 */
  errorLocation?: ErrorLocation
  activeTab: number
  tabIndex: number
}

const handleErrorStyle = ({
  dataIndex,
  index,
  curError,
  pageIdx,
  errorLocation,
  activeTab,
}: {
  dataIndex: string
  index: number
  curError?: { id: string; msgs: string[] }
  errorLocation?: ErrorLocation
  pageIdx?: number
  activeTab: number
}) => {
  /** calss 查找不支持存在 . 的 class，用 - 替换 */
  // if (activeTab !== -1 && activeTab !== undefined) {
  //   curTdDoms = document.querySelectorAll(
  //     `.tabPane-${activeTab} .${dataIndex.replace('.', '-')}`
  //   )
  //   scrollDom = document.querySelector(
  //     `.tabPane-${activeTab} .roo-tableNew-body`
  //   )
  // } else {
  const curTdDoms = document.querySelectorAll(`.${dataIndex.replace('.', '-')}`)
  const scrollDom = document.querySelector(`.roo-tableNew-body`)
  // }
  const curTdDom =
    curTdDoms.length > index + 1 ? curTdDoms[index + 1] : undefined
  /** 分页之后，只存在每页数据，因此在这里处理下标 */
  const rowIdx = errorLocation?.rowIdx || 1
  const curPageIdx = getPageNoByIdx(rowIdx)
  const curIdx =
    (errorLocation?.rowIdx || 0) - (getPageNoByIdx(rowIdx) - 1) * PAGE_SIZE

  /** 存在错误，并且定位为当前单元格 */
  const errorInCurTd = curIdx === index && errorLocation?.id === curError?.id
  if (
    curTdDom &&
    (curError?.msgs || []).length > 0 &&
    errorInCurTd &&
    curPageIdx === pageIdx
  ) {
    const dom = curTdDom as any
    dom.style.border = '1px solid red'

    const curDomLocation = curTdDom.getBoundingClientRect()

    const parentDomLocation = scrollDom?.getBoundingClientRect()
    if (errorLocation?.needScroll && parentDomLocation) {
      scrollDom?.scrollTo({
        behavior: 'smooth',
        top: scrollDom?.scrollTop + curDomLocation.top - parentDomLocation.top,
        left:
          scrollDom?.scrollLeft +
          curDomLocation.left -
          parentDomLocation.left -
          380,
      })
    }
  } else if (
    curTdDom &&
    ((curError?.msgs || []).length > 0 ||
      /** 如果之前设置了样式，这里移除，解决分页情况下问题 */
      (curTdDom as any).style.border === '1px solid red')
  ) {
    const dom = curTdDom as any
    dom.style.borderColor = '#EEEEEE'
  }
}
export const CustomTd = (props: CustomTdProps) => {
  const {
    record,
    index,
    info,
    dataIndex,
    errorLocation,
    pageIdx,
    activeTab,
    tabIndex,
  } = props

  const curError = record.errors
    ? record.errors.find((x) => dataIndex === x.id)
    : undefined

  useEffect(() => {
    handleErrorStyle({
      dataIndex,
      curError,
      index,
      errorLocation,
      pageIdx,
      activeTab,
    })
  }, [errorLocation, pageIdx])

  return (
    <div key={record.id}>
      {info}
      <div className="error-td-container ">
        <CustomEllipsis
          // trigger="click"
          tabIndex={tabIndex}
          content={
            <>
              {(curError?.msgs || []).map((e, idx) => (
                <div
                  dangerouslySetInnerHTML={{ __html: e }}
                  key={`${idx}`}
                ></div>
              ))}
            </>
          }
          text={
            <>
              {(curError?.msgs || []).map((e, idx) => (
                <div
                  className="error-info"
                  dangerouslySetInnerHTML={{ __html: e }}
                  key={`${idx}`}
                ></div>
              ))}
            </>
          }
          line={6}
        />
      </div>
    </div>
  )
}
