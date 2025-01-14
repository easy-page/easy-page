import {
  ActListColumnId,
  ActListTable,
  OPERATION_COL_KEY,
  PlanDetailParams,
  SubMarketingPlan,
  toNumber,
  useParamsInfo,
} from '@/common'
import { SubPanelContent } from '../components/SubPanelContent'
import { SubPlanBaseInfo } from '../components/SubPlanBaseInfo'
import { SgShenquanSubsidyRule } from '../components/SubsidyRule'

export type ShenQuanDetailProps = {
  subPlan: SubMarketingPlan
}

const ROW_IDS = [...Object.values(ActListColumnId), OPERATION_COL_KEY].filter(
  (e) =>
    ![ActListColumnId.ActStatsInfo, ActListColumnId.ConfirmStatus].includes(
      e as ActListColumnId
    )
)
export const ShenQuanDetail = ({ subPlan }: ShenQuanDetailProps) => {
  const { params } = useParamsInfo<PlanDetailParams>()
  return (
    <div>
      <SubPanelContent titleClass={'text-base'} title="基础信息">
        <SubPlanBaseInfo detail={subPlan} />
      </SubPanelContent>
      <SubPanelContent titleClass={'text-base'} title="补贴规则">
        <SgShenquanSubsidyRule detail={subPlan} />
      </SubPanelContent>
      <SubPanelContent titleClass={'text-base'} title="关联提报活动">
        <ActListTable
          rowIds={ROW_IDS}
          choosePlanId={toNumber(params.groupId)}
          subPlanId={subPlan?.id}
        />
      </SubPanelContent>
    </div>
  )
}
