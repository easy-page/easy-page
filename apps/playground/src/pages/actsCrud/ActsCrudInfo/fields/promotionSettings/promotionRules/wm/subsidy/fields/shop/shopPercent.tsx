import { ISubActivity, PromotionKey, SubsidyOptEnum, toNumber } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { Input } from 'antd'
import { appendToKeyList } from '../../../utils'
import { getKeyListInfo } from '../../../../utils'
import {
  CommonSubActPageState,
  CommonSubActPageProps,
} from '@/pages/actsCrud/ActsCrudInfo/fields/interface'

export type DiscountRangeOptions = {
  min: number
  max: number
  unit: string
}

export type DiscountRateState = {
  minValue: string
  maxValue: string
}

const getShopMinPercent = (mtPercent, atPercent) => {
  if (mtPercent && !atPercent?.maxValue) {
    return 100 - toNumber(mtPercent)
  }
  if (mtPercent && atPercent?.maxValue) {
    return 100 - toNumber(mtPercent) - toNumber(atPercent.maxValue)
  }
  if (!mtPercent && !atPercent?.maxValue) {
    return 100
  }
  if (!mtPercent && atPercent?.maxValue) {
    return 100 - toNumber(atPercent.maxValue)
  }
}
const getShopMaxPercent = (mtPercent, atPercent) => {
  if (mtPercent && !atPercent?.minValue) {
    return 100 - toNumber(mtPercent)
  }
  if (mtPercent && atPercent?.minValue) {
    return 100 - toNumber(mtPercent) - toNumber(atPercent.minValue)
  }
  if (!mtPercent && !atPercent?.minValue) {
    return 100
  }
  if (!mtPercent && atPercent?.minValue) {
    return 100 - toNumber(atPercent.minValue)
  }
}
const getShopPercent = (mtPercent, atPercent) => {
  return {
    minValue: getShopMinPercent(mtPercent, atPercent).toString() || '',
    maxValue: getShopMaxPercent(mtPercent, atPercent).toString() || '',
  }
}
export const shopPercent = ({ min, max, unit }: DiscountRangeOptions) =>
  nodeUtil.createCustomField<
    DiscountRateState,
    CommonSubActPageState,
    CommonSubActPageProps
  >(
    'shopPercent',
    '每单商家成本占比',
    ({ value, onChange }) => {
      return (
        <div className="flex flex-row items-center">
          <Input
            suffix={unit}
            disabled
            value={value?.minValue}
            onChange={(e) => {
              onChange({
                ...value,
                minValue: e.target.value,
              })
            }}
            // placeholder={`${min}-${max}之间`}
          />
          <span className="px-2">至</span>
          <Input
            suffix={unit}
            disabled
            value={value?.maxValue}
            onChange={(e) => {
              onChange({
                ...value,
                maxValue: e.target.value,
              })
            }}
            // placeholder={`${min}-${max}之间`}
          />
        </div>
      )
    },
    {
      value: {
        minValue: '',
        maxValue: '',
      },
      preprocess: ({ defaultValues }) => {
        const info = getKeyListInfo({
          defaultValues: defaultValues as ISubActivity,
          key: PromotionKey.PoiSubsidyRatio,
        })
        return {
          minValue: info?.min,
          maxValue: info?.max,
        }
      },
      postprocess(context) {
        return appendToKeyList(context, {
          appendValue(keyList) {
            const { value } = context
            const atInfo = keyList.find(
              (x) => x.key === PromotionKey.PoiSubsidyRatio
            )
            if (!atInfo) {
              keyList.push({
                key: PromotionKey.PoiSubsidyRatio,
                minValue: value.minValue,
                maxValue: value.maxValue,
                opt: SubsidyOptEnum.CloseInterval,
              })
              return keyList
            }
            return keyList.map((e) => {
              if (e.key === PromotionKey.PoiSubsidyRatio) {
                return {
                  ...e,
                  minValue: value.minValue,
                  maxValue: value.maxValue,
                  opt: SubsidyOptEnum.CloseInterval,
                }
              }
              return e
            })
          },
        })
      },
      actions: [
        {
          effectedKeys: ['mtPercent', 'atPercent'],
          initRun: true,
          action: ({ value, effectedData }) => {
            const { mtPercent, atPercent } = effectedData
            console.log('mtPercent', mtPercent)
            console.log('atPercent', atPercent)
            return {
              fieldValue: getShopPercent(mtPercent, atPercent),
            }
          },
        },
      ],
    }
  )
