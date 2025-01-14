import { ChargeTypeEnum } from '@/common/constants/subsidy'
import { SelectState, nodeUtil } from '@easy-page/antd-ui'
import { set } from 'lodash'
import { chargeType } from './common'
import { getChargeDetailVosFromSubAct } from '../../utils'
import { ISubActivity, toNumber } from '@/common'
import { appendChargeDetailVosToSubAct } from '../../utils/appendChargeDetailVosToSubsidy'

/**
 * - 折扣活动补贴方式
 * - 增加能力
 *  - 设置为禁用
 */
export const disChargeType = nodeUtil.extends<SelectState<string>>(
  chargeType(),
  {
    postprocess() {
      return ({ value, processedFormData }) => {
        return appendChargeDetailVosToSubAct(
          {
            chargeType: value ? toNumber(value.choosed) : undefined,
          },
          processedFormData
        )
      }
    },
    preprocess() {
      return ({ defaultValues }) => {
        const chargeType = getChargeDetailVosFromSubAct(
          defaultValues as ISubActivity,
          'chargeType'
        )

        return {
          choosed: chargeType
            ? `${chargeType}`
            : `${ChargeTypeEnum.Percentage}`,
        }
      }
    },

    fieldUIConfig(oldFieldUIConfig) {
      const config = oldFieldUIConfig || {}
      set(config, 'formItem.disabled', true)
      set(config, 'formItem.labelCol', { span: 6 })
      set(config, 'formItem.wrapperCol', { span: 12 })
      return config
    },
  }
)
