import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { ActivityStatusEnum } from '@/common/constants'
import { CommonInviteSettingsFormState } from '../interface'

export const actNameOfSettings = () =>
  nodeUtil.createCustomField<ActivityStatusEnum, CommonInviteSettingsFormState>(
    'actName',
    '提报活动名称',
    ({ value }) => {
      return <div>{value || '-'}</div>
    },
    {
      postprocess: ({ value }) => {
        return {
          'activity.name': value,
        }
      },
      preprocess({ defaultValues }) {
        const actName = get(defaultValues, 'activity.name')
        return actName
      },
    }
  )
