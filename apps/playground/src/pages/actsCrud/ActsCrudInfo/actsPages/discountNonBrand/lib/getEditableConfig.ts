import { ActFullInfo } from "@/common/apis";
import { OperationType, ActivityStatusEnum } from "@/common/constants";
import { getOperationType } from "@/common/routes";
import { EditableConfig } from "@easy-page/antd-ui";
import { DisActFormState } from "../interface";

const actEditableConfigMap: Record<OperationType, (actDetail: ActFullInfo) => EditableConfig<DisActFormState>> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo) => {
    const actStatus = actDetail?.activity?.status;
    if ([ActivityStatusEnum.Creating,  ActivityStatusEnum.Pause].includes(actStatus)) {
      return {
        canNotEditKeys: [],
      }
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      return {
        canNotEditKeys: ['poiType','chargeFlowType', 'subactivityRule.isRestrict']
      }
    }
    if ([ActivityStatusEnum.Applying, ActivityStatusEnum.TobeActive, ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canNotEditKeys: ['poiType','chargeFlowType','subActivity', 'promotionTime.timeRange', 'canAudit', 'subactivityRule.isRestrict','subactivityRule.enterMax', 'promotionTime.period', 'promotionTime.weekTimes']
      }
    }
    if ([ActivityStatusEnum.Inviting, ActivityStatusEnum.Terminated].includes(actStatus)) {
      return false
    }
    return false
  }
}

export const getDisEditableConfig = (actDetail: ActFullInfo): EditableConfig<DisActFormState> => {
  const operationType = getOperationType();
  console.log('112321313123:', actEditableConfigMap[operationType || OperationType.CREATE](actDetail))
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail)
}