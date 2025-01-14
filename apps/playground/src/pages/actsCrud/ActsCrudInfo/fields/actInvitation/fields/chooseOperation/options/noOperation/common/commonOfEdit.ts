import { ActFullInfo, ActionTypeEnum, ActivityStatusEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../../../interface'
import { noOperation } from '../base'

export const commonNoOperationOfEdit = () =>
  nodeUtil.extends<any, CommonActCrudFormState>(noOperation(), {
    when() {
      return {
        effectedKeys: ['activity'],
        show: ({ defaultValues, effectedData }) => {
          const status = effectedData['activity']?.status
          const defaultActionType =
            (defaultValues as any as ActFullInfo)?.invitation?.actionType ||
            ActionTypeEnum.Limited

          if (defaultActionType === ActionTypeEnum.Unlimited) {
            // 如果开始选择了不限制，则无论发送前后，都不展示
            return false
          }

          return status !== ActivityStatusEnum.Inviting
        },
      }
    },
  })
