import { nodeUtil } from '@easy-page/antd-ui'
import { IsRestrictEnum } from '@/common'

export enum ActTime {
  ALL = 'all',
}

export const shyActTime = nodeUtil
  .createField<ActTime>(
    'actTime',
    '活动时间',
    {
      required: true,
      value: ActTime.ALL,
      mode: 'single',
      postprocess: () => {
        return {
          'activity.promotionTime.isRestrict': IsRestrictEnum.UnRestrict,
        }
      },
    },
    {
      formItem: { disabled: true },
    }
  )
  .appendChildren([nodeUtil.createNode(ActTime.ALL, { name: '长期有效' })])
