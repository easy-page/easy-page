import { ActInfo } from '@/common/apis'
import { Operation } from '../../../Operations'
import {
  ActivitySourceEnum,
  BizLineEnum,
  OperationEnum,
  OperationType,
} from '@/common/constants'
import {
  FromPage,
  getActFilterType,
  toCrudAct,
  toOldCrudAct,
} from '@/common/routes'
import { getActConfig } from '@/common/configs/utils/getActConfigs'
import { inWhiteList } from '@/common/utils/inWhiteList'

export const actView: Operation<ActInfo> = {
  id: OperationEnum.View,
  label: '查看',
  show() {
    return true
  },
  action({ record, configs }) {
    const actConfig = getActConfig({
      templateId: record.templateId,
      configs,
    })
    if (actConfig.useNewZsptFramework && inWhiteList(actConfig?.actType)) {
      toCrudAct(
        {
          bizLine: `${actConfig?.bizLine || BizLineEnum.WaiMai}`,
          operationType: OperationType.VIEW,
          actType: actConfig.actType,
          actId: `${record.id}`,
          planId: `${record.planId}`,
          groupId: `${record.groupId}`,
        },
        '_blank'
      )
      return
    }

    const bizLine = `${actConfig?.bizLine || BizLineEnum.ShanGou}`
    toOldCrudAct(
      {
        bizLine: bizLine,
        operationType: OperationType.VIEW,
        activityId: record.id,
        planId: record.planId,
        groupId: record.groupId,
        tabValue: record.groupId || undefined,
        groupName: record.groupName,
        filterType: getActFilterType(),
        promotionTypeConfig: actConfig.actType,
        groupTime:
          record?.groupStartTime && record?.groupEndTime
            ? [record?.groupStartTime, record?.groupEndTime]
            : [],
        templateId: record.templateId,
        tempId: record.templateId,
        source: ActivitySourceEnum.Activity,
        fromPage: FromPage.ActivityList,
      },
      '_blank'
    )
  },
  auth: [],
}
