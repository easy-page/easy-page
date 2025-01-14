import { nodeUtil } from '@easy-page/antd-ui'
import {
  RangeConfig,
  RangeState,
  numberRangeField,
} from '@/common/fields/common/numberRangeField'
import { SubsidyOptEnum } from '@/common'
import { StockReqFormState } from '../interface'
import {
  StockRequestEnum,
  StockRequestType,
} from '@/common/apis/saveAct/interfaces/stockReq'

const PriceRange: RangeConfig = {
  max: 999999,
  min: 1,
}

export const commonStockField = (id: StockRequestEnum, label: string) => {
  return nodeUtil.extends<RangeState, StockReqFormState>(
    numberRangeField({
      id,
      label: '',
      range: PriceRange,
      denyZero: true,
      formItemConfig: {
        className: 'col-span-1 mb-0',
      },
      validateConfig: {
        errorMsg: '1~999999，仅支持整数。',
        checkInteger: true,
      },
    }),
    {
      preprocess() {
        return ({ defaultValues }) => {
          const curStockRule = defaultValues?.[id]
          return {
            min: curStockRule?.minValue,
            max: curStockRule?.maxValue,
          }
        }
      },
      postprocess() {
        return ({ value }) => {
          return {
            [id]: {
              key: id,
              opt: SubsidyOptEnum.CloseInterval,
              minValue: value.min,
              maxValue: value.max,
            },
          }
        }
      },

      fieldUIConfig(oldFieldUIConfig) {
        const config = oldFieldUIConfig || {}
        config.formItem.label = label
        config.formItem.className = 'col-span-1'
        return config
      },
    }
  )
}
