import {
  ActFullInfo,
  BusinessPartition,
  OperationType,
  SubMarketingPlanStatus,
  UserInfo,
  getOperationType,
} from '@/common';
import { cloneDeep, set } from 'lodash';

// 子方案是否邀请了自己
const hasInviteMe = ({
  userInfo,
  businessPartition,
}: {
  businessPartition?: BusinessPartition[];
  userInfo: UserInfo;
}) => {
  if (!businessPartition || businessPartition.length === 0) {
    return false;
  }
  const orgMis = businessPartition[0].oriMisId || [];
  return orgMis.includes(userInfo.mis);
};

export type GetActDefaultValueOption = {
  actDetail?: ActFullInfo;
  userInfo: UserInfo;
};
const getCopyDefaultValues = ({
  actDetail,
  userInfo,
}: GetActDefaultValueOption): Record<string, any> => {
  const defaultValues = cloneDeep(actDetail || {}) as ActFullInfo;
  set(defaultValues, 'invitation.inputData', '');
  set(defaultValues, 'activity.name', '副本-' + actDetail?.activity?.name);
  defaultValues.subActivity = (defaultValues.subActivity || []).map((e) => {
    const enabled =
      e.subsidyRule4Group?.groupStatus === SubMarketingPlanStatus.Started;
    const needSubsidy =
      enabled &&
      hasInviteMe({
        businessPartition: e.subsidyRule4Group.businessPartition,
        userInfo,
      });
    return {
      ...e,
      subsidyRule4Group: needSubsidy ? e.subsidyRule4Group : null,
    };
  });
  return defaultValues;
};

export const getActDefaultValues = ({
  userInfo,
  actDetail,
}: GetActDefaultValueOption): Record<string, any> => {
  const operationType = getOperationType();
  if (operationType === OperationType.CREATE) {
    return {};
  }
  if ([OperationType.EDIT, OperationType.VIEW].includes(operationType)) {
    return actDetail || {};
  }

  if (operationType === OperationType.COPY) {
    return getCopyDefaultValues({ userInfo, actDetail });
  }
};
