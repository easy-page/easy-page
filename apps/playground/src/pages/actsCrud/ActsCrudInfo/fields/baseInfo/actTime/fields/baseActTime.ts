import { nodeUtil } from '@easy-page/antd-ui'
import { ActTimeLimit } from '../constant'

export const baseActTime = () =>
  nodeUtil.createField<string>(
    'promotionTime.isRestrict',
    '活动生效时间',
    {
      value: `${ActTimeLimit.Limit}`,
      required: true,
      mode: 'single',
      postprocess({ value }) {
        return {
          'activity.promotionTime.isRestrict': Number(value),
        }
      },
    },
    {
      formItem: { disabled: true },
    }
  )
