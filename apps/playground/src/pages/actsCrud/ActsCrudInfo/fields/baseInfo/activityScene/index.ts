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
import { isCreate, isEdit, toJson, toNumber } from '@/common'
// 【其他】选项
const Other_Options = {
  label: '其他',
  value: '',
}

export const activityScene = nodeUtil.createField<
  SelectState<string[]>,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  SelectEffectType
>(
  'activitySceneTag',
  '活动场景（功能灰度中）',
  {
    required: true,
    value: { choosed: [] },
    // 下拉框不配置这个，默认值会有问题
    mode: 'multiple',

    postprocess: ({ value }) => {
      return {
        'activity.activitySceneTag':
          value.choosed?.[0] === Other_Options.value ? [] : value.choosed,
      }
    },
    preprocess({ defaultValues }) {
      const activitySceneTag = get(defaultValues, 'activity.activitySceneTag')
      return {
        choosed: activitySceneTag ? activitySceneTag : [],
      }
    },
    actions: [
      {
        effectedKeys: ['belongBizline', 'activitySceneTagConfig'],
        initRun: true,
        action: ({ effectedData, defaultValues, value }) => {
          const activitySceneTagConfigStr =
            effectedData['activitySceneTagConfig'] || []

          const activitySceneTagConfig = toJson(
            activitySceneTagConfigStr as string,
            {
              defaultValue: [],
            }
          ) as {
            id: number
            name: string
            options: Array<{ label: string; value: string }>
          }[]

          const belongBizline = effectedData['belongBizline']

          if (!belongBizline) {
            return {
              fieldValue: {
                options: [],
                choosed: [],
              },
              validate: false,
            }
          }

          const currentOptions =
            activitySceneTagConfig.find(
              (item) => item.id === toNumber(belongBizline?.choosed)
            )?.options || []

          if (!isCreate() && (!value.choosed || value.choosed.length === 0)) {
            return {
              fieldValue: {
                options: currentOptions.concat(Other_Options),
                choosed: [Other_Options.value],
              },
              validate: false,
            }
          }

          if (
            (value?.choosed || []).every((item) =>
              currentOptions.find((each) => each.value === item)
            )
          ) {
            return {
              fieldValue: {
                options: currentOptions.concat(Other_Options),
                choosed: value?.choosed,
              },
              validate: false,
            }
          }

          return {
            fieldValue: {
              options: currentOptions.concat(Other_Options),
              choosed: [],
            },
            validate: false,
          }
        },
      },
    ],
    validate: ({ value }) => {
      if (!value || (value?.choosed || []).length === 0) {
        return { success: false, errorMsg: '必选' }
      }
      return { success: true }
    },
  },
  {
    ui: UI_COMPONENTS.SELECT,

    select: {
      maxCount: 3,
      placeholder: '请选择',

      handleChange({ value, preValue, onChange }) {
        const pre = preValue as SelectState<string[]>
        const curNew = (value || []) as string[]
        const curChoosedAll = curNew.includes(Other_Options.value)
        const beforeChoosedAll = preValue.choosed?.includes(Other_Options.value)

        if (!value || value.length === 0) {
          onChange({
            ...pre,
            choosed: [],
          })
        } else {
          if (curChoosedAll && !beforeChoosedAll) {
            onChange({
              ...pre,
              choosed: [Other_Options.value],
            })
          } else if (curChoosedAll && beforeChoosedAll && curNew.length > 0) {
            onChange({
              ...pre,
              choosed: curNew.filter((e) => e !== Other_Options.value),
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
    formItem: {
      tooltip:
        '此分类会展示在BD报名端，用于BD快速筛选并报名活动；选择“其他”时，相当于无分类，BD将无法通过活动场景筛选到此活动',
    },
  }
)
