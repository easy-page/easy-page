import {
  ChildFormState,
  nodeUtil,
  validateAllChildForm,
} from '@easy-page/antd-ui'
import { getPnListConfig, updatePnListAction } from './updatePnListAction'
import { CsActFormProps, CsActFormState } from '../../../interface'
import { IBudget } from '@/common'
import './index.less'
import {
  baseBudgetaryResponsibility,
  csBudgetAmount,
  pn,
  pnControl,
} from '@/pages/actsCrud/ActsCrudInfo/fields'

export const csBudgetResponsibility = () =>
  nodeUtil.extends<ChildFormState<IBudget>, CsActFormState, CsActFormProps>(
    baseBudgetaryResponsibility({
      nodes: [pn, csBudgetAmount, pnControl],
    }),
    {
      actions() {
        return [
          {
            effectedKeys: ['actRule'],
            action: updatePnListAction,
          },
        ]
      },

      preprocess() {
        return ({ defaultValues }) => {
          return getPnListConfig({ data: defaultValues?.budgetControl || [] })
        }
      },
    }
  )
