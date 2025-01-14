import { PostprocessContext, DataContext, Empty } from '@easy-page/antd-ui'
import { FactorsFormProps } from '../analisisSchema/interface'
import { FactorCityState } from '@/common/components'
import { toJson } from '@/common/libs'

export enum FactorCodes {
  MerchantCategoryType = 'merchant_category_type',
  City = 'city',
}

export const processMap: Record<
  FactorCodes,
  {
    postprocess?: (
      context: PostprocessContext<any, Empty, FactorsFormProps>
    ) => Record<string, unknown>
    preprocess?: (
      context: Pick<
        DataContext<any, Empty, FactorsFormProps, Record<string, any>>,
        'defaultValues' | 'pageProps'
      >
    ) => any
  }
> = {
  [FactorCodes.MerchantCategoryType]: {
    postprocess({ value }) {
      const curVal = value as FactorCityState
      if (!value || !curVal.value) {
        return {}
      }
      return {
        [FactorCodes.MerchantCategoryType]: JSON.stringify({
          value: curVal.value,
          feExtend: JSON.stringify(curVal.feExtend),
        }),
      }
    },
    preprocess({ defaultValues }) {
      const val = defaultValues?.[FactorCodes.MerchantCategoryType]
      if (!val) {
        return { value: [] }
      }
      const json = toJson(val)
      if (!json) {
        return { value: [] }
      }
      return {
        value: json.value,
        feExtend: toJson(json.feExtend, { defaultValue: {} }),
      }
    },
  },
  [FactorCodes.City]: {
    postprocess({ value }) {
      const curVal = value as FactorCityState
      if (!value || !curVal.value) {
        return {}
      }
      return {
        [FactorCodes.City]: JSON.stringify({
          value: curVal.value,
          type: curVal.type,
          feExtend: JSON.stringify(curVal.feExtend),
        }),
      }
    },
    preprocess({ defaultValues }) {
      const val = defaultValues?.[FactorCodes.City]
      if (!val) {
        return { value: null }
      }
      const json = toJson(val)
      if (!json) {
        return { value: null }
      }
      return {
        value: json.value,
        type: json.type,
        feExtend: toJson(json.feExtend, { defaultValue: {} }),
      }
    },
  },
}
