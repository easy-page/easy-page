import { toNumber } from '@/common'
import { Empty, nodeUtil, RadioGroupEffectType } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { requirementInput } from './requirementInput'
import { RequirementTypeEnum } from './utils'
import { WmsActFormProps, WmsActFormState } from '../../../../../interface'
import { sourceNameListModel } from '@/common/models/sourceInfoNameList'

const requirementOptions = [
  {
    label: '需要',
    value: RequirementTypeEnum.Need,
  },
  {
    label: '不需要',
    value: RequirementTypeEnum.NotNeed,
  },
]

export const sourceRequirement = nodeUtil.createField<
  RequirementTypeEnum,
  any,
  any,
  RadioGroupEffectType
>(
  'needRequire',
  '供应商提供素材',
  {
    required: true,
    mode: 'single',
    value: RequirementTypeEnum.NotNeed,
    preprocess({ defaultValues }) {
      const needMaterial = get(defaultValues, 'needMaterial')

      return needMaterial === undefined
        ? RequirementTypeEnum.NotNeed
        : (`${needMaterial}` as RequirementTypeEnum)
    },
    postprocess: ({ value }) => {
      return {
        needMaterial: toNumber(value),
      }
    },

    actions: [
      {
        effectedKeys: ['resourceName'],
        action: ({ value, effectedData }) => {
          const resourceName = effectedData['resourceName']

          if (sourceNameListModel.getList().data.length === 0) {
            return {
              fieldValue: value,
              effectResult: {
                options: [
                  {
                    label: '需要',
                    value: RequirementTypeEnum.Need,
                  },
                  {
                    label: '不需要',
                    value: RequirementTypeEnum.NotNeed,
                  },
                ],
              },
            }
          }

          const resourceNameConfig = sourceNameListModel.getSourceNameConfig(
            resourceName?.choosed
          )

          if (!resourceNameConfig || (resourceNameConfig || []).length === 0) {
            return {
              fieldValue: RequirementTypeEnum.NotNeed,
              effectResult: {
                options: [
                  {
                    label: '需要',
                    disabled: true,
                    value: RequirementTypeEnum.Need,
                  },
                  {
                    label: '不需要',
                    value: RequirementTypeEnum.NotNeed,
                  },
                ],
              },
            }
          }

          return {
            fieldValue: value,
            effectResult: {
              options: [
                {
                  label: '需要',
                  value: RequirementTypeEnum.Need,
                },
                {
                  label: '不需要',
                  value: RequirementTypeEnum.NotNeed,
                },
              ],
            },
          }
        },
        initRun: true,
      },
    ],
  },
  {
    radioGroup: {
      options: [
        {
          label: '需要',
          value: RequirementTypeEnum.Need,
        },
        {
          label: '不需要',
          value: RequirementTypeEnum.NotNeed,
        },
      ],
    },
  }
)
