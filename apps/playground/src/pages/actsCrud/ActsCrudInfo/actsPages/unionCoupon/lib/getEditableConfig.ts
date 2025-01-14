import {
  ActFullInfo,
  ActivityStatusEnum,
  OperationType,
  getOperationType,
} from '@/common';
import { UnionCouponFormState } from '../interface';
import { EditableConfig } from '@easy-page/antd-ui';

const actEditableConfigMap: Record<
  OperationType,
  (actDetail: ActFullInfo) => EditableConfig<UnionCouponFormState>
> = {
  [OperationType.CREATE]: () => true,
  [OperationType.COPY]: () => true,
  [OperationType.VIEW]: () => false,
  [OperationType.EDIT]: (actDetail: ActFullInfo) => {
    const actStatus = actDetail?.activity?.status;
    if (
      [
        ActivityStatusEnum.Creating,
        ActivityStatusEnum.Created,
        ActivityStatusEnum.Pause,
      ].includes(actStatus)
    ) {
      return {
        canNotEditKeys: ['poiType', 'canApplyRole'],
      };
    }
    if ([ActivityStatusEnum.Active, ActivityStatusEnum.Applying, ActivityStatusEnum.TobeActive].includes(actStatus)) {
      return {
        canEditKeys: [
          'actName',
          'brief',
          'ruleDesc',
          'qualify',
          'subsidyPercent',
          'subsidyRuleInfo',
          'chooseOperation',
          'inputIdsWay',
          'inputId',
          'uploadId',
          'filterRule',
          'dataType',
          'canCancelAct',
          'canEditAct',
          'endTime',
          'stock4Expand'
        ],
      };
    }
    return false;
  },
};

export const getEditableConfig = (
  actDetail: ActFullInfo,
): EditableConfig<UnionCouponFormState> => {
  const operationType = getOperationType();
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail);
};
