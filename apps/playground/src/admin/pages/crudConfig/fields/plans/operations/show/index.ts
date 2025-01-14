import {
  PLAN_STATUS_DESC,
  PlanStatusEnum,
  PlanSubTabResources,
  PlanSubTabText,
} from '@/common'
import { showBtn, ShowBtnOptions } from '../../../operation/show'

const commonOptions: ShowBtnOptions<PlanStatusEnum, PlanSubTabResources> = {
  statusMap: PLAN_STATUS_DESC,
  statusLabel: '方案状态',
  tabMap: PlanSubTabText,
  tabLabel: '方案分类 Tab',
}
export const showPlanBtns = [
  showBtn('showPlanWithdrawBtn', '展示方案撤回按钮', commonOptions),
  showBtn('showPlanCopyBtn', '展示复制方案按钮', commonOptions),
  showBtn('showPlanEditBtn', '展示编辑方案按钮', commonOptions),
  showBtn('showJoinPlanBtn', '展示加入方案按钮', commonOptions),
  showBtn('showPlanApplyResultBtn', '展示方案报名结果页按钮', commonOptions),
  showBtn('showPublishPlanBtn', '展示发布方案按钮', {
    ...commonOptions,
    tips: '目前只有神会员方案存在此按钮，其余方案默认关闭',
  }),
  showBtn('showPlanSendInviteBtn', '展示方案发送邀请按钮', commonOptions),
]
