import {
  ActFullInfo,
  ActivityStatusEnum,
  OperationType,
  getOperationType,
} from '@/common';
import { ShenQuanFormState } from '../interface';
import { EditableConfig } from '@easy-page/antd-ui';

const actEditableConfigMap: Record<
  OperationType,
  (actDetail: ActFullInfo) => EditableConfig<ShenQuanFormState>
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
    if ([ActivityStatusEnum.Active].includes(actStatus)) {
      return {
        canEditKeys: [
          'actName',
          'brief',
          'stockRequest',
          'ruleDesc',
          'qualify',
          'subsidyPercent',
          'subsidyRuleInfo',
          'chooseOperation',
          'inputIdsWay',
          'inputId',
          'uploadId',
          'filterRule',
          'dataType'
        ],
      };
    }
    return false;
  },
};

export const getEditableConfig = (
  actDetail: ActFullInfo,
): EditableConfig<ShenQuanFormState> => {
  const operationType = getOperationType();
  return actEditableConfigMap[operationType || OperationType.CREATE](actDetail);
};
