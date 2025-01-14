import { ActivityStatusEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { CommonInviteSettingsFormState } from '../interface'

export const actIdOfSettings = () =>
  nodeUtil.createCustomField<ActivityStatusEnum, CommonInviteSettingsFormState>(
    'actId',
    '提报活动 ID',
    ({ value }) => {
      return <div>{value || '-'}</div>
    },
    {
      postprocess: ({ value }) => {
        return {
          'activity.id': value,
        }
      },
      preprocess({ defaultValues }) {
        const actId = get(defaultValues, 'activity.id')
        return actId
      },
    }
  )
