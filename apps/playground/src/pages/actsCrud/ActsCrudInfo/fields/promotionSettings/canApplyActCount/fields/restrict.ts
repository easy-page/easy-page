import { nodeUtil, SelectState, UI_COMPONENTS } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../interface'
import { get } from 'lodash'

export enum CanApplyActLimit {
  NoLimit = '0',
  Limit = '1',
}

export const applyActRestrict = nodeUtil
  .createField<SelectState<CanApplyActLimit>, CommonActCrudFormState>(
    'subactivityRule.isRestrict',
    '',
    {
      required: true,
      mode: 'single',
      postprocess({ value }) {
        if (value.choosed === CanApplyActLimit.NoLimit) {
          return {
            'applyControl.subactivityRule.enterMin': 1,
            'applyControl.subactivityRule.enterMax': -1,
          }
        }
        return {}
      },
      preprocess({ defaultValues }) {
        const val = get(defaultValues, 'applyControl.subactivityRule.enterMax')
        return {
          choosed:
            val !== undefined && val !== -1
              ? CanApplyActLimit.Limit
              : CanApplyActLimit.NoLimit,
        }
      },
      value: { choosed: CanApplyActLimit.NoLimit },
    },
    {
      ui: UI_COMPONENTS.SELECT,
      select: {
        className: 'w-[100px]',
      },
    }
  )
  .appendChildren([
    nodeUtil.createNode(CanApplyActLimit.NoLimit, { name: '不限制' }),
    nodeUtil.createNode(CanApplyActLimit.Limit, { name: '选择范围' }),
  ])
