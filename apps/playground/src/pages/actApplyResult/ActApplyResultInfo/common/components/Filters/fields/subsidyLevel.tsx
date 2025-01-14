import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import { SearchRuleId } from '../../../constants'
import {
  ActApplyResultFilterFormProps,
  ActApplyResultFilterFormState,
} from '../interface'
import { SubsidyLevelEnum, SubsidyLevelText } from '@/common'

const ALL = '-1'
export const subsidyLevel = nodeUtil.createField<
  SelectState<string>,
  ActApplyResultFilterFormState,
  ActApplyResultFilterFormProps,
  SelectEffectType
>(
  SearchRuleId.SubsidyLevel,
  '商补出资档位',
  {
    value: {
      choosed: ALL as any,
    },
    postprocess: ({ value }) => {
      return {
        [SearchRuleId.SubsidyLevel]: value.choosed,
      }
    },
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues[SearchRuleId.SubsidyLevel] ?? (ALL as any),
        options: [
          {
            value: ALL as any,
            label: '全部',
          },
          {
            value: SubsidyLevelEnum.Base,
            label: SubsidyLevelText.base,
          },
  
          {
            value: SubsidyLevelEnum.Expand,
            label: SubsidyLevelText.expand,
          },
        ]
      }
    },
    mode: 'single',
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      // options: ,
    },
  }
)
