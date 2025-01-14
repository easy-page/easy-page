/* eslint-disable @typescript-eslint/ban-ts-comment */
// 通用多选级联组件
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './index.less'
import { Cascader, CascaderProps, Tooltip } from 'antd'
import { FeExtend } from '../interface'
import { ComponentBaseProps, OperationFactorItem } from '@/common/apis'
import { getRedText } from '../RedText'
import { getBizLine } from '@/common/libs'
import { observer } from 'mobx-react'
import {
  factorGoodListModel,
  loadFactorGoodsToModel,
} from './utils/searchFactorGoods'
import classNames from 'classnames'
import { getNodeString } from './utils/getNodeString'
import { getLeafIds } from './utils/getLeafIds'
import { findLeafPaths } from './utils/getChooseNodePaths'
import './index.less'
import { DotText } from '@/common/components/base'

export type FactorMultiCascaderState = {
  value: string // 选择的叶子节点，英文逗号隔开
  feExtend: FeExtend
}

export type FactorMultiCascaderProps = Omit<CascaderProps, 'value'> & {
  factor: OperationFactorItem
  oldProps: {
    value: Pick<
      ComponentBaseProps,
      | 'placeholder'
      | 'searchMethod'
      | 'searchUrl'
      | 'leafLevel'
      | 'cascade'
      | 'previewSuffix'
      | 'showDataUrlParamFromBe'
      | 'multiple'
    >
  }
  multiCascader?: Omit<CascaderProps, 'value' | 'onChange' | 'placeholder'>
  value: FactorMultiCascaderState
  onChange: (value: FactorMultiCascaderState) => void
  disabled?: boolean
}

export const FactorMultiCascader: React.FC<FactorMultiCascaderProps> = observer(
  ({ value, factor, oldProps, onChange, ...rest }) => {
    const {
      searchUrl,
      searchMethod,
      placeholder,
      leafLevel,
      cascade,
      previewSuffix,
      multiple,
      showDataUrlParamFromBe,

      ...restOldProps
    } = oldProps?.value || {}

    const handleValueChange = (newValue: number[][]) => {
      onChange({
        ...value,
        value: getLeafIds(newValue).join(','),
        feExtend: {
          ...(value?.feExtend || {}),
          factorCategoryCode: factor.categoryCode,
          previewInfo: `${factor.factorName}：已选 ${getRedText(
            `${newValue.length} 个${previewSuffix ?? ''}`
          )}`,
        },
      })
    }

    const { data: factorGoods, loading } = factorGoodListModel.getList()

    useEffect(() => {
      loadFactorGoodsToModel({
        showDataUrlParamFromBe,
        showDataUrlParamFromFe: JSON.stringify({
          bizType: getBizLine(),
        }),
        searchUrl,
        method: searchMethod,
        leafLevel,
      })
    }, [])

    const factorElId = `cascader_${factor.factorCode}`
    const [search, setSearch] = useState('')
    const { choosedVal, choosedStr } = useMemo(() => {
      const { names, paths } = findLeafPaths(value.value || '', factorGoods)
      return {
        choosedVal: paths,
        choosedStr: (names || [])
          .map((e) => {
            return e.join('-')
          })
          .join('、'),
      }
    }, [value, factorGoods])

    return (
      <div>
        {factorGoods?.length > 0 ? (
          <Tooltip
            title={choosedStr}
            overlayClassName="category-factor-tooltip"
            trigger={'hover'}
          >
            {/** @ts-ignore */}
            <Cascader
              onChange={handleValueChange}
              value={choosedVal}
              loading={loading}
              className={factorElId}
              showSearch
              onSearch={(val) => {
                setSearch(val)
              }}
              placeholder={placeholder}
              placement="bottomLeft"
              getPopupContainer={() => {
                return document.querySelector(`qualify-dialog`)
              }}
              optionRender={({ name, id }) => {
                /** 存在性能问题，不展示 Tooltip 了吧 */
                return (
                  // <Tooltip title={name}>
                  <div
                    className={classNames({
                      'w-[200px]': !search,
                      'max-w-[400px]': Boolean(search),
                    })}
                    style={{
                      textOverflow: 'ellipsis',
                      display: 'block',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {name}
                  </div>
                  // </Tooltip>
                  // <DotText key={id} line={1} className="w-[200px]">
                  //   {name}
                  // </DotText>
                )
              }}
              maxTagCount={2}
              multiple
              showCheckedStrategy={'SHOW_CHILD'}
              // {...restOldProps}
              {...rest}
              fieldNames={{
                value: 'id',
                label: 'name',
              }}
              options={factorGoods as any}
            />
          </Tooltip>
        ) : (
          <span style={{ color: '#868686' }}>数据加载中...</span>
        )}
      </div>
    )
  }
)
