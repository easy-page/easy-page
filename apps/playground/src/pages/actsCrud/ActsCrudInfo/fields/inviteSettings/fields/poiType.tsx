import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { ActivityStatusEnum, ACTIVITY_STATUS_DESC } from '@/common/constants'
import { CommonInviteSettingsFormState } from '../interface'

export const poiTypeOfSettings = () =>
  nodeUtil.createCustomField<ActivityStatusEnum, CommonInviteSettingsFormState>(
    'poiType',
    '门店类型',
    ({ value }) => {
      return <></>
    },
    {
      postprocess: () => {
        return {}
      },
      preprocess({ defaultValues }) {
        const poiType = get(defaultValues, 'activity.poiType')
        return poiType
      },
    },
    {
      formItem: {
        noStyle: true,
      },
    }
  )
