import {
  CategoryCode,
  DataCollector,
  FactorListFirstCategory,
  FeExtend,
  OperationFactorItem,
  toJson,
} from '@/common'
import { Table, Tooltip } from 'antd'
import React, { useCallback, useMemo } from 'react'

type FactorTableProps = {
  dataCollector: DataCollector
  searchOptions: OperationFactorItem[]
}

const CategoryCodeDesc = {
  [CategoryCode.Poi]: '商家维度',
  [CategoryCode.Sku]: '商品维度',
}

export const FactorTable = ({
  dataCollector,
  searchOptions,
}: FactorTableProps) => {
  const columns = [
    {
      width: 150,
      dataIndex: 'factorType',
      key: 'factorType',
      title: '筛选维度',
    },
    {
      width: 150,
      dataIndex: 'name',
      key: 'name',
      title: '因子名称',
    },
    {
      width: 380,
      dataIndex: 'content',
      key: 'content',
      title: '因子内容',
      render: (text, row, index) => {
        return (
          <Tooltip
            title={<div dangerouslySetInnerHTML={{ __html: text }}></div>}
          >
            <div
              dangerouslySetInnerHTML={{ __html: text }}
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: 380,
              }}
            ></div>
          </Tooltip>
        )
      },
    },
  ]

  const getRowData = useCallback(
    (factor: string, key: string) => {
      const factorValue = toJson(factor)
      const factorConfig = toJson(factorValue?.feExtend) as FeExtend
      const originFactorConfig = (searchOptions || []).find(
        (each) => each.factorCode === key
      )

      let factorType
      if (factorConfig?.factorCategoryCode) {
        factorType = CategoryCodeDesc[factorConfig?.factorCategoryCode]
      } else {
        const factorConfig = (searchOptions || []).find(
          (item) => item.factorCode === key
        )
        factorType = CategoryCodeDesc[factorConfig?.categoryCode]
      }

      return {
        factorType,
        name: originFactorConfig?.factorName,
        content: factorConfig?.previewInfo,
      }
    },
    [searchOptions]
  )

  const tableData = useMemo(() => {
    return Object.keys(dataCollector || {}).map((key) =>
      getRowData(dataCollector[key], key)
    )
  }, [dataCollector])

  console.log('tableData', tableData, columns)

  return (
    <div>
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </div>
  )
}
