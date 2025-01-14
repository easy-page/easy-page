import { nodeUtil, RadioEffectedType } from '@easy-page/antd-ui'
import { ActFullInfo, ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { configListModel } from '@/common/models/configList'
import { getActConfig } from '@/common/configs'
import { CommonActCrudFormState } from '@/pages/actsCrud/ActsCrudInfo/fields/interface'
import { commonNoLimitOption } from './commonNoLimit'

/** 邀请设置逻辑 */
export const commonNoLimitOptionOfSettings = nodeUtil.extends<
  any,
  CommonActCrudFormState,
  any,
  RadioEffectedType
>(commonNoLimitOption(), {
  actions() {
    return [
      {
        effectedKeys: ['templateId'],
        initRun: true,
        action: ({ effectedData }) => {
          const templateId = effectedData['templateId']
          const { data: configs } = configListModel.getList() || {}
          const actConfig = getActConfig({ templateId, configs })
          console.log('actConfig:', actConfig)
          if (actConfig?.disableNoLimitOption) {
            return {
              effectResult: {
                radioProps: { disabled: true },
              },
            }
          }
          return {}
        },
      },
    ]
  },
  when() {
    return {
      effectedKeys: ['activity'],
      show: ({ effectedData, defaultValues }) => {
        const status = effectedData['activity']?.status
        const defaultActionType =
          (defaultValues as any as ActFullInfo)?.invitation?.actionType ||
          ActionTypeEnum.Limited

        const beforeSendInviteStatus = [
          ActivityStatusEnum.Creating,
          ActivityStatusEnum.Created,
          ActivityStatusEnum.Pause,
        ]
        if (beforeSendInviteStatus.includes(status)) {
          return true
        }
        /** 发送邀请后，展示 */
        if (defaultActionType === ActionTypeEnum.Unlimited) {
          return true
        }
        return false
      },
    }
  },
})
