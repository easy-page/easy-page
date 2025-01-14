import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import {
  ISubActivity,
  PriceLimitEnum,
  PriceLimitEnumDesc,
  PromotionKey,
  SubsidyOptEnum,
  toNumber,
} from '@/common'
import {
  CommonActCrudFormProps,
  CommonActCrudFormState,
  CommonSubActPageProps,
  CommonSubActPageState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
import { appendToKeyList } from './utils'
import { getKeyListInfo } from '../utils'

export const priceLimit = nodeUtil
  .createField<
    SelectState<string | null>,
    CommonSubActPageState,
    CommonSubActPageProps,
    SelectEffectType
  >(
    'priceLimit',
    '提报价格限制',
    {
      required: true,
      value: {
        choosed: `${PriceLimitEnum.Unlimited}`,
        options: [],
      },
      // 下拉框不配置这个，默认值会有问题
      mode: 'single',
      preprocess: ({ defaultValues }) => {
        const info = getKeyListInfo({
          defaultValues: defaultValues as ISubActivity,
          key: PromotionKey.MinPriceLimitDays,
        })
        return {
          choosed: info?.min || `${PriceLimitEnum.Unlimited}`,
        }
      },
      postprocess: (context) => {
        const { value } = context
        return appendToKeyList(context, {
          appendValue: (keyList) => {
            keyList.push({
              key: PromotionKey.MinPriceLimitDays,
              minValue: value.choosed,
              opt: SubsidyOptEnum.Eq,
            })
            return keyList
          },
        })
      },
      validate: ({ value }) => {
        if (!value || !value.choosed) {
          return { success: false, errorMsg: '必选' }
        }
        return { success: true }
      },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      formItem: {
        tooltip: '配置后，活动价格需低于配置天数内的最低价、才能报名成功。若配置【无限制】，则无该校验逻辑。',
      },
      select: {
        placeholder: '请选择',
        className: 'w-[200px]',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(`${PriceLimitEnum.Unlimited}`, {
      name: PriceLimitEnumDesc[PriceLimitEnum.Unlimited],
    }),
    nodeUtil.createNode(`${PriceLimitEnum.Last15DaysLowestPrice}`, {
      name: PriceLimitEnumDesc[PriceLimitEnum.Last15DaysLowestPrice],
    }),
    nodeUtil.createNode(`${PriceLimitEnum.Last30DaysLowestPrice}`, {
      name: PriceLimitEnumDesc[PriceLimitEnum.Last30DaysLowestPrice],
    }),
    nodeUtil.createNode(`${PriceLimitEnum.Last45DaysLowestPrice}`, {
      name: PriceLimitEnumDesc[PriceLimitEnum.Last45DaysLowestPrice],
    }),
  ])
