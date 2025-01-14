import { nodeUtil } from '@easy-page/antd-ui'
import { ActionTypeEnum } from '@/common/constants'
import { CommonActCrudFormState } from '../../../../../interface'
import { byFilter } from './common'

export const byFilterOptionOfEdit = () =>
  nodeUtil.extends<string, CommonActCrudFormState>(byFilter(), {
    when(oldWhen) {
      return {
        effectedKeys: ['chooseOperation', ...(oldWhen.effectedKeys || [])],
        show(context) {
          if (!oldWhen?.show(context)) {
            return false
          }
          const { effectedData } = context
          const chooseOperation = effectedData['chooseOperation']
          const isAddOrRemove = [
            `${ActionTypeEnum.Add}`,
            `${ActionTypeEnum.Remove}`,
          ].includes(chooseOperation)
          if (isAddOrRemove) {
            return false
          }
          return true
        },
      }
    },
  })
