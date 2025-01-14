import {
  ContainerIds,
  ContainerIdsText,
  FieldIds,
  FieldIdsText,
  SubFormIds,
  SubFormIdsText,
} from '@/common/constants/fieldMaps'
import { TreeOption } from '../interface'
import { actTimeConfig } from './fields/actTime'
import { chargeFlowTypeConfig } from './fields/chargeFlowType'

export const BaseInfoTreeData: TreeOption = {
  value: ContainerIds.BasicInfo,
  label: ContainerIdsText.basicInfoContainer,
  children: [
    {
      value: FieldIds.PromotionType,
      label: FieldIdsText.promotionType,
    },
    {
      value: FieldIds.ActName,
      label: FieldIdsText.actName,
    },
    {
      value: FieldIds.PoiType,
      label: FieldIdsText.poiType,
    },
    {
      value: FieldIds.TargetCollectStoreField,
      label: FieldIdsText.targetCollectStoreField,
    },
    chargeFlowTypeConfig,
    {
      value: FieldIds.BelongBizline,
      label: FieldIdsText.belongBizline,
    },
    actTimeConfig,
    {
      value: FieldIds.ActTimeRange,
      label: FieldIdsText.actTimeRange,
    },
    {
      value: SubFormIds.ActPeriod,
      label: SubFormIdsText.actPeriod,
    },
    {
      value: FieldIds.EndTime,
      label: FieldIdsText.endTime,
    },
    {
      value: FieldIds.WeekDays,
      label: FieldIdsText.weekDays,
    },
    {
      value: FieldIds.ActDesc,
      label: FieldIdsText.actDesc,
    },
    {
      value: FieldIds.RuleDesc,
      label: FieldIdsText.ruleDesc,
    },
  ],
}
