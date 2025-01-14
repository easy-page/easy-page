import React, { useEffect, useMemo, useState } from 'react'
import './index.less'
import {
  ProductSelection,
  ChargeFlowTypeEnum,
  PoiTypeEnum,
  ErrorLocation,
  ProductSelectionTableProps,
  TableNew,
} from '@/common'
import { PAGE_SIZE, getPageNoByIdx } from '../util'
import { productSelectionColumns } from '../columns'
import { ErrorToolbar, getTargetErrorInfo } from '../ErrorToolbar'

const getDefaultErrrorInfos = (productSelections?: ProductSelection[]) => {
  if (!productSelections) {
    return {}
  }
  let errorCount = 0
  const errorLocation: Partial<ErrorLocation> = {}
  let lastErrorRow = -1
  let firstErrorRow = -1
  let lastErrorRowErrorId = ''
  let firstErrorRowErrorId = ''
  productSelections.forEach((each, idx) => {
    if (each.errors && each.errors.length > 0) {
      errorCount = errorCount + each.errors.length
      if (firstErrorRow === -1) {
        errorLocation.rowIdx = idx
        errorLocation.id = each.errors[0].id
        errorLocation.needScroll = true
        firstErrorRow = idx
        firstErrorRowErrorId = each.errors[0].id
      }
      lastErrorRow = idx
      lastErrorRowErrorId = each.errors[each.errors.length - 1].id
    }
  })
  return {
    lastErrorRow,
    firstErrorRowErrorId,
    firstErrorRow,
    errorCount,
    lastErrorRowErrorId,
    errorLocation: errorLocation as ErrorLocation,
  }
}

const getPageData = (data: ProductSelection[], pageNo: number) => {
  return data
    .slice(PAGE_SIZE * (pageNo - 1), PAGE_SIZE * pageNo)
    .map((e) => ({ ...e, pageIdx: pageNo }))
}

/**
 * - 当门店类型补贴类型选择不同时，表头处理了，数据也需要处理，不展示的则直接删除相关数据
 */
const handleProductionSelection = ({
  productionSelections,
  chargeFlowType = [],
  poiType,
}: {
  productionSelections: ProductSelection[]
  chargeFlowType: ChargeFlowTypeEnum[]
  poiType: PoiTypeEnum | undefined
}) => {
  if (!poiType) {
    return [...productionSelections]
  }

  /** 选择了直营门店，不选择补贴类型，移除代理、直营门店所有列 */
  const choosedDirectWithoutSubsidy =
    poiType === PoiTypeEnum.Direct &&
    !chargeFlowType.includes(ChargeFlowTypeEnum.DirectMtCharge)
  console.log('choosedDirectWithoutSubsidy:', choosedDirectWithoutSubsidy)
  /** 选择了直营门店，选择补贴类型，移除代理门店列错误 */
  const choosedDirectWithSubsidy =
    poiType === PoiTypeEnum.Direct &&
    chargeFlowType.includes(ChargeFlowTypeEnum.DirectMtCharge)
  console.log('choosedDirectWithSubsidy:', choosedDirectWithSubsidy)
  /** 选择了代理门店，未选择补贴类型，移除所有直营门店、代理门店错误，除了代理商补贴 */
  const choosedAgentWithoutSubsidy =
    poiType === PoiTypeEnum.Agent &&
    !chargeFlowType.includes(ChargeFlowTypeEnum.AgentMtCharge)
  console.log('choosedAgentWithoutSubsidy:', choosedAgentWithoutSubsidy)
  /** 选择了代理门店，选择代理商补贴类型，移除所有直营门店 */
  const choosedAgentWithSubsidy =
    poiType === PoiTypeEnum.Agent &&
    chargeFlowType.includes(ChargeFlowTypeEnum.AgentMtCharge)
  console.log('choosedAgentWithSubsidy:', choosedAgentWithSubsidy)
  return [...productionSelections].map((each) => {
    const record = { ...each }
    record.errors = (record.errors || []).filter((e) => {
      const removeDirect = !e.id.startsWith('directSubsidy')
      const removeAgent = !e.id.startsWith('agentSubsidy')
      const isAgentCharge = e.id === 'agentSubsidy.poiAgentCharge'
      if (choosedDirectWithoutSubsidy) {
        return removeAgent && removeDirect
      }
      if (choosedDirectWithSubsidy) {
        return removeAgent
      }
      if (choosedAgentWithoutSubsidy) {
        if (isAgentCharge) {
          return true
        }
        return removeDirect && removeAgent
      }
      if (choosedAgentWithSubsidy) {
        return removeDirect
      }
    })
    return record
  })
}

export const ProductSelectionTable = (props: ProductSelectionTableProps) => {
  const {
    showErrorToolbar,
    className,
    fileErrorInfo = [],
    productSelections: oriProductionSelections = [],
    tableLoading,
    isPreview,
    chargeFlowType = [],
    poiType,
    showSubsidyRiskTips,
    isAct,
    actType,
    activeTab,
    tabIndex,
  } = props
  const productSelections = useMemo(() => {
    return handleProductionSelection({
      productionSelections: oriProductionSelections,
      chargeFlowType,
      poiType,
    })
  }, [oriProductionSelections])

  const {
    lastErrorRow,
    lastErrorRowErrorId,
    firstErrorRow,
    errorCount,
    firstErrorRowErrorId,
    errorLocation: defaultErrorLocation,
  } = useMemo(
    () => getDefaultErrrorInfos(productSelections),
    [productSelections]
  )

  console.log(
    'ProductSelectionTable fileErrorInfo:11',
    errorCount,
    fileErrorInfo
  )

  const [errorLocation, setErrorLocation] = useState<ErrorLocation | undefined>(
    defaultErrorLocation
  )
  const [curPage, setCurPage] = useState(1)

  const [data, setData] = useState(
    productSelections
      .slice(0, PAGE_SIZE)
      .map((e) => ({ ...e, pageIdx: curPage }))
  )
  const showPageToolbar = productSelections.length > PAGE_SIZE

  useEffect(() => {
    setErrorLocation(defaultErrorLocation)
  }, [defaultErrorLocation])
  useEffect(() => {
    if (productSelections.length > 0) {
      let curPageIdx = 1
      if (defaultErrorLocation?.rowIdx) {
        const pageNo = getPageNoByIdx(defaultErrorLocation?.rowIdx)
        curPageIdx = pageNo
      }
      setCurPage(curPageIdx)
      setData(getPageData(productSelections, curPageIdx))
    }
  }, [productSelections])

  /** 设置了允许展示错误栏，并且存在文件错误，或者内容错误 */
  const showError =
    showErrorToolbar &&
    (fileErrorInfo?.length > 0 || errorLocation !== undefined)

  const curColumns = useMemo(
    () =>
      productSelectionColumns({
        isAct: isAct || false,
        actType: actType || '',
        errorLocation,
        poiType,
        chargeFlowType,
        uploadError: fileErrorInfo,
        showSubsidyRiskTips,
        isPreview: isPreview || false,
        activeTab: activeTab === undefined ? -1 : activeTab,
        tabIndex: tabIndex === undefined ? -1 : tabIndex,
      }),
    [fileErrorInfo, errorLocation, poiType, chargeFlowType, showSubsidyRiskTips]
  )
  return (
    <div className={`${className || ''}`}>
      <div className="product-selection-table mt-2">
        {showError ? (
          <ErrorToolbar
            hasLast={
              !(
                errorLocation?.rowIdx === firstErrorRow &&
                errorLocation?.id === firstErrorRowErrorId
              )
            }
            hasNext={
              !(
                errorLocation?.rowIdx === lastErrorRow &&
                errorLocation?.id === lastErrorRowErrorId
              )
            }
            onLast={() => {
              const errorInfo = getTargetErrorInfo({
                productSelections,
                errorLocation,
                firstErrorRowIdx: firstErrorRow,
                lastErrorRowIdx: lastErrorRow,
                findNext: false,
              })
              if (errorInfo) {
                const pageIdx = getPageNoByIdx(errorInfo.rowIdx)
                // console.log('pageIdx:', pageIdx)
                if (pageIdx !== curPage) {
                  setCurPage(pageIdx)
                  setData(getPageData(productSelections, pageIdx))
                }
                setErrorLocation({ ...errorInfo, needScroll: true })
              }
            }}
            onNext={() => {
              const errorInfo = getTargetErrorInfo({
                productSelections,
                errorLocation,
                firstErrorRowIdx: firstErrorRow,
                lastErrorRowIdx: lastErrorRow,
                findNext: true,
              })
              if (errorInfo) {
                const pageIdx = getPageNoByIdx(errorInfo.rowIdx)
                if (pageIdx !== curPage) {
                  setData(getPageData(productSelections, pageIdx))
                  setCurPage(pageIdx)
                }
                setErrorLocation({ ...errorInfo, needScroll: true })
              }
            }}
            errorCount={errorCount}
            fileErrorInfo={fileErrorInfo}
          />
        ) : (
          <></>
        )}
        {fileErrorInfo?.length > 0 ? (
          <></>
        ) : (
          <TableNew<ProductSelection>
            columns={curColumns}
            data={data}
            className="product-selection-table"
            scroll={{ x: 1000, y: 600 }}
            bordered
            loading={tableLoading}
            pagination={
              showPageToolbar
                ? {
                    pageSize: PAGE_SIZE,
                    currentPage: curPage,
                    onChange(current, size) {
                      setCurPage(current)
                      setData(getPageData(productSelections, current))
                    },
                    total: productSelections.length,
                  }
                : undefined
            }
          ></TableNew>
        )}
      </div>
    </div>
  )
}
