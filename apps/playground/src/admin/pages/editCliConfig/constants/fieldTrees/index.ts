import { ApplyControlTreeData } from './applyControl'
import { BaseInfoTreeData } from './baseInfo'
import { BudgetControlTreeData } from './budgetControl'
import { TreeOption } from './interface'
import { InvitationTreeData } from './invitation'
import { PromotionSettingsTreeData } from './promotionSettings'

export const FieldsTreeData: TreeOption[] = [
  BaseInfoTreeData,
  PromotionSettingsTreeData,
  BudgetControlTreeData,
  ApplyControlTreeData,
  InvitationTreeData,
]
