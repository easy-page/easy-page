import React from 'react'
import { ErrorIcon } from './ErrorIcon'
import './index.less'
import { ProductSelection, ErrorLocation } from '@/common'

export type ErrorToolbarProps = {
  errorCount?: number
  fileErrorInfo?: string[]
  onNext: () => void
  onLast: () => void
  /** 是否存在下一条 */
  hasNext: boolean
  /** 是否存在上一条 */
  hasLast: boolean
}

function findLast<T>(array: T[]) {
  return (callback: (value: T, index: number, array: T[]) => boolean) => {
    for (let i = array.length - 1; i >= 0; i--) {
      if (callback(array[i], i, array)) {
        return array[i]
      }
    }
    return undefined
  }
}

export const getTargetErrorInfo = (options: {
  productSelections: ProductSelection[]
  errorLocation?: ErrorLocation
  firstErrorRowIdx?: number
  lastErrorRowIdx?: number
  /** 是否是查找下一个，若为 false，则表明查找上一个错误 */
  findNext: boolean
}): ErrorLocation | undefined => {
  const {
    productSelections = [],
    errorLocation,
    findNext,
    firstErrorRowIdx,
    lastErrorRowIdx,
  } = options
  if (!errorLocation) {
    return undefined
  }
  const curErrorRow = productSelections[errorLocation.rowIdx]
  const errorIdx = curErrorRow.errors?.findIndex(
    (x) => x.id === errorLocation.id
  )
  /** 当前行无目标错误了 */
  const curRowHasTargetError = findNext
    ? errorIdx !== (curErrorRow.errors || []).length - 1
    : errorIdx !== 0
  if (curRowHasTargetError && errorIdx !== undefined) {
    /** 当前行还可以找到目标错误，则直接返回 */

    return {
      rowIdx: errorLocation.rowIdx,
      id: curErrorRow.errors?.[findNext ? errorIdx + 1 : errorIdx - 1].id || '',
    }
  }
  /** 当前行，无法找到下一个目标错误，则前后进行查找 */
  /** 如果已经是首行错误，或者是尾行错误，就表示其他行已经没错了，则直接返回 */
  const noLeftError = findNext
    ? errorLocation.rowIdx === lastErrorRowIdx
    : errorLocation.rowIdx === firstErrorRowIdx
  if (noLeftError) {
    return undefined
  }

  /** 查找目标行错误 */
  let targetErrorRowIdx = -1
  const findFunc = findNext
    ? productSelections.find.bind(productSelections)
    : findLast(productSelections).bind(productSelections)
  const targetErrorRow = findFunc((x: ProductSelection, idx: number) => {
    /** 查找下一个错，则行号应该大于当前错误行，否则应当小于 */
    const targetErrorIdxRule = findNext
      ? idx > errorLocation.rowIdx
      : idx < errorLocation.rowIdx
    if (targetErrorIdxRule && x.errors && x.errors.length > 0) {
      targetErrorRowIdx = idx
      return true
    }
    return false
  })
  if (targetErrorRow) {
    return {
      rowIdx: targetErrorRowIdx,
      id:
        targetErrorRow.errors?.[
          findNext ? 0 : targetErrorRow.errors?.length - 1
        ].id || '',
    }
  }
}

export const ErrorToolbar = (props: ErrorToolbarProps) => {
  const {
    fileErrorInfo = [],
    errorCount,
    onNext,
    onLast,
    hasLast,
    hasNext,
  } = props
  if (fileErrorInfo?.length > 0) {
    return (
      <div className="file-error-info-container">
        <ErrorIcon></ErrorIcon>
        <div className="file-error-info-items">
          {fileErrorInfo.map((e, idx) => (
            <div key={`${idx}`}>
              {idx + 1}、{e}
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (!errorCount || errorCount === 0) {
    return <></>
  }
  return (
    <div className="error-info-container text-sm mt-2 py-2 pl-2 pr-4">
      <div className="error-info-items">
        <ErrorIcon className="error-icon-img"></ErrorIcon>
        <div className="error-info-text ">
          发现{errorCount}条错误信息，请在EXCEL文件中修改后，重新上传
        </div>
      </div>
      <div className="error-info-items">
        <div
          className={`erorr-operaton-last ${
            hasLast ? '' : 'disable-operation'
          }`}
          onClick={() => {
            if (hasLast) {
              onLast()
            }
          }}
        >
          上一条
        </div>
        <div
          onClick={() => {
            if (hasNext) {
              onNext()
            }
          }}
          className={`erorr-operaton-next ${
            hasNext ? '' : 'disable-operation'
          }`}
        >
          下一条
        </div>
      </div>
    </div>
  )
}
