import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'

export const basePoiType = () =>
  nodeUtil.createField('poiType', '邀请门店类型', {
    mode: 'single',
    required: true,
    preprocess({ defaultValues }) {
      console.log('defaultValues', defaultValues)

      return get(defaultValues, 'activity.poiType') || null
    },
    postprocess: ({ value }) => {
      return {
        'activity.poiType': value,
      }
    },
    validate: ({ value }) => {
      if (!value) {
        return { success: false, errorMsg: '请选择门店类型' }
      }
      return { success: true }
    },
  })
