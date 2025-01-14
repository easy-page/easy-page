import {
  batchGrayModel,
  CategoryCode,
  CheckOpGrayResEnum,
  FactorStatus,
  OperationFactorItem,
  ValidatorType,
} from '@/common'
import classNames from 'classnames'
import { Tooltip } from 'antd'
import { DangerouslySetInnerHTML } from '@/common'
import './index.less'
import { FactorAssociationRulesMap } from '@/pages/actsCrud/ActsCrudInfo/actsPages'
import { useEffect, useState } from 'react'
import { WarningOutlined } from '@ant-design/icons'
import { clearStateWhenRemoveFactor } from '../../common/analisisSchema/libs/clearStateWhenRemoveFactor'
import { FormUtil } from '@easy-page/antd-ui'

export type FactorItemProps = {
  choosedFactors: OperationFactorItem[]
  categoryCode: CategoryCode
  setChooseFactors: (choosedFactors: OperationFactorItem[]) => void
  searched: boolean
  categoryTitle: string
  formRef: React.MutableRefObject<FormUtil<Record<string, any>>>
  disabled?: boolean
  factorAssociationRulesMap: FactorAssociationRulesMap
  factor: OperationFactorItem
}

const checkMccRulesValid = (
  factor: OperationFactorItem,
  factorRule: FactorAssociationRulesMap
) => {
  const { validators } = factor
  // 如果因子不存在互斥校验配置
  if (
    !validators.factor ||
    !validators.factor.find((item) => item.type === ValidatorType.Association)
  ) {
    return false
  }

  // 因子存在配置，但Mcc无配置
  if (!factorRule || !Object.keys(factorRule).includes(factor.factorCode)) {
    return false
  }

  return true
}

export const FactorItem = ({
  choosedFactors,
  searched,
  categoryCode,
  factor,
  formRef,
  disabled: disabledAll,
  factorAssociationRulesMap,
  categoryTitle,
  setChooseFactors,
}: FactorItemProps) => {
  const choosed = Boolean(
    choosedFactors.find((e) => e.factorCode === factor.factorCode)
  )

  // 互斥配置
  const [isUnderMutualExclusion, setIsUnderMutualExclusion] = useState(false)
  const [inclusionInfo, setInclusionInfo] = useState({
    /** 是否存在因子依赖，即：选择了某个因子后才可选择 */
    hasDep: false,
    /** 依赖因子是否已经全部选择 */
    selectedAll: false,
  })
  const tooltip = factor.viewConfig['x-decorator-props']?.tooltip
  const subscript = factor.viewConfig['x-decorator-props']?.subscript
  useEffect(() => {
    const isMccRuleValid = checkMccRulesValid(factor, factorAssociationRulesMap)

    // 因子在Mcc中无可用互斥配置
    const factorRuleItem = factorAssociationRulesMap[factor.factorCode]
    if (factorRuleItem?.exclusion && isMccRuleValid) {
      const { exclusion } = factorRuleItem
      const isUnder = choosedFactors.some((item) =>
        exclusion.includes(item.factorCode)
      )
      setIsUnderMutualExclusion(isUnder)
    }
    if (factorRuleItem?.co_occurrence && isMccRuleValid) {
      const hasAllChoosed = factorRuleItem.co_occurrence.every((x) =>
        Boolean(choosedFactors.find((e) => e.factorCode === x))
      )
      setInclusionInfo({ hasDep: true, selectedAll: hasAllChoosed })
    }
  }, [factorAssociationRulesMap, choosedFactors, factor])

  const { data: grayInfo } = batchGrayModel.getData()

  const decoratorProps = factor.viewConfig?.['x-decorator-props']

  const disabled =
    disabledAll ||
    factor.status === FactorStatus.Disable ||
    isUnderMutualExclusion ||
    (inclusionInfo?.hasDep && !inclusionInfo.selectedAll) ||
    (decoratorProps?.grayKey &&
      grayInfo[decoratorProps?.grayKey] === CheckOpGrayResEnum.Fail)

  return (
    <Tooltip
      title={
        tooltip ? (
          <DangerouslySetInnerHTML>{tooltip}</DangerouslySetInnerHTML>
        ) : null
      }
    >
      <div
        className={classNames('mr-2 mt-4 factor-item cursor-pointer', {
          'factor-item-disabled': !choosed && disabled, // 如果是选择的，有限呈现选择的样式
          'factor-item-searched': searched,
          'factor-item-choosed': choosed && !searched,
        })}
        onClick={() => {
          /** 已经禁用的，不可再次编辑 */
          if (disabled) {
            return
          }
          if (choosed) {
            // 已经选择过了，再点击，则取消
            const newChoosed = choosedFactors.filter(
              (e) => e.factorCode !== factor.factorCode
            )
            setChooseFactors(newChoosed)
            clearStateWhenRemoveFactor({ factor, formUtil: formRef.current })
          } else {
            setChooseFactors([
              ...choosedFactors,
              { ...factor, categoryCode: categoryCode, categoryTitle },
            ])
          }
        }}
        key={factor.factorCode}
      >
        {subscript && (
          <div
            className={classNames('factor-item-recommended', {
              'factor-item-recommended-disabled': disabled,
            })}
          >
            {subscript}
          </div>
        )}
        {factor.factorName}
        {disabled && choosed ? <WarningOutlined className="ml-2" /> : <></>}
      </div>
    </Tooltip>
  )
}
