import { PlanInfo } from '@/common/apis'

import { Operation } from '../../../Operations'
import { OperationEnum, OperationType, BizLineEnum } from '@/common/constants'
import { toCrudPlan } from '@/common/routes'
import { toOldCrudPlan } from '@/common/routes/toUrls/old/toOldCurdPlan'
import { getShowConfig } from '../../utils'
import { getPlanConfig } from '@/common/configs'
import { getAuthConfig } from '../../utils/getAuthConfig'

export const planCopy: Operation<PlanInfo> = {
  id: OperationEnum.Copy,
  authOperationKey: OperationEnum.Modify,
  label: '复制',
  show: getShowConfig((fullConfig) => {
    return fullConfig.showPlanCopyBtn
  }),
  action({ record, configs }) {
    const config = getPlanConfig({ planType: record.planType, configs })
    if (config.useNewZsptFramework) {
      toCrudPlan(
        {
          operationType: OperationType.COPY,
          bizLine: record.bizLine ?? BizLineEnum.WaiMai,
          planId: record.id ? `${record.id}` : '',
          planType: record.planType,
        },
        '_blank'
      )
      return
    }

    toOldCrudPlan(
      {
        operationType: OperationType.COPY,
        bizLine: BizLineEnum.ShanGou,
        planId: record.id ? `${record.id}` : '',
        planType: record.planType,
      },
      '_blank'
    )
    return
  },
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.planCopyBtnAuths
  }),
}
