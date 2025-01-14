import { ActInfo } from '@/common/apis'
import { OperaitonContext } from '@/common/auths'
import { getActConfig } from '@/common/configs'
import {
  ActivitySourceEnum,
  BizLineEnum,
  OperationType,
} from '@/common/constants'
import {
  toOldCrudAct,
  getActFilterType,
  FromPage,
  toCrudAct,
} from '@/common/routes'
import { inWhiteList } from '@/common/utils/inWhiteList'

export const toCrudActAction: (
  operationType: OperationType
) => (context: OperaitonContext<ActInfo, string>) => void = (operationType) => {
  return ({ record, configs }) => {
    const templateId = record.templateId
    const config = getActConfig({ templateId: templateId, configs: configs })

    const templateInfo = config.templateInfo
    const actType = config.actType

    if (config.useNewZsptFramework && inWhiteList(actType)) {
      const bizLine = `${config?.bizLine || BizLineEnum.WaiMai}`
      toCrudAct(
        {
          bizLine: bizLine,
          operationType: operationType,
          actType: actType,
          actId: `${record.id}`,
          planId: `${record.planId}`,
          groupId: `${record.groupId}`,
        },
        '_blank'
      )
      return
    }

    const bizLine = `${config?.bizLine || BizLineEnum.ShanGou}`
    toOldCrudAct(
      {
        bizLine,
        operationType: operationType,
        activityId: record.id,
        planId: record.planId,
        groupId: record.groupId,
        tabValue: record.groupId || undefined,
        groupName: record.groupName,
        filterType: getActFilterType(),
        promotionTypeConfig: actType,
        groupTime:
          record?.groupStartTime && record?.groupEndTime
            ? [record?.groupStartTime, record?.groupEndTime]
            : [],
        templateId: templateId,
        tempId: templateId,
        source: ActivitySourceEnum.Activity,
        fromPage: FromPage.ActivityList,
      },
      '_blank'
    )
  }
}
