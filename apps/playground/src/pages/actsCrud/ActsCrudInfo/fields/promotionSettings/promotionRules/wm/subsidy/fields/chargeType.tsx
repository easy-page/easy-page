import { Empty, nodeUtil, SelectState } from '@easy-page/antd-ui'
import {
  chargeType,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { ChargeTypeEnum, ChargeTypeEnumDesc } from '@/common/constants'
import { appendSubsidyListToContentList } from '../../utils'

// 补贴方式
export const wmdChargeType = nodeUtil.extends<
  SelectState<string>,
  CommonActCrudFormState,
  Empty
>(chargeType(), {
  value: {
    choosed: ChargeTypeEnumDesc[ChargeTypeEnum.Percentage],
  },
  postprocess() {
    return (context) => {
      return appendSubsidyListToContentList(context, {
        appendValue: {
          chargeType: ChargeTypeEnum.Percentage,
        },
      })
    }
  },
  fieldUIConfig(oldFieldUIConfig) {
    const newConfig = { ...oldFieldUIConfig } || {}
    newConfig.formItem = newConfig.formItem || {}
    newConfig.formItem.disabled = true
    return newConfig
  },
})
