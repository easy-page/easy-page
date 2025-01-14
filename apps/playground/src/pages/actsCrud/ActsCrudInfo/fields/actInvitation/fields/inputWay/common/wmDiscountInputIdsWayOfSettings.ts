import { nodeUtil } from '@easy-page/antd-ui'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { inputIdsWay } from '../base'
import { inputId, uplaodId } from '../fields'
import { byFilterOptionOfEdit, byIdOption, byUpload } from '../options'
import { filterRule } from '../fields/filter'
import { CommonActCrudFormState, InviteWay } from '../../../../interface'
import { ActionTypeEnum } from '@/common'

export const wmDiscountInputIdsWayOfSettings = nodeUtil
  .extends<string, CommonActCrudFormState>(inputIdsWay(), {
    actions(actions) {
      return [
        ...actions,
        {
          effectedKeys: ['chooseOperation'],
          initRun: true,
          action: ({ effectedData }) => {
            const value = effectedData['chooseOperation']
            const isNoChange = value === `${ActionTypeEnum.NoChange}`
            if (!isNoChange) {
              return { effectResult: {} }
            }
            return {
              effectResult: {
                disabled: isNoChange,
              },
            }
          },
        },
      ]
    },
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
    byFilterOptionOfEdit().appendChildren([filterRule()]),
  ])
