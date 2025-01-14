import { ActionTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { CommonActCrudFormState } from '../../../../interface'
import { inputIdsWay } from './inputIdsWay'

export const baseInputIdsWayOfEdit = () =>
  nodeUtil.extends<string, CommonActCrudFormState>(inputIdsWay(), {
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
