import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { ActivityStatusEnum, ACTIVITY_STATUS_DESC } from '@/common/constants'
import { CommonInviteSettingsFormState } from '../interface'

export const actStatusOfSettings = () =>
  nodeUtil.createCustomField<ActivityStatusEnum, CommonInviteSettingsFormState>(
    'actStatus',
    '活动状态',
    ({ value }) => {
      return <div>{value ? ACTIVITY_STATUS_DESC[value] : '-'}</div>
    },
    {
      postprocess: () => {
        return {}
      },
      preprocess({ defaultValues }) {
        const actStatus = get(defaultValues, 'activity.status')
        return actStatus
      },
    }
  )
