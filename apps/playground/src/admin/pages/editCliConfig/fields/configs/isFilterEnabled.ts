import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { FieldConfigFormState, FieldConfigFormProps } from './interface'
import { showDecorator } from './common/showDecorator'
import { SubmitPrefix } from './constant'
import { commonContainer } from './common/commonContainer'

export const isFilterEnabled = showDecorator(
  'inputIdsWayOfEdit',

  commonContainer('inputIdsWayOfEdit', '【编辑】邀请方式配置').appendChildren([
    nodeUtil.createField<boolean, FieldConfigFormState, FieldConfigFormProps>(
      'inputIdsWayOfEdit.isFilterEnabled',
      '通过条件筛选',
      {
        value: false,
        required: true,
        postprocess({ value }) {
          return {
            [`${SubmitPrefix}.inputIdsWayOfEdit.isFilterEnabled`]: value,
          }
        },
        preprocess({ defaultValues }) {
          console.log('defaultValues:', defaultValues)
          return get(
            defaultValues,
            `fullConfig.${SubmitPrefix}.inputIdsWayOfEdit.isFilterEnabled`
          )
        },
      },
      {
        ui: UI_COMPONENTS.SWITCH,
        formItem: {
          extra: '打开时，启用「邀请设置-邀请方式-通过条件筛选」',
        },
      }
    ),
  ])
)
