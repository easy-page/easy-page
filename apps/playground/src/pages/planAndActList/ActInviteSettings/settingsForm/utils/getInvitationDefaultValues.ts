import {
  ActionTypeEnum,
  ActivityStatusEnum,
  DataTypeEnum,
  InputTypeEnum,
} from '@/common'
import { ActFullInfo, ActivityInfo } from '@/common/apis'
import { cloneDeep, get, set } from 'lodash'

/**
 * 邀请设置展示：追加、删除、替换，任意一个都需要清空 inputData
 * 邀请设置展示：不操作，不清空
 * @param actDetail
 * @returns
 */
export const getInvitationDefaultValues = (
  actDetail: ActFullInfo
): Record<string, any> => {
  const defaultValues = cloneDeep(actDetail)
  const activity: ActivityInfo = get(defaultValues, 'activity')
  const status = activity?.status
  const dataType = get(defaultValues, 'invitation.dataType')
  const inputType = get(defaultValues, 'invitation.inputType')
  const showReplace = [
    ActivityStatusEnum.Creating,
    ActivityStatusEnum.Created,
    ActivityStatusEnum.Pause,
  ].includes(status)
  // 因为增加了不操作，是不需要清空的
  if (
    !showReplace &&
    dataType === DataTypeEnum.Poi &&
    inputType === InputTypeEnum.FilterAssemble
  ) {
    // 此时会展示不操作，这时不清空关联筛选集合
    return defaultValues
  }

  set(defaultValues, 'invitation.inputData', '')
  return defaultValues
}
