import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const poiTypeOfSetting = nodeUtil.createCustomField(
  'poiType',
  '',
  () => <></>,
  {
    value: '',
    preprocess({ defaultValues }) {
      return get(defaultValues, 'activity.poiType')
    },
  }
)
