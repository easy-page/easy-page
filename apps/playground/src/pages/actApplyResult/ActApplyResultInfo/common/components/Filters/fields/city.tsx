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
import { ALL } from '@/common'

export const city = nodeUtil.createField<
  SelectState<number[]>,
  ActApplyResultFilterFormState,
  ActApplyResultFilterFormProps,
  SelectEffectType
>(
  SearchRuleId.CityIds,
  '所属城市',
  {
    value: {
      choosed: [ALL],
    },
    preprocess({ defaultValues }) {
      return {
        choosed: defaultValues['SearchRuleId.CityIds'] ?? [ALL],
      }
    },
    postprocess: ({ value }) => {
      let val = value.choosed
      if (value.choosed?.includes(ALL)) {
        val = undefined
      } else if (value.choosed?.length > 0) {
        val = value.choosed
      } else {
        val === undefined
      }
      return {
        [SearchRuleId.CityIds]: val,
      }
    },
    mode: 'multiple',
    actions: [
      {
        effectedKeys: ['cities'],
        initRun: true,
        action: ({ effectedData, value }) => {
          const cities = effectedData['cities'] || []
          return {
            fieldValue: {
              ...value,
              options: cities.concat({ cityName: '全部', cityId: ALL }),
            },
          }
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      handleChange({ value, preValue, onChange }) {
        const pre = preValue as SelectState<number[]>
        const curNew = (value || []) as number[]
        const curChoosedAll = curNew.includes(ALL)
        const beforeChoosedAll = preValue.choosed?.includes(ALL)
        if (curChoosedAll && !beforeChoosedAll) {
          onChange({
            ...pre,
            choosed: [ALL],
          })
        } else if (curChoosedAll && beforeChoosedAll && curNew.length > 0) {
          onChange({
            ...pre,
            choosed: curNew.filter((e) => e !== ALL),
          })
        } else {
          onChange({
            ...pre,
            choosed: value || [],
          })
        }
      },
      fieldNames: {
        label: 'cityName',
        value: 'cityId',
      },
    },
  }
)
