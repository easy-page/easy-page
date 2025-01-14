import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import { SearchRuleId } from './constant'
import { ConfirmStatusOptions } from '@/common/apis/getBatchConfirmActList'
import { ConfirmStatusEnum, getQueryString, toJson } from '@/common'

const ALL = -1
export const confirmStatus = nodeUtil.createField<
  SelectState<number[]>,
  {},
  {},
  SelectEffectType
>(
  SearchRuleId.ConfirmStatus,
  '补贴提报状态',
  {
    postprocess: ({ value }) => {
      let val: number[] | undefined = value.choosed
      if (value.choosed?.includes(ALL)) {
        val = undefined
      } else if (value.choosed?.length > 0) {
        val = value.choosed
      } else {
        val === undefined
      }
      return {
        [SearchRuleId.ConfirmStatus]: val,
      }
    },
    mode: 'multiple',
    preprocess: () => {
      return {
        choosed: [ConfirmStatusEnum.UnConfirm],
        options: ConfirmStatusOptions.concat({ label: '全部', value: ALL }),
      }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,
    select: {
      handleChange({ value, preValue, onChange }) {
        const pre = preValue as SelectState<number[]>
        const curNew = (value || []) as number[]
        const curChoosedAll = curNew.includes(ALL)
        const beforeChoosedAll = preValue.choosed?.includes(ALL)

        if (!value || value.length === 0) {
          onChange({
            ...pre,
            choosed: [ALL],
          })
        } else {
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
        }
      },
    },
  }
)
