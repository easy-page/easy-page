/** 集合店活动的 amount */

import { IBudget } from '@/common'
import { nodeUtil } from '@easy-page/antd-ui'
import { toNumber } from 'lodash'
import { commonBudgetAmount } from './common'

export const csBudgetAmount = nodeUtil.extends(commonBudgetAmount, {
  validate() {
    return ({ value, defaultValues }) => {
      const { budgetCost } = defaultValues as IBudget

      if (!value) {
        return { success: false, errorMsg: '请输入' }
      }

      if (
        !toNumber(value) ||
        toNumber(value) < 0 ||
        toNumber(value) > 9999999
      ) {
        return { success: false, errorMsg: '请输入1-9999999之间的整数' }
      }

      if (toNumber(value) < toNumber(budgetCost)) {
        return { success: false, errorMsg: '不可低于已消耗预算金额' }
      }

      return {
        success: true,
      }
    }
  },
})
