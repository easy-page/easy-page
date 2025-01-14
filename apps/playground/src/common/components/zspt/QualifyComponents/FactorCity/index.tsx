// 所在城市
import { OpTypeEnum } from '@/common/constants'
import CitySelecterInput from '@mtfe/uoc-city-selecter/CitySelecterInput'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import './index.less'
import { FeExtend } from '../interface'
import { getRedText } from '../RedText'
import { OperationFactorItem } from '@/common/apis'
import { FormItemInputContext } from 'antd/es/form/context'
import classNames from 'classnames'

const TYPE_PREVIEW_MAP = {
  [OpTypeEnum.EXACT_MATCH]: '已选择',
  [OpTypeEnum.EXACT_EXCLUDE]: '已排除',
}

enum CHOOSE_TYPE {
  Include = 1,
  Exclude = 2,
}

// 全国
const NATIONWIDE = '-1'

export type FactorCityBaseProps = {
  value: FactorCityState
  onChange: (value: FactorCityState) => void
  mccCityMaxNum: number
  factor: OperationFactorItem
  disabled?: boolean
}

export type FactorCityState = {
  type: OpTypeEnum.EXACT_MATCH | OpTypeEnum.EXACT_EXCLUDE
  value: string
  feExtend: FeExtend
}

// 城市组件的状态
export type CitiyState = {
  selectMode: number
  isCountry: boolean
  selectType: number
  citys: Record<string, any>[]
  cityGroups: any[]
  errorIds: any[]
  input: string
}

const DEFAULT_MAX_NUM = 1600

export const BaseFactorCity: React.FC<FactorCityBaseProps> = ({
  mccCityMaxNum = DEFAULT_MAX_NUM,
  value,
  factor,
  disabled,
  onChange,
}) => {
  const [cityValue, setCityValue] = useState<CitiyState>({
    selectMode: 1,
    isCountry: false,
    selectType: 1,
    citys: [],
    cityGroups: [],
    errorIds: [],
    input: '',
  })

  const { status } = useContext(FormItemInputContext)
  const hasError = status === 'error'

  const performOnChange = (newValue: FactorCityState) => {
    onChange({
      ...newValue,
      feExtend: {
        ...(newValue.feExtend || {}),
        factorCategoryCode: factor.categoryCode,
        previewInfo: `${factor.factorName}：${
          TYPE_PREVIEW_MAP[newValue.type]
        } ${getRedText(
          newValue.value === NATIONWIDE
            ? '全国'
            : `${newValue.value.split(',').length} 个`
        )}`,
      },
    })
  }

  const onCityValueChange = useCallback((obj: CitiyState) => {
    if (!obj) {
      console.log('clear citiy：：', {
        ...value,
        type: OpTypeEnum.EXACT_MATCH,
        value: '',
        feExtend: {
          ...(value?.feExtend || {}),
          originData: '',
        },
      })
      performOnChange({
        ...value,
        type: OpTypeEnum.EXACT_MATCH,
        value: '',
        feExtend: {
          ...(value?.feExtend || {}),
          originData: '',
        },
      })
      setCityValue(obj)
      return
    }

    // 深拷贝防止影响城市组件内部数据
    const val = JSON.parse(JSON.stringify(obj))
    let ids = ''
    let idsArr = val.citys.map((el: Record<string, any>) => el.cityId)
    if (val.cityGroups && val.cityGroups.length) {
      const groupCityList: any[] = []
      val.cityGroups.forEach((group: any) => {
        group.cityList &&
          group.cityList.forEach((city: any) => {
            groupCityList.push(city.cityId)
          })
      })
      idsArr = idsArr.concat(groupCityList)
    }
    idsArr = Array.from(new Set(idsArr))
    ids = idsArr.join(',')
    if (val.remark === '全国') {
      ids = NATIONWIDE
    }
    if (val.input) {
      ids = val.input
    }
    // selectMode 1为选择，2为排除
    const type =
      val.selectMode === CHOOSE_TYPE.Include
        ? OpTypeEnum.EXACT_MATCH
        : OpTypeEnum.EXACT_EXCLUDE

    performOnChange({
      ...value,
      type,
      value: ids,
      feExtend: {
        ...(value?.feExtend || {}),
        originData: JSON.stringify(val),
      },
    })
    setCityValue(obj)
  }, [])

  useEffect(() => {
    setCityValue({
      ...cityValue,
      ...(value?.feExtend?.originData
        ? JSON.parse(value?.feExtend?.originData)
        : {}),
    })
  }, [value?.feExtend?.originData])

  const citiesCount = value?.value?.split(',').length
  const showWarning =
    citiesCount > mccCityMaxNum && value?.type === OpTypeEnum.EXACT_MATCH
  console.log(
    'ccccccc:',
    citiesCount,
    mccCityMaxNum,
    value?.type === OpTypeEnum.EXACT_MATCH
  )
  return (
    <div className="flex flex-col factor-city">
      <CitySelecterInput
        dataSource={1000}
        className={classNames({
          'factor-input-error': hasError,
        })}
        id="factor-city"
        value={cityValue}
        disabled={disabled}
        showClear={!disabled}
        requestMode={2}
        onChange={onCityValueChange}
      />
      {showWarning ? (
        <div className="city-type-tip">{`注意：当前已配置的城市id数超过${mccCityMaxNum}个，会导致生效时间过长，建议换用“${
          value?.type === OpTypeEnum.EXACT_MATCH ? '排除城市' : '选择城市'
        }”的方式配置`}</div>
      ) : (
        <></>
      )}
    </div>
  )
}
