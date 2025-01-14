import { PlanInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import {
  OperationEnum,
  PlanStatusEnum,
  OperationType,
  BizLineEnum,
} from '@/common/constants'
import { toCrudPlan } from '@/common/routes'
import { toOldCrudPlan } from '@/common/routes/toUrls/old/toOldCurdPlan'
import { getAuthConfig } from '../../utils/getAuthConfig'
import { getPlanConfig } from '@/common/configs'

export const planEdit: Operation<PlanInfo> = {
  id: OperationEnum.Modify,
  label: '编辑',
  show({ record }) {
    return record.status !== PlanStatusEnum.Terminated
  },
  action({ record, configs }) {
    const config = getPlanConfig({ planType: record.planType, configs })
    if (config.useNewZsptFramework) {
      toCrudPlan(
        {
          operationType: OperationType.EDIT,
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
        operationType: OperationType.EDIT,
        bizLine: record.bizLine ?? BizLineEnum.ShanGou,
        planId: record.id ? `${record.id}` : '',
        planType: record.planType,
      },
      '_blank'
    )
  },
  auth: getAuthConfig((fullConfig) => {
    return fullConfig.planEditBtnAuths
  }),
}
