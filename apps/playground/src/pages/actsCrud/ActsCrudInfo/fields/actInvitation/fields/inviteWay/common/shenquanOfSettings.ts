import { ActionTypeEnum } from '@/common/constants'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../interface'
import { inviteWay } from '../base'
import { byPoiInviteOption, commonByMerchantBrandOfSettings } from '../options'

export const shenquanInviteWayOfInviteSettings = (options?: {
  merchantLabel?: string
}) =>
  nodeUtil
    .extends<string, CommonActCrudFormState>(inviteWay(), {
      actions() {
        return [
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
    })
    .appendChildren([byPoiInviteOption(), commonByMerchantBrandOfSettings])
