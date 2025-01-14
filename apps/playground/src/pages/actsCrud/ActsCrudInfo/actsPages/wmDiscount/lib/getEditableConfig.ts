import { ActFullInfo } from "@/common/apis";
import { OperationType, ActivityStatusEnum } from "@/common/constants";
import { getOperationType } from "@/common/routes";
import { EditableConfig } from "@easy-page/antd-ui";
import { CommonActCrudFormState } from "../../../fields";

const actEditableConfigMap: Record<OperationType, (actDetail: ActFullInfo) => EditableConfig<CommonActCrudFormState>> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo) => {
    const actStatus = actDetail?.activity?.status;
    if ([ActivityStatusEnum.Creating,  ActivityStatusEnum.Pause].includes(actStatus)) {
      return {
        canNotEditKeys: ['canApplyRole'],
      }
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      return {
        canNotEditKeys: ['poiType', 'chargeFlowType', 'belongBizline', 'canApplyRole']
      }
    }
    /** 报名中 待生效 生效中*/
    if ([ActivityStatusEnum.Applying, ActivityStatusEnum.TobeActive, ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canNotEditKeys: ['poiType', 'chargeFlowType', 'promotionTime.timeRange', 'canAudit', 'belongBizline', 'promotionTime.period', 'promotionTime.weekTimes', 'subActivity', 'needAuditRes','canApplyRole']
      }
    }
    /** 邀请中*/
    if ([ActivityStatusEnum.Inviting].includes(actStatus)) {
      return {
        canNotEditKeys: ['activitySceneTag']
      }
    }

    /** 已终止*/
    if ([ActivityStatusEnum.Terminated].includes(actStatus)) {
      return false
    }
    return false
  }
}

export const getWdEditableConfig = (actDetail: ActFullInfo): EditableConfig<CommonActCrudFormState> => {
  const operationType = getOperationType();
  console.log('12312123:', actEditableConfigMap[operationType || OperationType.CREATE](actDetail))
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail)
}