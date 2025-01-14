import {
  SelectEffectType,
  SelectState,
  UI_COMPONENTS,
  nodeUtil,
} from '@easy-page/antd-ui'
import type {
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../interface'
import { get } from 'lodash'
import { toNumber } from '@/common'

export const belongBizline = nodeUtil.createField<
  SelectState<string | null>,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  SelectEffectType
>(
  'belongBizline',
  '所属业务',
  {
    required: true,
    value: { choosed: null, options: [] },
    // 下拉框不配置这个，默认值会有问题
    mode: 'single',

    postprocess: ({ value }) => {
      return {
        'activity.serviceType': value.choosed,
      }
    },
    actions: [
      {
        effectedKeys: ['bizlineOptions'],
        initRun: true,
        action: ({ effectedData, defaultValues }) => {
          const bizlineMccOptions = effectedData['bizlineOptions'] || {}

          console.log('bizlineMccOptions:', bizlineMccOptions)
          const options = Object.keys(bizlineMccOptions).map((each) => ({
            label: bizlineMccOptions[each],
            value: toNumber(each),
          }))
          console.log('bizlineMccOptions', options)
          const val = get(defaultValues, 'activity.serviceType')
          return {
            fieldValue: {
              options,
              choosed: val || null,
            },
            validate: false,
          }
        },
      },
    ],
    validate: ({ value }) => {
      if (!value || !value.choosed) {
        return { success: false, errorMsg: '必选' }
      }
      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,

    select: {
      placeholder: '请选择所属业务',
      // showSearch: true,
      // notFoundContent: null,
      // filterOption: false,
    },
  }
)
