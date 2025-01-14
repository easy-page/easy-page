import { nodeUtil } from '@easy-page/antd-ui'
import { SubmitPrefix } from '../constant'
import { get } from 'lodash'

export const commonUnit = (id: string) =>
  nodeUtil.createField(
    id,
    '单位',
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
      formItem: {},
      input: {
        placeholder: '请输入',
      },
    }
  )
