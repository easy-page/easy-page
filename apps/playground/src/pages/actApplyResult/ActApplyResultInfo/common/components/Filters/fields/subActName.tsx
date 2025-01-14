import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import {
  ActApplyResultFilterFormProps,
  ActApplyResultFilterFormState,
} from '../interface'
import { SearchRuleId } from '../../../constants'
// import { ALL } from '@/common'

export const ALL = '-1'

export const subActName = nodeUtil.createField<
  SelectState<string[]>,
  ActApplyResultFilterFormState,
  ActApplyResultFilterFormProps,
  SelectEffectType
>(
  SearchRuleId.SubActName,
  '子活动名称',
  {
    value: {
      choosed: [ALL as any],
    },
    postprocess: ({ value }) => {
      console.log('子活动名称xx2value:', value)
      const subActIds = (value.choosed || []).filter((x) => x !== ALL)
      return {
        [SearchRuleId.SubActName]: subActIds ? subActIds : undefined,
      }
    },
    preprocess({ defaultValues }) {
      return {
        choosed:
          defaultValues?.[SearchRuleId.SubActName].length === 0
            ? ['-1' as any]
            : defaultValues?.[SearchRuleId.SubActName],
      }
    },
    mode: 'multiple',
    actions: [
      {
        effectedKeys: ['subActivity'],
        initRun: true,
        action: ({ effectedData, value }) => {
          const subActs = effectedData['subActivity'] || []
          return {
            fieldValue: {
              ...value,
              options: subActs
                .map((e) => ({
                  value: e.id,
                  label: e.name,
                }))
                .concat({ label: '全部', value: ALL as any }),
            },
          }
        },
      },
    ],
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      placeholder: '子活动名称',
      handleChange({ value, onChange, preValue }) {
        console.log(
          'vvvv:',
          value,
          ALL,
          preValue,
          preValue?.choosed?.includes(ALL)
        )
        const val = value as number[]
        if (
          val.includes(ALL as any) &&
          val.length > 1 &&
          preValue?.choosed?.includes(ALL)
        ) {
          onChange({
            ...preValue,
            choosed: val.filter((x) => x !== ALL as any),
          })
          return
        } else if (
          !preValue?.choosed?.includes(ALL) &&
          val.length > 1 &&
          val.includes(ALL as any)
        ) {
          onChange({
            ...preValue,
            choosed: [ALL],
          })
          return
        }
        onChange({ ...preValue, choosed: value })
      },
    },
  }
)
