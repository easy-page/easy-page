import { EasyPageOnChangeContext, FormUtil } from '@easy-page/antd-ui'

import { getPnListOptions } from '@/pages/actsCrud/ActsCrudInfo/utils'
import {
  CommonActCrudFormState,
  CommonSubActPageState,
} from '../../../../interface'
import { updateBudgetControl } from './updateBudgetControl'
import { updateSubActPnForms } from './updateSubActPnForms'
import { pnListModel } from '@/common'

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

  /** 所有子活动选择的 pn */
  const subActSelectPnList = getPnListOptions(subActOriFormData || [], {
    pns: fullPnList,
  })

  updateBudgetControl({ budgetControl, subActSelectPnList, parentFormUtil })

  updateSubActPnForms({ subActOriFormData })
}
