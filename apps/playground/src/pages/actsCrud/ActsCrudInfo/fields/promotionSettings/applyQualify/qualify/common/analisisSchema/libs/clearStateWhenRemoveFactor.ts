import { OperationFactorItem, toJson } from '@/common'
import { FormUtil, Empty } from '@easy-page/antd-ui'

export const clearStateWhenRemoveFactor = ({
  factor,
  formUtil,
}: {
  formUtil: FormUtil<Empty>
  factor: OperationFactorItem
}) => {
  const curVal = factor.viewConfig?.default || {}

  formUtil.setField(
    factor.factorCode,
    {
      ...curVal,
      feExtend: curVal?.feExtend
        ? toJson(curVal?.feExtend, { defaultValue: {} })
        : {},
    },
    {
      validate: false,
    }
  )
}
