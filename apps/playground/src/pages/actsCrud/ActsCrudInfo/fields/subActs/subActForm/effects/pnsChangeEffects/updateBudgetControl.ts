import { hasPnChanged } from '@/pages/actsCrud/ActsCrudInfo/utils'
import { ChildFormState, FormUtil, ChildFormItem } from '@easy-page/antd-ui'
import {
  BudgetaryPnPageState,
  CommonActCrudFormState,
  PnControl,
} from '../../../../interface'

export const updateBudgetControl = ({
  budgetControl,
  subActSelectPnList,
  parentFormUtil,
}: {
  budgetControl: ChildFormState<BudgetaryPnPageState>
  subActSelectPnList: {
    value: string
    label: string
  }[]
  parentFormUtil: FormUtil<CommonActCrudFormState>
}) => {
  /** 当前预算管控表单数据 */
  const budgetFormData = Object.values(budgetControl.formUtils || {}).map(
    (e) => {
      return e.getOriginFormData() || {}
    }
  )

  const curPnIds = budgetFormData.map((e) => e?.pn?.choosed || '')
  const newPnIds = subActSelectPnList.map((e) => e.value)

  // 如果没有变化，则不做任何更新
  if (!hasPnChanged(curPnIds, newPnIds)) {
    return {}
  }

  const curFormUtils: Record<string, FormUtil<BudgetaryPnPageState>> = {
    ...(budgetControl.formUtils || {}),
  }
  const childFormDefaultVals: Record<string, Record<string, any>> = {
    ...(budgetControl.childFormDefaultValues || {}),
  }

  /** 当前未变化的保留，已经变化的 ref 则删除 */
  newPnIds.forEach((each) => {
    if (curPnIds.includes(each)) {
      // 修改
      const curFormUtil = budgetControl.formUtils?.[each]
      const defaultVal = budgetControl?.childFormDefaultValues?.[each]

      if (defaultVal) {
        childFormDefaultVals[each] = defaultVal
      }
      if (curFormUtil) {
        curFormUtils[each] = curFormUtil
      }
    }
  })

  // 删除已经不存在的
  curPnIds.forEach((each) => {
    if (!newPnIds.includes(each)) {
      delete curFormUtils[each]
      delete childFormDefaultVals[each]
    }
  })

  const pnListInfo = subActSelectPnList
    .map((each) => ({
      pnId: each.value,
      pnName: each.label as string,
    }))
    .filter((x) => Boolean(x?.pnId))

  const childForms: ChildFormItem[] = pnListInfo.map((e) => {
    return {
      id: e.pnId,
      label: e.pnName,
    }
  })

  const newVal = {
    childForms: childForms,
    choosedItemId: childForms?.[0]?.id,
    formUtils: curFormUtils,
    childFormDefaultValues: childFormDefaultVals,
  }
  parentFormUtil?.setField?.('budgetControl', newVal, { validate: false })
}
