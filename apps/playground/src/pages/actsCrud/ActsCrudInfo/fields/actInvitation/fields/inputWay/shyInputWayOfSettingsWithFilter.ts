/** 神会员-邀请设置-邀请方式字段 */

import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common'
import { CommonActCrudFormState } from '../../../interface'
import { inputIdsWay } from './base'
import { inputId, uplaodId } from './fields'
import { filterRule } from './fields/filter'
import { byIdOption, byUpload, byFilterOptionOfEdit } from './options'

export const shyInputWayOfSettingsWithFilter = nodeUtil
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
  })
  .appendChildren([
    byIdOption().appendChildren([inputId()]),
    byUpload().appendChildren([uplaodId()]),
    byFilterOptionOfEdit().appendChildren([filterRule()]),
  ])
