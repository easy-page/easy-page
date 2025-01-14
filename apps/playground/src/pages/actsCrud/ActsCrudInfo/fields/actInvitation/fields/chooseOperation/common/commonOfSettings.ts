import { nodeUtil } from '@easy-page/antd-ui'

import { get } from 'lodash'
import { ActivityInfo } from '@/common/apis'
import {
  ActionTypeEnum,
  ActivityStatusEnum,
  DataTypeEnum,
  InputTypeEnum,
} from '@/common/constants'
import { CommonActCrudFormState } from '../../../../interface'
import { chooseOperation } from '../base'

export const chooseOperationOfSettings = () =>
  nodeUtil.extends<string, CommonActCrudFormState>(chooseOperation(), {
    value: `${ActionTypeEnum.Replace}`,
    preprocess() {
      return ({ defaultValues }) => {
        const activity: ActivityInfo = get(defaultValues, 'activity')
        const dataType = get(defaultValues, 'invitation.dataType')
        const inputType = get(defaultValues, 'invitation.inputType')
        if (!activity) {
          return `${ActionTypeEnum.Replace}`
        }
        const status = activity?.status
        const showReplace = [
          ActivityStatusEnum.Creating,
          ActivityStatusEnum.Created,
          ActivityStatusEnum.Pause,
        ].includes(status)
        /** 非整体替换，又不展示追加和删除，则展示整体替换，默认为不操作 */
        if (
          !showReplace &&
          dataType === DataTypeEnum.Poi &&
          inputType === InputTypeEnum.FilterAssemble
        ) {
          return `${ActionTypeEnum.NoChange}`
        }
        return showReplace
          ? `${ActionTypeEnum.Replace}`
          : `${ActionTypeEnum.Add}`
      }
    },
  })
