import { ActFullInfo, ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../../interface'
import { replaceAll } from './common'

export const replaceAllPoiOptionOfEdit = () =>
  nodeUtil.extends<any, CommonActCrudFormState>(replaceAll(), {
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

          if (defaultActionType === ActionTypeEnum.Unlimited) {
            // 如果开始选择了不限制，则无论发送前后，都不展示
            return false
          }

          /** 不同活动，可能有差异 */
          // if (Array.isArray(statusList)) {
          //   return statusList.includes(status)
          // }

          /** 发送邀请前，展示 */
          return beforeSendInviteStatus.includes(status)
        },
      }
    },
  })
