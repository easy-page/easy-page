import { EasyPageOnChangeContext, FormUtil } from '@easy-page/antd-ui'

import { getPnListOptions } from '@/pages/actsCrud/ActsCrudInfo/utils'
import { updateBudgetControl } from './updateBudgetControl'
import { updateSubActPnForms } from './updateSubActPnForms'
import { pnListModel } from '@/common'
import {
  CommonSubActPageState,
  CommonActCrudFormState,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const pnsChangeEffects: (
  context: EasyPageOnChangeContext<CommonSubActPageState> & {
    parentFormUtil?: FormUtil<CommonActCrudFormState>
  }
) => void = ({ parentFormUtil }) => {
  const fullFormState =
    parentFormUtil?.getOriginFormData() as CommonActCrudFormState

  const { budgetControl, subActivity } = fullFormState

  if (!subActivity) {
    return {}
  }
  const { formUtils } = subActivity
  const subActOriFormData = Object.values(formUtils || {}).map((e) => {
    return e.getOriginFormData()
  })

  const { data: fullPnList } = pnListModel.getList()

  /** 所有资源位选择的 pn */
  const subActSelectPnList = getPnListOptions(subActOriFormData || [], {
    pns: fullPnList,
  })

  updateBudgetControl({ budgetControl, subActSelectPnList, parentFormUtil })

  updateSubActPnForms({ subActOriFormData })
}
