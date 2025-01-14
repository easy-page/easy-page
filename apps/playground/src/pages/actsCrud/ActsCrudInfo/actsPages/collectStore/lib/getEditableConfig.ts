import { ActFullInfo } from "@/common/apis";
import { OperationType, ActivityStatusEnum } from "@/common/constants";
import { getOperationType } from "@/common/routes";
import { EditableConfig } from "@easy-page/antd-ui";
import { CsActFormState } from "../interface";

const actEditableConfigMap: Record<OperationType, (actDetail: ActFullInfo) => EditableConfig<CsActFormState>> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo) => {
    const actStatus = actDetail?.activity?.status;
    if ([ActivityStatusEnum.Creating,  ActivityStatusEnum.Pause].includes(actStatus)) {
      return {
        canNotEditKeys: ['jhdType'],
      }
    }
    /** 待邀请 */
    if ([ActivityStatusEnum.Created].includes(actStatus)) {
      return {
        canNotEditKeys: ['jhdType', 'poiType', 'chargeFlowType', 'actRule']
      }
    }
    if ([ActivityStatusEnum.Applying, ActivityStatusEnum.TobeActive, ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canNotEditKeys: ['jhdType', 'poiType', 'chargeFlowType', 'actRule', 'promotionTime.timeRange', 'canAudit']
      }
    }
    if ([ActivityStatusEnum.Inviting, ActivityStatusEnum.Terminated].includes(actStatus)) {
      return false
    }
    return false
  }
}

export const getCsEditableConfig = (actDetail: ActFullInfo): EditableConfig<CsActFormState> => {
  const operationType = getOperationType();
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail)
}