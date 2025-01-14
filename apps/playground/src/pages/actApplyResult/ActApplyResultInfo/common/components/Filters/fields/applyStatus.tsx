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

const ALL = '-1'
export const applyStatus = nodeUtil.createField<
  SelectState<string[]>,
  ActApplyResultFilterFormState,
  ActApplyResultFilterFormProps,
  SelectEffectType
>(
  SearchRuleId.Status,
  '报名状态',
  {
    value: {
      choosed: [ALL],
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
        [SearchRuleId.Status]: val,
      }
    },
    mode: 'multiple',
    actions: [
      {
        effectedKeys: ['statusOptions'],
        initRun: true,
        action: ({ effectedData, value }) => {
          const statuses = effectedData['statusOptions'] || []
          return {
            fieldValue: {
              choosed: [ALL],
              options: statuses.concat({ label: '全部', value: ALL }),
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
        const pre = preValue as SelectState<string[]>
        const curNew = (value || []) as string[]
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
    },
  }
)
