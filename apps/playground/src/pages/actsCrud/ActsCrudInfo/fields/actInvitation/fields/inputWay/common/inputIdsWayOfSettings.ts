import { nodeUtil } from '@easy-page/antd-ui'

import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { CommonActCrudFormState, InviteWay } from '../../../../interface'
import { inputIdsWay } from '../base'
import { inputId, uplaodId } from '../fields'
import { byIdOption, byUpload } from '../options'

export const commonInputWayOfSettings = nodeUtil
  .extends<string, CommonActCrudFormState>(inputIdsWay(), {
    when: () => {
      return {
        effectedKeys: ['dataType', 'templateId'],
        show({ effectedData }) {
          const { data: configs } = configListModel.getList() || {}
          const inviteWay = effectedData?.['dataType']
          const templateId = effectedData?.['templateId']
          if ([`${InviteWay.ByPoiInvite}`].includes(inviteWay)) {
            return true
          }
          if ([`${InviteWay.ByMerchantBrand}`].includes(inviteWay)) {
            const config = getActConfig({ templateId, configs })
            return config?.showInputWayOfInviteSettingsByMerchantOp || false
          }

          return false
        },
      }
    },
  })
  .appendChildren([
    byIdOption().appendChildren([inputId()]),
    byUpload().appendChildren([uplaodId()]),
  ])
