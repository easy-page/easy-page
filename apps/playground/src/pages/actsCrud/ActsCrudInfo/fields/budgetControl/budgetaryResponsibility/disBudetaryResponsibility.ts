import { ChildFormState, nodeUtil } from '@easy-page/antd-ui'
import { baseBudgetaryResponsibility } from './base'
import { pn, commonBudgetAmount, disPnControl } from './pnForm'
import {
  BudgetaryPnPageState,
  CommonActCrudFormProps,
  CommonActCrudFormState,
} from '../../interface'
import { getCommonPnListConfig } from './utils'

/** 折扣活动的补贴分摊 */
export const disBudetaryResponsibility = nodeUtil.extends<
  ChildFormState<BudgetaryPnPageState>,
  CommonActCrudFormState,
  CommonActCrudFormProps
>(
  baseBudgetaryResponsibility({
    nodes: [pn, commonBudgetAmount, disPnControl],
  }),
  {
    /** 通过 SubActs 中的 effects 做这件事情，搜索: "pnsChangeEffects" 可看到 */
    // actions() {
    //   return [
    //     {
    //       effectedKeys: ['subActivity'],
    //       action: updateSubActPnListAction,
    //     },
    //   ]
    // },
    preprocess() {
      return ({ defaultValues }) => {
        console.log('defaultV111alues:', defaultValues)
        return getCommonPnListConfig({
          data: defaultValues?.budgetControl || [],
        })
      }
    },
  }
)
