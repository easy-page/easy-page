import { ActivityStatusEnum, DataTypeEnum, InputTypeEnum } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { get } from 'lodash'
import { CommonActCrudFormState } from '../../../../../interface'
import { noOperation } from './base'

/** 神会员邀请设置 */
export const shyNoOperationOfSettings = () =>
  nodeUtil.extends<any, CommonActCrudFormState>(noOperation(), {
    when() {
      return {
        effectedKeys: ['activity'],
        show({ effectedData, defaultValues }) {
          const status = effectedData['activity']?.status
          const dataType = get(defaultValues, 'invitation.dataType')
          const inputType = get(defaultValues, 'invitation.inputType')
          const isActive = status === ActivityStatusEnum.Active
          const isByFilter =
            dataType === DataTypeEnum.Poi &&
            inputType === InputTypeEnum.FilterAssemble
          return isActive && isByFilter
        },
      }
    },
  })
