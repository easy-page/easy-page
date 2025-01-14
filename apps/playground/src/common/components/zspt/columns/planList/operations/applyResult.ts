import { PlanInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import { OperationEnum, BizLineEnum, PlanTypeEnum } from '@/common/constants'
import { toOldPlanApplyResult } from '@/common/routes/toUrls/old/toOldPlanApplyResult'
import { getShowConfig } from '../../utils'

export const planApplyResult: Operation<PlanInfo> = {
  id: OperationEnum.PlanApplyResult,
  label: '报名结果',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showPlanApplyResultBtn
  }),
  action({ record }) {
    toOldPlanApplyResult(
      {
        bizLine: record.bizLine ?? BizLineEnum.ShanGou,
        planId: record.id,
        planType: record.planType || PlanTypeEnum.Brand,
      },
      '_blank'
    )
  },
  auth: [],
}
