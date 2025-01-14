import { numberRangeField } from '@/common/fields'
import { nodeUtil } from '@easy-page/antd-ui'
import { SubmitPrefix } from '../constant'
import { get } from 'lodash'

export const commonRangeInfo = (
  id: string,
  label: string,
  {
    extra,
  }: {
    extra: string
  }
) =>
  nodeUtil.extends(
    numberRangeField({
      id,
      label: label,
      range: { min: 0, max: 999999999 },
      denyZero: true,
      formItemConfig: {
        className: 'col-span-1 mb-0',
        extra,
      },
      validateConfig: {
        errorMsg: '1-999999999',
        // decimalNumber: 1,
        checkNumber: true,
      },
    }),
    {
      postprocess() {
        return ({ value }) => {
          return {
            [`${SubmitPrefix}.${id}`]: value,
          }
        }
      },
      preprocess() {
        return ({ defaultValues }) => {
          console.log('defaultValues:', defaultValues)
          return get(defaultValues, `fullConfig.${SubmitPrefix}.${id}`)
        }
      },
    }
  )
