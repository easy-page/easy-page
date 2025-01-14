import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { ActivityInfo } from '@/common/apis/saveAct/interfaces/activityInfo'
import { ActionTypeEnum, OperationType } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { isActBeforeInvite } from '@/pages/actsCrud/ActsCrudInfo/utils'
import { CommonActCrudFormState } from '../../../../../interface'

export const commonLimitOption = () =>
  nodeUtil.createNode<any, CommonActCrudFormState>(
    `${ActionTypeEnum.Limited}`,
    {
      name: '限制',
      when: {
        effectedKeys: ['activity'],
        show({ effectedData, defaultValues }) {
          const mode = getOperationType()
          if ([OperationType.CREATE, OperationType.COPY].includes(mode)) {
            return true
          }
          const act = effectedData['activity'] || ({} as ActivityInfo)
          const choosedNoLimit =
            get(defaultValues, 'invitation.actionType') ===
            ActionTypeEnum.Unlimited
          const beforeInvite = isActBeforeInvite(act.status)
          /**
           * - 编辑时，仅活动选择了“不限制”，且未发送邀请时，可从不限制切换到限制，因此现实选项
           * - 其余时，不限时选项
           */
          return choosedNoLimit && beforeInvite
        },
      },
    }
  )
