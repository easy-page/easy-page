import { nodeUtil } from '@easy-page/antd-ui'
import { SubmitPrefix } from '../../constant'
import { get } from 'lodash'

export const subsidyTooltip = (id: string) =>
  nodeUtil.createField(
    id,
    '提示文案',
    {
      value: '',
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
      input: {
        placeholder: '请输入',
      },
    }
  )
