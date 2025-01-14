import { nodeUtil } from '@easy-page/antd-ui'
import { invitationTips } from './common'

export const invitationTipsOfSettings = nodeUtil.extends(invitationTips, {
  when(oldWhen) {
    return {
      effectedKeys: [
        'chooseOperation',
        'dataType',
        'inputIdsWay',
        'activity.poiType',
      ],
      show: oldWhen.show,
    }
  },
})
