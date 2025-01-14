import {
  ChildFormItem,
  ChildFormState,
  EffectActionHandlerType,
  Empty,
  generateId,
} from '@easy-page/antd-ui'
import {
  BudgetaryPnPageState,
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../../interface'
import { IBudget, BudgetDegreeEnum, pnListModel, PnInfo } from '@/common'
import {
  getPnListOptions,
  hasPnChanged,
} from '@/pages/actsCrud/ActsCrudInfo/utils'

export const updateSubActPnListAction: EffectActionHandlerType<
  ChildFormState<BudgetaryPnPageState>,
  CommonActCrudFormState,
  CommonActCrudFormProps,
  Empty,
  Record<string, any>
> = ({ effectedData, value }) => {
  const subActs = effectedData['subActivity']
  if (!subActs) {
    return {}
  }
  const { formUtils } = subActs
  const subActOriFormdata = Object.values(formUtils || {}).map((e) => {
    return e.getOriginFormData()
  })
  const { data } = pnListModel.getList()
  const pnList = getPnListOptions(subActOriFormdata || [], { pns: data })
  if (pnList.length === 0) {
    return {}
  }

  /** 当前预算管控表单数据 */
  const budgetFormData = Object.values(value.formUtils || {}).map((e) => {
    return e.getOriginFormData()
  })

  const curPnIds = budgetFormData.map((e) => e.pn?.choosed || '')
  const newPnIds = pnList.map((e) => e.value)

  // 如果没有变化，则不做任何更新
  if (!hasPnChanged(curPnIds, newPnIds)) {
    return {}
  }

  const pnListInfo = pnList.map((each) => ({
    pnId: each.value,
    pnName: each.label as string,
  }))

  const childForms: ChildFormItem[] = pnListInfo.map((e) => {
    return {
      id: e.pnId,
      label: e.pnName,
    }
  })

  return {
    fieldValue: {
      childForms: childForms,
      choosedItemId: childForms?.[0]?.id,
    },
  }
}

const getPnListMap = (pnList: PnInfo[]) => {
  const result: Record<string, PnInfo> = {}
  pnList.forEach((x) => {
    result[x.pn] = x
  })
  return result
}

export const getCommonPnListConfig = ({ data }: { data: IBudget[] }) => {
  const pnData = data as IBudget[]
  const { data: pnList } = pnListModel.getList()
  const pnListMap = getPnListMap(pnList)

  const pns = pnData.map(
    (e) =>
      ({
        degree: e.degree || BudgetDegreeEnum.WEAK,
        pn: e.pn,
        pnName: e.pnName || pnListMap[e.pn]?.pnName,
        budget: e.budget || '',
        balance: e.balance,
        budgetCost: e.budgetCost,
        offline: e.offline,
      } as IBudget)
  )
  const childFormDefaultValues: Record<string, IBudget> = {}

  const childFormItems: ChildFormItem[] = (pns || []).map((each) => {
    const id = each.pn
    childFormDefaultValues[id] = { ...each }

    return {
      id,
      label: each.pnName,
    }
  })

  return {
    choosedItemId: undefined,
    childForms: childFormItems,
    childFormDefaultValues,
  }
}
