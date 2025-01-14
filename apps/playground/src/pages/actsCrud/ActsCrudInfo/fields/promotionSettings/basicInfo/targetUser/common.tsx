import {
  ISubActivity,
  PromotionKey,
  SubsidyOptEnum,
  TargetUserTypeDesc,
  TargetUserTypeEnum,
} from '@/common'
import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { appendToKeyList, getKeyListInfo } from '../../promotionRules/utils'

console.log('TargetUserTypeEnum:', TargetUserTypeEnum)

export const targetUser = nodeUtil.createField<SelectState<string>>(
  'targetUser',
  '目标人群',
  {
    required: true,
    mode: 'single',
    value: { choosed: `${TargetUserTypeEnum.ALL}` },
    postprocess: ({ value, processedFormData }) => {
      return appendToKeyList({
        content: {
          key: PromotionKey.TargetUserType,
          opt: SubsidyOptEnum.Eq,
          minValue: value.choosed,
        },
        processedFormData,
        fieldKey: PromotionKey.TargetUserType,
      })
    },
    preprocess: ({ defaultValues }) => {
      const info = getKeyListInfo({
        defaultValues: defaultValues as ISubActivity,
        key: PromotionKey.TargetUserType,
      })
      return {
        choosed: info?.min || `${TargetUserTypeEnum.ALL}`,
        options: [
          TargetUserTypeEnum.ALL,
          TargetUserTypeEnum.SG_NEW_CUSTOMER,
          TargetUserTypeEnum.SHOP_NEW_CUSTOMER,
          TargetUserTypeEnum.PLATFORM_NEW_CUSTOMER,
        ].map((each) => {
          return {
            label: TargetUserTypeDesc[each],
            value: `${each}`,
          }
        }),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,

    select: {
      className: 'max-w-[200px]',
    },
  }
)
