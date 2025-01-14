import { ActionTypeEnum } from '@/common'
import { SceneEnum } from '@/common/apis/invitePoi'
import { nodeUtil } from '@easy-page/antd-ui'
import { chooseOperation } from '../base'
import { chooseOperationLimitOptionOfDisabled } from '../options'
import { chooseOperationNoLimitOptionOfDisabled } from '../options/noLimit'

export const commonChooseOperation = nodeUtil
  .extends(chooseOperation(), {
    value: `${ActionTypeEnum.Limited}`,
    postprocess: () => {
      return () => {
        return {
          'invitation.actionType': ActionTypeEnum.Replace,
          'invitation.scene': SceneEnum.Create,
        }
      }
    },
  })
  .appendChildren([
    chooseOperationLimitOptionOfDisabled,
    chooseOperationNoLimitOptionOfDisabled,
  ])
