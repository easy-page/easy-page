import { ActFullInfo } from '@/common/apis'
import { OperationType, ActivityStatusEnum } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { CommonSubActPageState } from '@/pages/actsCrud/ActsCrudInfo/fields'
import { EditableConfig } from '@easy-page/antd-ui'

const subActEditableConfigMap: Record<
  OperationType,
  (
    actDetail: ActFullInfo,
    disabled?: boolean
  ) => EditableConfig<CommonSubActPageState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo, disabled) => {
    const actStatus = actDetail?.activity?.status
    if (
      [ActivityStatusEnum.Creating, ActivityStatusEnum.Pause].includes(
        actStatus
      )
    ) {
      return {
        canNotEditKeys: [],
      }
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      return {
        canNotEditKeys: [],
      }
    }
    if (
      [
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Active,
      ].includes(actStatus)
    ) {
      return {
        canEditKeys: ['name', 'materialRule', 'needRequire'],
      }
    }
    if (
      [ActivityStatusEnum.Inviting, ActivityStatusEnum.Terminated].includes(
        actStatus
      )
    ) {
      return false
    }
    return false
  },
}

export const getSubActDisEditableConfig = (
  actDetail: ActFullInfo,
  disabled: boolean
): EditableConfig<CommonSubActPageState> => {
  const operationType = getOperationType()
  return subActEditableConfigMap[operationType || OperationType.CREATE](
    actDetail,
    disabled
  )
}
