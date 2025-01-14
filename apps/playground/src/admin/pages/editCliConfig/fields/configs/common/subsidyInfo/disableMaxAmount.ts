import { nodeUtil, UI_COMPONENTS } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { FieldConfigFormState, FieldConfigFormProps } from '../../interface'
import { SubmitPrefix } from '../../constant'

export const disabledMaxAmount = (id: string) =>
  nodeUtil.createField<boolean, FieldConfigFormState, FieldConfigFormProps>(
    id,
    '禁用最大金额',
    {
      value: false,
      postprocess({ value }) {
        return {
          [`${SubmitPrefix}.${id}`]: value,
        }
      },
      preprocess({ defaultValues }) {
        console.log('defaultValues:', defaultValues)
        return get(defaultValues, `fullConfig.${SubmitPrefix}.${id}`)
      },
    },
    {
      ui: UI_COMPONENTS.SWITCH,
      formItem: {
        extra: '',
      },
    }
  )
