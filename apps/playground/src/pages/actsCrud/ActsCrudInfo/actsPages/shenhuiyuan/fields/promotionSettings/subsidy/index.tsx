import {
  diffSubsidiesContainer,
  subActSubsidyContainer,
  subsidyContainer,
} from '@/pages/actsCrud/ActsCrudInfo/fields'
// import { chooseSubsidyPlan } from './chooseSubsidyPlan'
import { subsidyRuleInfo } from './rule'
import { ruleTable } from './subsidyRuleTable'
import { subsidyPercent } from './subsidyPercent'
import { stockReq } from './stockReq'
import { differStockRule } from './diffStockReq'
import { chooseSubsidyPlan } from '@/pages/actsCrud/ActsCrudInfo/fields/subsidy'

export const subsidy = subActSubsidyContainer().appendChildren([
  subsidyContainer().appendChildren([chooseSubsidyPlan({}), stockReq]),
  diffSubsidiesContainer().appendChildren([
    subsidyRuleInfo,
    ruleTable,
    subsidyPercent,
    differStockRule, // 差异化库存要求
  ]),
])
