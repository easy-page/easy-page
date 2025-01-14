import { ActFullInfo } from "@/common/apis";
import { OperationType, ActivityStatusEnum } from "@/common/constants";
import { getOperationType } from "@/common/routes";
import { EditableConfig } from "@easy-page/antd-ui";
import { WmsActFormState } from "../interface";

const actEditableConfigMap: Record<OperationType, (actDetail: ActFullInfo) => EditableConfig<WmsActFormState>> = {
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
        canNotEditKeys: []
      }
    }
    if ([ActivityStatusEnum.Applying, ActivityStatusEnum.TobeActive, ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canNotEditKeys: [
          'subSourceInfo',
          'promotionTime.timeRange',
          'invitation.actionType',
          'invitation.inputData',
          'invitation.inputType',
          'invitation.dataType',
          'totalPrice',
          'skuAdminPartner'
        ]
      }
    }
    if ([ActivityStatusEnum.Inviting, ActivityStatusEnum.Terminated].includes(actStatus)) {
      return false
    }
    return false
  }
}

export const getWmsEditableConfig = (actDetail: ActFullInfo): EditableConfig<WmsActFormState> => {
  const operationType = getOperationType();
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail)
}