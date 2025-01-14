import { ActInfo } from '@/common/apis'
import { ActListScene, BizLineEnum, OperationEnum } from '@/common/constants'
import { toActApplyResult } from '@/common/routes'
import { Operation } from '../../../Operations'
import { toOldActApplyResult } from '@/common/routes/toUrls/old'
import { getActConfig } from '@/common/configs/utils/getActConfigs'

export const actApplyResult: Operation<ActInfo, ActListScene> = {
  id: OperationEnum.ApplyResult,
  label: '报名结果',
  show({ sence }) {
    return true
  },
  action({ record, sence, configs }) {
    const actConfig = getActConfig({
      templateId: record.templateId,
      configs: configs,
    })
    if (actConfig.useNewFrameworkApplyResPage) {
      toActApplyResult(
        {
          promotionType: actConfig.actType,
          activityId: `${record.id}`,
          planId: `${record.planId}`,
          groupId: `${record.groupId}`,
          bizLine: record.bizLine ?? BizLineEnum.WaiMai,
        },
        '_blank'
      )
      return
    }
    toOldActApplyResult(
      {
        sence,
        activityId: `${record.id}`,
        bizLine: record.bizLine ?? BizLineEnum.ShanGou,
        tabValue: record.groupId,
      },
      '_blank'
    )
  },
  auth: [],
}
