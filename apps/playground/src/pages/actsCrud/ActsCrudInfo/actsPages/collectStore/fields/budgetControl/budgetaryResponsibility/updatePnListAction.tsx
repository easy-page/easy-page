import {
  ChildFormItem,
  ChildFormState,
  EffectActionHandlerType,
  Empty,
  generateId,
} from '@easy-page/antd-ui'
import { CsActFormState } from '../../../interface'
import { IActRuleList, ProductSelection, IBudget } from '@/common/apis'
import { BudgetDegreeEnum } from '@/common/constants'

const pnPrefix = 'subsidy-pn'

export const updatePnListAction: EffectActionHandlerType<
  ChildFormState<IBudget>,
  CsActFormState,
  Empty,
  Empty,
  Record<string, any>
> = ({ effectedData, value }) => {
  const actRule: IActRuleList<ProductSelection> = effectedData['actRule']
  const { uploadError = [], actStashList = [] } = actRule
  const hasError = Boolean(actStashList.find((e) => e.errors?.length > 0))

  if (hasError || uploadError?.length > 0) {
    /** 有错误直接清空 */
    return {
      fieldValue: getPnListConfig({ data: [] }),
      validate: false,
    }
  }

  return {
    fieldValue: {
      ...getPnListConfig({
        data: actRule.pn as IBudget[],
      }),
    },
    validate: false,
  }
}

export const getPnListConfig = ({ data }: { data: IBudget[] }) => {
  const pnData = data as IBudget[]
  const pns = pnData.map(
    (e) =>
      ({
        degree: e.degree || BudgetDegreeEnum.WEAK,
        pn: e.pn,
        pnName: e.pnName,
        budget: e.budget || '',
        balance: e.balance,
        budgetCost: e.budgetCost,
        offline: e.offline,
      } as IBudget)
  )
  const childFormDefaultValues: Record<string, IBudget> = {}

  const childFormItems: ChildFormItem[] = (pns || []).map((each) => {
    const id = generateId(pnPrefix)
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
