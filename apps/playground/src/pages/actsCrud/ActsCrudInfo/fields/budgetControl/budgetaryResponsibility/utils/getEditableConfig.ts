import { ActFullInfo, IBudget } from '@/common/apis'
import { OperationType, ActivityStatusEnum } from '@/common/constants'
import { getOperationType } from '@/common/routes'
import { EditableConfig } from '@easy-page/antd-ui'
import { BudgetaryPnPageState } from '../../../interface'

const budgetEditableConfigMap: Record<
  OperationType,
  (
    budget: IBudget,
    actStatus: ActivityStatusEnum
  ) => EditableConfig<BudgetaryPnPageState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (budget: IBudget, actStatus: ActivityStatusEnum) => {
    console.log('actStatus:', actStatus)
    if (
      [ActivityStatusEnum.Creating, ActivityStatusEnum.Pause].includes(
        actStatus
      )
    ) {
      return true
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      return true
    }
    if (
      [
        ActivityStatusEnum.Applying,
        ActivityStatusEnum.TobeActive,
        ActivityStatusEnum.Active,
      ].includes(actStatus)
    ) {
      return {
        canNotEditKeys: budget.offline
          ? ['control', 'budgetAmount']
          : ['control'],
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

export const getEditableConfig = (
  budget: IBudget,
  actStatus: ActivityStatusEnum
): EditableConfig<BudgetaryPnPageState> => {
  const operationType = getOperationType()
  return budgetEditableConfigMap[operationType || OperationType.CREATE](
    budget,
    actStatus
  )
}
