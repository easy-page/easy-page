/** 闪购折扣活动-补贴类型 */

import { nodeUtil } from '@easy-page/antd-ui'
import { ChargeFlowTypeEnum, PoiTypeEnum } from '@/common'
import { CommonActCrudFormState } from '../../interface'
import { commonChargeFlowType } from './common'

/**
 * - 增加能力
 *  - 当门店类型变化，清空当前字段
 *  - 当选中其中一个选项则全选，否则则全取消
 */
export const disChargeFlowType = nodeUtil.extends<
  ChargeFlowTypeEnum[],
  CommonActCrudFormState
>(commonChargeFlowType(), {
  fieldUIConfig(oldFieldUIConfig) {
    oldFieldUIConfig.checkBoxGroup = oldFieldUIConfig.checkBoxGroup || {}
    oldFieldUIConfig.checkBoxGroup.handleChange = ({
      value,
      preValue,
      onChange,
      frameworkProps: { store },
    }) => {
      const { poiType } = store.pageState as CommonActCrudFormState
      if (poiType !== PoiTypeEnum.All) {
        onChange(value)
        return
      }
      // 选一个就全选
      const isChoose = value.length >= preValue?.length
      if (isChoose) {
        onChange([
          ChargeFlowTypeEnum.DirectMtCharge,
          ChargeFlowTypeEnum.AgentMtCharge,
        ])
      } else {
        onChange([])
      }
    }
    oldFieldUIConfig.formItem = oldFieldUIConfig.formItem || {}
    oldFieldUIConfig.formItem.tooltip =
      '本活动需要哪些补贴方参与就选哪些，一定要选全'
    return oldFieldUIConfig
  },
  actions() {
    return [
      {
        effectedKeys: ['poiType'],
        action: () => {
          return { fieldValue: [] }
        },
      },
    ]
  },
})
